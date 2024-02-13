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

// CODDING: Alterar imagem
const popupInputFile = document.getElementById('popup-input-file');
popupInputFile.addEventListener('change',(event)=>{
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

document.getElementById('popup-button-back').addEventListener('click',()=>{
    // Esconder elementos
    ['popup-image-preview-container','popup-file-details-container','popup-buttons-container'].map(id=>document.getElementById(id)).forEach(element=> element.classList.add('hidden'));

    // Mostrar upload de imagem
    document.getElementById('popup-input-file-container').classList.remove('hidden')
    document.getElementById('popup-input-file').value = '';
})