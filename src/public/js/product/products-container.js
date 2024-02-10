// criar elemento
function documentCreateElement({tagName, classList, id}){
    const element = document.createElement(tagName);
    if(classList) element.classList.add(...classList.split(' '));
    if(id) element.id = id;
    return element;
}

// criar produto
function createProductElement(produto){
    // Criação do elemento container
    const container = documentCreateElement({tagName:'div',classList:'min-w-[150px] sm:min-w-[250px] flex flex-col',id:`product-container`});
    
    // Parágrafo de preço
    const priceParagraph = `
        ${produto.discount > 0 ? 
            `<p class="text-sm sm:text-base md:text-lg text-[#404040] line-through">R$${produto.price_without_discount}</p>
            <div class="flex flex-row justify-start items-center space-x-[5px]">
                <p class="text-lg sm:text-xl font-bold text-[#404040]">R$${produto.price}</p>
                <p class="text-sm sm:text-base md:text-lg text-[#404040]">no Pix</p>
            </div>
            <p class="text-[#58C22E] text-sm sm:text-base md:text-lg">(${produto.discount}% de desconto)</p>`
            :
            `<div class="flex flex-row justify-start items-center space-x-[5px]">
                <p class="text-lg sm:text-xl font-bold text-[#404040]">R$${produto.price}</p>
                <p class="text-sm sm:text-base md:text-lg text-[#404040]">no Pix</p>
            </div>`
        }
    `;

    // Parágrafo de parcelamento
    let installmentsParagraph;
    if(produto.credit_card && produto.credit_card.installments > 0){
        installmentsParagraph = `<p class="text-[#404040] text-sm sm:text-base md:text-lg">de R$${produto.credit_card.price.toFixed(2)} por apenas ${produto.credit_card.installments}x de R$${produto.credit_card.installment_price.toFixed(2)}</p>`;
    }

    // Container de preço
    const priceContainer = `
    <div class="flex flex-col justify-start">
        ${priceParagraph||''}
        ${installmentsParagraph||''}
    </div>
    `

    // Template do container
    const template = `
    <!-- imagem do produto -->
    <div class="w-full h-[150px] flex flex-row justify-center items-center">
        <img src='${produto.image[0].url}' class='w-auto h-auto max-w-full max-h-full'></img>
    </div>

    <!-- titulo do produto -->
    <p id="product-text" class="text-sm sm:text-base md:text-lg text-[#404040]">${produto.name}</p>
    
    <!-- avaliação de produto -->
    <div class="flex flex-row justify-start items-center">
        <i class="fa-solid fa-star text-sm sm:text-base md:text-lg text-[#FCD000]"></i>
        <i class="fa-solid fa-star text-sm sm:text-base md:text-lg text-[#FCD000]"></i>
        <i class="fa-solid fa-star text-sm sm:text-base md:text-lg text-[#FCD000]"></i>
        <i class="fa-solid fa-star text-sm sm:text-base md:text-lg text-[#FCD000]"></i>
        <i class="fa-solid fa-star text-sm sm:text-base md:text-lg text-[#FCD000]"></i>
        <p class="text-sm sm:text-base md:text-lg text-[#404040] ml-[8px]">345</p>
    </div>

    <!-- preço do produto -->
    ${priceContainer}`;

    // Define o conteúdo do container
    container.innerHTML = template;
    
    return container;

}

// sessão: produtos mais vendidos
async function produtosMaisVendidos(){
    try{document.getElementById('products-loading').classList.remove('hidden')}catch(error){} // mostrar produtos carregando
    try{document.getElementById('products-container').classList.add('hidden')}catch(error){} // esconder produtos

    const request = await fetch('/api/produto/search?limit=10'); // últimos 10 produtos adicionado
    if(!request.ok) return

    const data = await request.json();
    const products = data['products']; 
    const productsContainerList = document.getElementById('products-container-list'); // lista de produtos

    products.forEach((product,index)=>{ // percorrer produtos
        const productElement = createProductElement(product);
        productsContainerList.appendChild(productElement);
        try{document.getElementById('products-loading').classList.add('hidden')}catch(error){}
        try{document.getElementById('products-container').classList.remove('hidden')}catch(error){}
    })

}
produtosMaisVendidos();

const produtoContainerList = document.getElementById('products-container-list');
produtoContainerList.addEventListener('scroll',()=>{
    if(produtoContainerList.scrollLeft > 0){
        // mostrar arrow left
        if(Array.from(arrowLeft.classList).includes('hidden')){
            arrowLeft.classList.remove('hidden');
        }

        if((produtoContainerList.scrollWidth-produtoContainerList.clientWidth)===produtoContainerList.scrollLeft){ // esconder arrow right
            if(!Array.from(arrowRight.classList).includes('hidden')){
                arrowRight.classList.add("hidden");
            }
        }else{ // mostrar arrow right
            if(Array.from(arrowRight.classList).includes('hidden')){
                arrowRight.classList.remove("hidden");
            }
        }
    }else{ // remover arrow left
        if(!Array.from(arrowLeft.classList).includes('hidden')){
            arrowLeft.classList.add('hidden');
        }

        // mostrar arrow right
        if(Array.from(arrowRight).includes('hidden')){
            arrowRight.classList.remove('hidden');
        }
    }

    
})
const arrowLeft = document.getElementById('products-arrow-left');
arrowLeft.addEventListener('click',()=>{
    produtoContainerList.scrollLeft -= 150;
})
const arrowRight = document.getElementById('products-arrow-right');
arrowRight.addEventListener('click',()=>{
    produtoContainerList.scrollLeft += 150;
})


window.addEventListener('resize',()=>{
    if(produtoContainerList.clientWidth === produtoContainerList.scrollWidth){ // scrollbar desabilitado
        if(!Array.from(arrowLeft.classList).includes('hidden')) arrowLeft.classList.add('hidden');
        if(!Array.from(arrowRight.classList).includes('hidden')) arrowRight.classList.add('hidden');
    }else{ // scrollbar habilitado
        if(produtoContainerList.scrollLeft > 0) if(Array.from(arrowLeft.classList).includes('hidden')) arrowLeft.classList.remove('hidden');
        if(Array.from(arrowRight.classList).includes('hidden')) arrowRight.classList.remove('hidden');
    }
    
    console.log('TAMANHO DA DIV:',produtoContainerList.clientWidth,' SCROLL:',produtoContainerList.scrollWidth,'SCROLL LEFT:',produtoContainerList.scrollLeft,'TAMANHO DA PARTE ESCONDIDA:',produtoContainerList.scrollWidth-produtoContainerList.clientWidth);
});