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

// CODDING: 4 imagens do produto
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
    })
})

// CODDING: Popup escolher imagem
class PopupUploadImage{
    constructor(imageIndex=0){
        this.imageIndex = imageIndex;
    }
    default(){
        // remover imagem prévia
        document.getElementById('popup-image-preview').src = '';

        // remover detalhes do arquivo
        document.getElementById('popup-file-details-name').textContent = '';
        document.getElementById('popup-file-details-type').textContent = '';
        document.getElementById('popup-file-details-size').textContent = '';

        // remover arquivo selecionado
        document.getElementById('popup-input-file').value = '';

        // Esconder elementos de detalhes do arquivo
        ['popup-image-preview-container','popup-file-details-container','popup-buttons-container'].map(id=>document.getElementById(id)).forEach(element=> element.classList.add('hidden'));    

        // Mostrar seleção de novo arquivo
        document.getElementById('popup-input-file-container').classList.remove('hidden');
    }
    hidden(){
        document.getElementById('popup-upload-image-container').classList.add('hidden');
    }
    buttonAlterarImage(){
        ['button-update-image-01','button-update-image-02','button-update-image-03','button-update-image-04'].map(id=>document.getElementById(id)).forEach(element=>{
            element.addEventListener('click',()=>{
                document.getElementById('popup-upload-image-container').classList.remove('hidden');
                if(element.id == 'button-update-image-01') this.imageIndex = 0;
                if(element.id == 'button-update-image-02') this.imageIndex = 1;
                if(element.id == 'button-update-image-03') this.imageIndex = 2;
                if(element.id == 'button-update-image-04') this.imageIndex = 3;

                console.log(`alterar imagem: ${this.imageIndex}(index)`);
            });
        });
    }
    buttonAddImage(){
        const popupContainer = document.getElementById('popup-upload-image-container');
        const addImage01 = document.getElementById('button-add-image-01');
        const addImage02 = document.getElementById('button-add-image-02');
        const addImage03 = document.getElementById('button-add-image-03');
        const addImage04 = document.getElementById('button-add-image-04');
        [addImage01,addImage02,addImage03,addImage04].forEach(element=>{
            try{
                element.addEventListener('click',()=>{
                    popupContainer.classList.remove('hidden'); // mostrar popup de upload de imagem
                    if(element.id == 'button-add-image-01') this.imageIndex = 0;
                    if(element.id == 'button-add-image-02') this.imageIndex = 1;
                    if(element.id == 'button-add-image-03') this.imageIndex = 2;
                    if(element.id == 'button-add-image-04') this.imageIndex = 3;
                })
            }catch(error){
                console.log(error);
            }
        });
    }
    buttonBackImage(){
        document.getElementById('popup-button-back').addEventListener('click',()=>{
            this.default(); // resetar "popup" de escolher arquivo
        })
    }
    uploadImage(){
        const buttonUploadImage = document.getElementById('popup-button-upload');
        buttonUploadImage.addEventListener("click",async ()=>{
            try{
                buttonUploadImage.disabled = true; // desabilitar botão de upload de imagem
                
                // adicionar spinner(carregamento) no botão de upload de imagem
                const loadingSpinner = document.getElementById('popup-button-upload-loading');
                const iconWithText = document.getElementById('popup-button-upload-icon-with-text');
                loadingSpinner.classList.remove('hidden');
                iconWithText.classList.add('hidden');

                const token = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken')).split('=')[1]; // Token de autenticação
                const id_produto = document.location.pathname.split('/').pop(); // ObjectID do produto
                const file = document.getElementById('popup-input-file').files[0]; // Arquivo
                if(file){
                    const formData = new FormData();
                    formData.append('imagem',file);
                
                    const request = await fetch(`/api/produto/${id_produto}/upload/image/${this.imageIndex}`,{
                        method: "POST",
                        body: formData,
                        headers:{
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    if(request.status === 200){ // upload concluido
                        const data = await request.json();

                        this.default(); // resetar "popup" de escolher arquivo
                        this.hidden() // esconder "popup" de escolher arquivo

                        // Remover botão de adicionar imagems
                        document.getElementById(`button-add-image-0${this.imageIndex+1}`).classList.add('hidden');

                        // Mostrar botão de remover e alterar imagem
                        document.getElementById(`button-remove-and-update-0${this.imageIndex+1}`).classList.remove('hidden'); 

                        const urlImage = `/img/uploads/products/${data.file.filename}`; // url da imagem

                        // imagem pequena
                        document.getElementById(`product-image-0${this.imageIndex+1}`).querySelector('img').src = urlImage;

                        // imagem preview
                        document.getElementById('product-image-preview').src = urlImage;

                        alert_message({type:'alert-success',message:`Upload da imagem concluido`});

                    }else{
                        alert_message({type:'alert-error',message:`Não foi possivel fazer upload de imagem, tente novamente...`});
                    }

                    buttonUploadImage.disabled = false; // habilitar botão de upload de imagem
                
                    // remover spinner(carregamento) no botão de upload de imagem
                    document.getElementById('popup-button-upload-loading').classList.add('hidden');
                    document.getElementById('popup-button-upload-icon-with-text').classList.remove('hidden');
                }
            }catch(error){
                buttonUploadImage.disabled = false; // habilitar botão de upload de imagem
                
                // remover spinner(carregamento) no botão de upload de imagem
                document.getElementById('popup-button-upload-loading').classList.add('hidden');
                document.getElementById('popup-button-upload-icon-with-text').classList.remove('hidden');
                console.log('error:',error);
            }
        })
    }
    close(){
        const popupClose = document.getElementById('popup-close');
        popupClose.addEventListener('click',()=>{
            this.default(); // resetar "popup" de escolher arquivo
            this.hidden() // esconder "popup" de escolher arquivo
        })
    }
    chooseFile(){
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
        });
    }
}
const popupUploadImage = new PopupUploadImage();

popupUploadImage.chooseFile(); // CODDING: Novo arquivo escolhido
popupUploadImage.buttonAlterarImage(); // CODDING: Alterar imagem
popupUploadImage.buttonAddImage() // CODDING: adicionar imagem
popupUploadImage.buttonBackImage(); // CODDING: voltar imagem
popupUploadImage.uploadImage(); // CODDING: upload de imagem
popupUploadImage.close(); // CODDING: fechar 


// CODDING: Popup deletar imagem
class PopupDeleteImage{
    constructor(imageIndex=4){
        this.imageIndex = imageIndex;
    }
    show(){
        // CODDING: Mostrar popup
    }
    close(){
        // CODDING: Fechar popup
        const popupRemoveImageClose = document.getElementById('popup-remove-image-close');
        popupRemoveImageClose.addEventListener('click',()=>{
            this.default(); // resetar popup de remover imagem

            // Esconder popup de remover imagem
            document.getElementById('popup-remove-image-container').classList.add('hidden');
        })
    }
    buttonCancel(){
        const popupRemoveImageButtonCancel = document.getElementById('popup-remove-image-button-cancelar');
        popupRemoveImageButtonCancel.addEventListener('click',()=>{
            // remover valor ".src" da imagem do popup
            document.getElementById('popup-remove-image-preview-element').src = '';

            // esconder popup
            document.getElementById('popup-remove-image-container').classList.add('hidden');
        });
    }
    buttonRemoveImage(){
        // CODDING: Remover imagem
        ['button-remove-image-01','button-remove-image-02','button-remove-image-03','button-remove-image-04'].map(id=>document.getElementById(id)).forEach(element=>{
            try{
                console.log('elemento:',element);
                if(element) element.addEventListener('click',()=>{
                    if(element.id == 'button-remove-image-01'){ // Botão de remover imagem 01
                        this.imageIndex = 0;
                        document.getElementById('popup-remove-image-preview-element').src = document.getElementById('product-image-01').querySelector('img').src;
                        document.getElementById('popup-remove-image-container').classList.remove('hidden');
                    }
                    if(element.id == 'button-remove-image-02'){ // Botão de remover imagem 02
                        this.imageIndex = 1;
                        document.getElementById('popup-remove-image-preview-element').src = document.getElementById('product-image-02').querySelector('img').src;
                        document.getElementById('popup-remove-image-container').classList.remove('hidden');
                    }
                    if(element.id == 'button-remove-image-03'){ // Botão de remover imagem 03
                        this.imageIndex = 2;
                        document.getElementById('popup-remove-image-preview-element').src = document.getElementById('product-image-03').querySelector('img').src;
                        document.getElementById('popup-remove-image-container').classList.remove('hidden');
                    }
                    if(element.id == 'button-remove-image-04'){ // Botão de remover imagem 04
                        this.imageIndex = 3;
                        document.getElementById('popup-remove-image-preview-element').src = document.getElementById('product-image-04').querySelector('img').src;
                        document.getElementById('popup-remove-image-container').classList.remove('hidden');
                    }
                    
                
                    
                    

                });
            }catch(error){
                console.log(`PopupDeleteImage.buttonRemoveImage --> ${error}`);
            }
        });
    }
    default(){
        document.getElementById('popup-remove-image-preview-element').classList.remove('animate-pulse'); // Remover animação pulse da imagem
        document.getElementById('popup-remove-image-preview-element').src = ''; // Remover valor ".src" da imagem do popup
        document.getElementById('popup-remove-image-button-remove').disabled = false; // Reativar botão de remover imagem
        document.getElementById('popup-remove-image-button-remove-loading').classList.add('hidden'); // Remover animação(loading) do botão de remover imagem
        document.getElementById('popup-remove-image-button-remove-text').classList.remove('hidden'); // Mostrar texto do botão de remover imagem

    }
    hidden(){
        this.default(); // Resetar popup de remover imagem
        document.getElementById('popup-remove-image-container').classList.add('hidden'); // esconder popup de remover imagem
    }
  
