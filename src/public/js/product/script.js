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

// CODDING: Escolher imagem
function onChangeFileInput(){
    try{
        const inputFileElement = document.getElementById('file-input');
        const fileInputContainer = document.getElementById('file-input-container');     
        if(inputFileElement.files.length > 0){
            const file = inputFileElement.files[0];

            // CODDING: Detalhes do arquivo
            const nome = file.name;
            const extensao = nome.split('.').pop();
            const tamanhoEmBytes = file.size;
            const tamanhoEmMegabytes = tamanhoEmBytes / (1024 * 1024);

            // CODDING: Esconder <input type="file">
            fileInputContainer.classList.add('hidden');

            // CODDING: Mostrar detalhes do arquivo
            const detalhesDaImagem = document.getElementById('detalhes-da-imagem');
            const detalhesDaImagemNome = document.getElementById('detalhes-da-imagem-nome');
            const detalhesDaImagemExtensao = document.getElementById('detalhes-da-imagem-extensao');
            const detalhesDaImagemTamanho = document.getElementById('detalhes-da-imagem-tamanho');
            console.log(`detalhesDaImagem:`,detalhesDaImagem);
            console.log(`detalhesDaImagemNome:`,detalhesDaImagemNome);
            console.log(`detalhesDaImagemExtensao:`,detalhesDaImagemExtensao);
            console.log(`detalhesDaImagemTamanho:`,detalhesDaImagemTamanho);
            console.log('detalhesDaImagem.classList:',detalhesDaImagem.classList);
            try{detalhesDaImagem.classList.remove('hidden');}catch(error){}
            detalhesDaImagemNome.textContent = nome;
            detalhesDaImagemExtensao.textContent = `.${extensao.toUpperCase()}`;
            detalhesDaImagemTamanho.textContent = `${tamanhoEmMegabytes.toFixed(2)}MB`;
            
            const detalhesDaImagemEspacamento = document.getElementById('detalhes-da-imagem-espacamento');
            detalhesDaImagemEspacamento.classList.remove('hidden');

            const detalhesDaImagemBotoes = document.getElementById('detalhes-da-imagem-botoes');
            detalhesDaImagemBotoes.classList.remove('hidden');
            
        }
    }catch(error){
        console.log(`onChangeFileInput @Error: ${error}`);
    }
} 