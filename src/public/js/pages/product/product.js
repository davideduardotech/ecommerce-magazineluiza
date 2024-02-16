// CODDING: Mensagens de alerta
function alert_message({type, message}){
    // CODDING: Escolher icone 
    const icon = type === "alert-success" ? `fa-solid fa-circle-check` :
                 type === "alert-warning" ? `fa-solid fa-triangle-exclamation`:
                 type === "alert-error" ? `fa-solid fa-circle-exclamation`: 
                 type === "alert-info" ? `fa-solid fa-circle-info`:``;

    if(!icon) return
    if(!message) return

    // CODDING: Criando mensagem de alerta
    const alertElement = document.createElement('div');
    alertElement.id = 'alert';
    alertElement.className = 'w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:w-[40%] show-alert-with-animation flex flex-row justify-between items-center rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] z-20 bg-azul'
    alertElement.innerHTML = `
        <div class="flex-grow bg-white rounded-tl-[10px] rounded-bl-[10px] border-l-[5px] border-azul  flex flex-row justify-start items-center space-x-[15px] px-[16px] py-[16px]">
            <i id="alert-icon" class="${icon} text-2xl sm:text-3xl text-azul"></i>
            <p id="alert-message" class="text-sm sm:text-base/tight text-azul">${message}</p>
        </div>
        <div id="alert-close" class="h-full flex flex-row justify-center items-center min-w-[50px] rounded-tr-[10px] rounded-br-[10px] bg-transparent transition-transform duration-500 hover:scale-105 cursor-pointer">
            <i class="fa-solid fa-xmark text-base sm:text-lg sm:text-xl text-white"></i>
        </div>`;
    
    const alerts = document.getElementById('alerts');
    if(alerts){
        // CODDING: Adicionar mensagem de alerta
        alerts.appendChild(alertElement);

        // CODDING: Remover mensagem de alerta 
        const alertClose = alertElement.querySelector('#alert-close');
        if(alertClose){
            alertClose.addEventListener('click',()=>{
                alertElement.classList.replace('show-alert-with-animation','hidden-alert-with-animation');
                setTimeout(()=>{
                    alertElement.remove();
                },1000);
            });
        }

        // CODDING: Remover mensagem de alerta 
        setTimeout(()=>{
            try{
                alertElement.classList.replace('show-alert-with-animation','hidden-alert-with-animation');
                setTimeout(()=>{
                    alertElement.remove();
                },1000);
            }catch(error){
                console.log('erro ao tentar remover a mensagem de alerta automaticamente:',error);
            }
        },10000);

    }
}

const productImage01 = document.getElementById('product-image-01');
const productImage02 = document.getElementById('product-image-02');
const productImage03 = document.getElementById('product-image-03');
const productImage04 = document.getElementById('product-image-04');
const productImagePreview = document.getElementById('product-image-preview');
[productImage01,productImage02,productImage03,productImage04].forEach(imageContainer=>{
    imageContainer.addEventListener('mouseover',()=>{
        [productImage01,productImage02,productImage03,productImage04].forEach(imageContainer=>{
            imageContainer.classList.replace('border-azul','border-[#e5e5e5]'); // alterar borda para cinza
        })
        imageContainer.classList.replace('border-[#e5e5e5]','border-azul'); // alterar borda para azul
        productImagePreview.src = imageContainer.querySelector('img').src;
        console.log('nova imagem adicionada:',imageContainer.querySelector('img').src);
    })
})


// CODDING: Escolher imagem
document.getElementById('popup-input-file').addEventListener('change',(event)=>{
    const file = event.target.files[0]; 

    // Esconder upload de imagem
    document.getElementById('popup-input-file-container').classList.add('hidden'); 

    // Adicionar nome do arquivo
    document.getElementById('popup-file-details-name').textContent = file.name;

    // Adicionar tamanho do arquivo
    const tamanhoKiloBytes = file.size / 1024;
    const tamanhoMegaBytes = file.size / (1024*1024);
    const tamanhoFormatado = tamanhoMegaBytes > 0.01 ? `${tamanhoMegaBytes.toFixed(2)}MB`:`${tamanhoKiloBytes.toFixed(2)}KB`;
    document.getElementById('popup-file-details-size').textContent = tamanhoFormatado;

    const reader = new FileReader(); 
    reader.onload = function(event){ // imagem carregada
        // Adicionar imagem previa
        document.getElementById('popup-image-preview').src = event.target.result;

        const image = new Image();
        image.onload = function(){
            // Adicionar tipo e dimensões da imagem(800x400)
            const width = this.naturalWidth;
            const height = this.naturalHeight;
            document.getElementById('popup-file-details-type').textContent = `${file.type}(${width}x${height})`;
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(file);

    // Mostrar elementos
    document.getElementById('popup-image-preview-container').classList.remove('hidden');
    document.getElementById('popup-file-details-container').classList.remove('hidden');
    document.getElementById('popup-buttons-container').classList.remove('hidden');
})

// CODDING: Voltar Imagem
document.getElementById('popup-button-back').addEventListener('click',()=>{
    // Esconder elementos
    ['popup-image-preview-container','popup-file-details-container','popup-buttons-container'].map(id=>document.getElementById(id)).forEach(element=> element.classList.add('hidden'));

    // Mostrar upload de imagem
    document.getElementById('popup-input-file-container').classList.remove('hidden')
    document.getElementById('popup-input-file').value = '';

})

let indexImagem = undefined; // index da imagem para alterar

// upload de imagem
document.getElementById('popup-button-upload').addEventListener("click",async ()=>{
    try{
        const token = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken')).split('=')[1];
        const id_produto = document.location.pathname.split('/').pop();
        const file = document.getElementById('popup-input-file').files[0];
        if(file){
            const formData = new FormData();
            formData.append('imagem',file);
          
            const request = await fetch(`/api/produto/${id_produto}/upload/image/${indexImagem}`,{
                method: "POST",
                body: formData,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(request.status === 200){
                const data = await request.json();
                // esconder popup
                document.getElementById('popup-container').classList.add('hidden');

                // mostrar popup
                alert_message({type:'alert-success',message:data.message});

            }
        }
    }catch(error){
        console.log('error:',error);
    }
})


// adicionar imagem 
const popupContainer = document.getElementById('popup-container');
const addImage01 = document.getElementById('add-image-01');
const addImage02 = document.getElementById('add-image-02');
const addImage03 = document.getElementById('add-image-03');
const addImage04 = document.getElementById('add-image-04');
[addImage01,addImage02,addImage03,addImage04].forEach(element=>{
    try{
        element.addEventListener('click',()=>{
            popupContainer.classList.remove('hidden'); // mostrar popup de upload de imagem
            if(element.id == 'add-image-01') indexImagem = 0;
            if(element.id == 'add-image-02') indexImagem = 1;
            if(element.id == 'add-image-03') indexImagem = 2;
            if(element.id == 'add-image-04') indexImagem = 3;
        })
    }catch(error){
        console.log(error);
    }
});

const popupClose = document.getElementById('popup-close');
popupClose.addEventListener('click',()=>{
    popupContainer.classList.add("hidden");
})
