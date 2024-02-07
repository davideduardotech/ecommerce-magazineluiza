// CODDING: Voltar
const productArrowBack = document.getElementById('product-arrow-back');
productArrowBack.addEventListener('click',()=>{
    window.location.href = "/";
})

// CODDING: Alterar Imagens
const containerImagemVertical01 = document.getElementById('container-imagem-vertical-01');
const containerImagemVertical02 = document.getElementById('container-imagem-vertical-02');
const containerImagemVertical03 = document.getElementById('container-imagem-vertical-03');
const containerImagemVertical04 = document.getElementById('container-imagem-vertical-04');
[containerImagemVertical01,containerImagemVertical02,containerImagemVertical03,containerImagemVertical04].forEach(imagemVertical=>{
    imagemVertical.addEventListener('mouseover',()=>{
        [containerImagemVertical01,containerImagemVertical02,containerImagemVertical03,containerImagemVertical04].forEach(imgContainer => {
            imgContainer.classList.replace('border-[2px]','border-[1px]');
            imgContainer.classList.replace('border-azul','border-[#e5e5e5]');
        })

        imagemVertical.classList.replace('border-[1px]','border-[2px]');
        imagemVertical.classList.replace('border-[#e5e5e5]','border-azul');

        const imagemElement = imagemVertical.querySelector('img');
        const containerImagemSelecionada = document.getElementById('container-imagem-selecionada');
        const imagemSelecionadaElement = containerImagemSelecionada.querySelector('img');
        imagemSelecionadaElement.src = imagemElement.src;
    })
    
})

function showErrorInForm(error){
    document.getElementById('form-upload-error-container').classList.remove('hidden');
    document.getElementById('form-upload-error-text').innerHTML = error;
    document.getElementById('file-input').value = '';
}

function onChangeFileInput(){
    try{
        const inputFileElement = document.getElementById('file-input');  
        if(inputFileElement.files.length > 0){
            const file = inputFileElement.files[0]; // Arquivo escolhido
            
            
        
            if(!file.type.startsWith('image/')){ // Verificar se arquivo é uma imagem
                showErrorInForm('Por favor, selecione apenas arquivo de imagem.');
                return
            }

            // Obter Detalhes do arquivo
            const nome = file.name.split('.')[0].length>30 ? file.name.split('.')[0].slice(0,30)+'.'+file.name.split('.').pop() : file.name;
            const extensao = nome.split('.').pop().toUpperCase();
            const tamanhoEmBytes = file.size;
            const tamanhoEmMegabytes = tamanhoEmBytes / (1024 * 1024);

            // Verificar extensão do arquivo
            if(!(["jpg","jpeg","png","webp","svg"].includes(extensao.toLowerCase()))){
                showErrorInForm('O formato do arquivo de imagem selecionado é inválido, formatos disponíveis: "jpg", "jpeg", "png", "webp", "svg".')
                return   
            }


            
            // Verificar tamanho do arquivo
            if(tamanhoEmMegabytes > 5){
                showErrorInForm('O arquivo selecionado é muito grande. Por favor, escolha um arquivo menor que 5MB.');
                return 
            }


            // Ler o arquivo
            const reader = new FileReader();

            reader.onload = function(e) {
                const imagePreview = document.getElementById('detalhes-da-imagem-previa-img');
                imagePreview.src = e.target.result;
            };

            reader.readAsDataURL(inputFileElement.files[0]);
            console.log(`reader:`,reader);

            console.log('file:',file);


            // Ocultar upload de imagem
            document.getElementById('file-input-container').classList.add('hidden');

            // Mostrar detalhes da imagem
            document.getElementById('detalhes-da-imagem').classList.remove('hidden');

            // Preencher Detalhes da imagem
            document.getElementById('detalhes-da-imagem-nome').textContent = nome; // nome
            document.getElementById('detalhes-da-imagem-extensao').textContent = extensao; // extensão
            document.getElementById('detalhes-da-imagem-tamanho').textContent = `${tamanhoEmMegabytes.toFixed(2)} MB`; // tamanho

            // Mostrar Imagem Previa
            document.getElementById('detalhes-da-imagem-previa-container').classList.remove('hidden');
            
            // Adicionar
            const detalhesDaImagemPreviaImgElement = document.getElementById('detalhes-da-imagem-previa-img');
           
            detalhesDaImagemPreviaImgElement.src = ""
            
            // Mostrar espaçamento
            document.getElementById('detalhes-da-imagem-espacamento').classList.remove('hidden');
           
            // Mostrar botões
            document.getElementById('detalhes-da-imagem-botoes').classList.remove('hidden');
            
        }
    }catch(error){
        console.log(`onChangeFileInput @Error: ${error}`);
    }
} 

// Fechar mensagem de erro do formulario de upload de imagem
const showErrorInFormClose = document.getElementById('form-upload-error-button-close');
showErrorInFormClose.addEventListener('click',()=>{
    const errorContainer = document.getElementById('form-upload-error-container');
    try{errorContainer.classList.add('hidden')}catch(error){}
})


const formUploadFile = document.getElementById("form-upload-file");
formUploadFile.addEventListener('submit',async function(event){
    event.preventDefault();

    const formData = new FormData(this);

    // CODDING: Pegar token
    const cookie = document.cookie.split(';');

    // CODDING: Requisição
    try{
        const resposta = await fetch('/upload',{
            method: "POST",
            body: formData,
            headers:{
                "Authorization":`Bearer affwefawfweafwfeawfe`
            }
        });
        console.log('resposta:',resposta);
        console.log('resposta.json:',await resposta.json());
        if(resposta.ok){
            console.log("resposta.json:",resposta.json());
        }
    }catch(error){
        console.log("error:",error);
    }
})

function ocultarInformacoesDoArquivo(){
    const fileInputContainer = document.getElementById('file-input-container');     
    fileInputContainer.classList.remove('hidden');

    // Ocultar imagem do arquivo
    const imagemContainer = document.getElementById('detalhes-da-imagem-previa-container');
    try{imagemContainer.classList.add('hidden')}catch(error){}

    //  Ocultar detalhes do arquivo
    const detalhesDaImagem = document.getElementById('detalhes-da-imagem');
    try{detalhesDaImagem.classList.add('hidden');}catch(error){}

    // Ocultar espaçamento
    const detalhesDaImagemEspacamento = document.getElementById('detalhes-da-imagem-espacamento');
    detalhesDaImagemEspacamento.classList.add('hidden');

    // Ocultar botões de salvar e cancelar
    const detalhesDaImagemBotoes = document.getElementById('detalhes-da-imagem-botoes');
    detalhesDaImagemBotoes.classList.add('hidden');

    // Limpar o input
    const fileInput = document.getElementById('file-input');
    fileInput.value = '';

}
const buttonCancelUploadFile = document.getElementById('detalhes-da-imagem-botao-de-cancelar');
buttonCancelUploadFile.addEventListener('click',function(event){
    event.preventDefault();
    ocultarInformacoesDoArquivo();
})


console.log('cookie:',document.cookie.split(';'));
console.log(document.cookie.split(';').forEach(cookie=>{
    if(cookie.startsWith('authToken')){
        const token = cookie.split('=')[1];
    }
}))