    removeImage(){
        const popupDeleteImageButtonRemove = document.getElementById('popup-remove-image-button-remove');
        popupDeleteImageButtonRemove.addEventListener('click',async () => {
            try{
                popupDeleteImageButtonRemove.disabled = true; // Desabilitar botão de remover imagem

                document.getElementById('popup-remove-image-button-remove-text').classList.add('hidden'); // esconder texto do botão
                document.getElementById('popup-remove-image-button-remove-loading').classList.remove('hidden'); // mostrar loading
                document.getElementById('popup-remove-image-preview-element').classList.add('animate-pulse'); // adicionar animação de pulse na imagem 

                const token = document.cookie.split('; ').filter(element=>element.startsWith('authToken'))[0].split('=')[1]; // token de autenticação
                const id_produto = document.location.pathname.split('/').pop(); // id do produto 

                const request = await fetch(`/api/produto/${id_produto}/delete/image/${this.imageIndex}`,{
                    method: 'POST',
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                
                if(request.status === 200){ // imagem excluida
                    this.default(); // resetar popup de remover imagem
                    this.close(); // esconder popup de remover imagem

                    // alterar imagem pequena para padrão
                    document.getElementById(`product-image-0${this.imageIndex+1}`).querySelector('img').src = '/img/default/product_default.png';

                    // alterar imagem previa para padrão
                    document.getElementById('product-image-preview').src = '/img/default/product_default.png';

                    // esconder botão de remover e alterar imagem
                    document.getElementById(`button-remove-and-update-0${this.imageIndex+1}`).classList.add('hidden');

                    // mostrar botões de adicionar imagem
                    document.getElementById(`button-add-image-0${this.imageIndex+1}`).classList.remove('hidden');

                    // Esconder popup de remover imagem
                    this.hidden();

                    alert_message({type:'alert-success',message:`Imagem removida com sucesso.`});
                }else{
                    popupDeleteImageButtonRemove.disabled = false; // Desabilitar botão de remover imagem

                    document.getElementById('popup-remove-image-button-remove-text').classList.remove('hidden'); // esconder texto do botão
                    document.getElementById('popup-remove-image-button-remove-loading').classList.add('hidden'); // mostrar loading
                    document.getElementById('popup-remove-image-preview-element').classList.remove('animate-pulse'); // adicionar animação de pulse na imagem 

                    alert_message({type:'alert-success',message:`${await request.json().error}`})
                }

            }catch(error){
                console.log(error);
            }
        })
    }
}

const popupDeleteImage = new PopupDeleteImage();

popupDeleteImage.close(); // CODDING: Fechar popup
popupDeleteImage.buttonRemoveImage(); // CODDING: Remover imagem
popupDeleteImage.buttonCancel(); // CODDING: Cancelar
popupDeleteImage.removeImage(); // CODDING: Remover imagem


// CODDING: Favoritar produto
const iconFavorite = document.getElementById('icon-favorite');
iconFavorite.addEventListener('click',async ()=>{
    const iconFavoriteData = iconFavorite.getAttribute('icon-favorite-data');
    console.log('iconFavoriteData:',iconFavoriteData);
    if(iconFavoriteData){
        if(iconFavoriteData === 'true'){ // CODDING: favoritado --> desfavoritar
            // CODDING: Esconder icone de favorio
            iconFavorite.classList.add('hidden');

            // CODDING: Mostrar loading
            const iconFavoriteLoading = document.getElementById('icon-favorite-loading');
            iconFavoriteLoading.classList.remove('hidden');

            const token = document.cookie.split('; ').filter(cookie=>cookie.startsWith('authToken'))[0].split('=')[1]; // token de autenticação
            const id_produto = document.location.pathname.split('/').pop(); // id do produto
            const request = await fetch(`/api/produto/${id_produto}/unfavorite`,{ // requisição
                method: "GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(request.status === 200){ 
                // CODDING: Esconder loading
                iconFavoriteLoading.classList.add('hidden');

                // CODDING: Mostrar novo icone
                iconFavorite.className = iconFavorite.className.replace('fa-solid fa-heart','fa-regular fa-heart');
                iconFavorite.classList.remove('hidden');

                // alterar numero de favorito da navbar
                const navbarIconFavoriteText = document.getElementById('navbar-icon-favorite-text');
                if(parseInt(navbarIconFavoriteText.textContent) > 0){
                    navbarIconFavoriteText.textContent = `${parseInt(navbarIconFavoriteText.textContent) -1}`;
                }

                // alterar atributo 'icon-favorite-data' para 'false'
                iconFavorite.setAttribute('icon-favorite-data','false');

            }else{
                console.log('resposta ao tentar desfavoritar:',request);
                console.log('resposta ao tentar desfavoritar:',await request.json());
            }
        }else{ // CODDING: não favoritado --> favoritar
            // CODDING: Esconder icone de favorio
            iconFavorite.classList.add('hidden');

            // CODDING: Mostrar loading
            const iconFavoriteLoading = document.getElementById('icon-favorite-loading');
            iconFavoriteLoading.classList.remove('hidden');

            const token = document.cookie.split('; ').filter(cookie=>cookie.startsWith('authToken'))[0].split('=')[1];
            const id_produto = document.location.pathname.split('/').pop();
            const request = await fetch(`/api/produto/${id_produto}/favorite`,{
                method: "GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(request.status === 200){
                // CODDING: Esconder loading
                iconFavoriteLoading.classList.add('hidden');

                // CODDING: Mostrar novo icone
                iconFavorite.className = iconFavorite.className.replace('fa-regular fa-heart','fa-solid fa-heart');
                iconFavorite.classList.remove('hidden');

                // CODDING: alterar numero de favorito da navbar
                const navbarIconFavoriteText = document.getElementById('navbar-icon-favorite-text');
                navbarIconFavoriteText.textContent = `${parseInt(navbarIconFavoriteText.textContent) +1}`;
                
                // alterar atributo 'icon-favorite-data' para 'true'
                iconFavorite.setAttribute('icon-favorite-data','true');
            }else{
                console.log('resposta ao tentar favoritar:',request);
                console.log('resposta ao tentar favoritar:',await request.json());
            }
        }
    }else{
        alert_message({type: `alert-info`,message:`Entre ou cadastre-se pra conseguir <span class='font-bold'>favoritar</span>`});
    }
    
});