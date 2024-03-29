// criar elemento
function documentCreateElement({tagName, classList, id,href}){
    const element = document.createElement(tagName);
    if(classList) element.classList.add(...classList.split(' '));
    if(id) element.id = id;
    if(href) element.href = href;
    return element;
}

// criar produto
function createProductElement(produto){
    // Criação do elemento container
    const linkContainer = documentCreateElement({tagName:'a',href:`/produto/${produto._id}`, classList:'cursor-pointer'});
    
    // Parágrafo de preço
    const priceParagraph = `
        ${produto.discount > 0 ? 
            `<p class="text-sm sm:text-base md:text-lg text-[#404040] line-through">R$${produto.price_without_discount.toFixed(2)}</p>
            <div class="flex flex-row justify-start items-center space-x-[5px]">
                <p class="text-lg sm:text-xl font-bold text-[#404040]">R$${produto.price.toFixed(2)}</p>
                <p class="text-sm sm:text-base md:text-lg text-[#404040]">no Pix</p>
            </div>
            <p class="text-[#58C22E] text-sm sm:text-base md:text-lg">(${produto.discount}% de desconto)</p>`
            :
            `<div class="flex flex-row justify-start items-center space-x-[5px]">
                <p class="text-lg sm:text-xl font-bold text-[#404040]">R$${produto.price.toFixed(2)}</p>
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
    <div class="min-w-[150px] sm:min-w-[250px] flex flex-col" id="product-container">
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
        ${priceContainer}
    </div>`;

    // Define o conteúdo do container
    linkContainer.innerHTML = template;
    
    return linkContainer;

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
        const productElement = createProductElement(product); // criar produto
        productsContainerList.appendChild(productElement); // adicionar produto

        const arrowLeft = document.getElementById('products-arrow-left');
        const arrowRight = document.getElementById('products-arrow-right');
        const scrollEnabled = productsContainerList.scrollWidth>productsContainerList.clientWidth;
        const isScrollAtEnd = (productsContainerList.scrollWidth-productsContainerList.clientWidth) === productsContainerList.scrollLeft;

        if(scrollEnabled){ // scroll habilitado
            if(productsContainerList.scrollLeft > 0 ){ 
                arrowLeft.classList.remove('hidden'); // mostrar arrow left

                if(isScrollAtEnd){ // scroll no final
                    arrowRight.classList.add('hidden'); // esconder arrow right
                }else{ // scroll no meio
                    arrowRight.classList.remove('hidden'); // mostrar arrow right
                }

            }else{  // scroll no inicio
                arrowLeft.classList.add('hidden'); // esconder arrow left
                arrowRight.classList.remove('hidden'); // mostrar arrow right
            }
        }else{ // scroll desabilitado
            arrowLeft.classList.add("hidden"); // esconder arrow left
            arrowRight.classList.add("hidden");// esconder arrow right
        }

        document.getElementById('products-loading').classList.add('hidden');
        document.getElementById('products-container').classList.remove('hidden');

        const productsElement = document.querySelectorAll('#product-container');
        productsElement.forEach(product=>{
            product.addEventListener('mouseover',()=>{
                product.querySelector('#product-text').classList.replace('text-[#404040]','text-azul');
            })
            product.addEventListener('mouseout',()=>{
                product.querySelector('#product-text').classList.replace('text-azul','text-[#404040]');
            })
        });
    })

}
produtosMaisVendidos();

const produtoContainerList = document.getElementById('products-container-list');
produtoContainerList.addEventListener('scroll',()=>{
    const isScrollAtEnd = (produtoContainerList.scrollWidth-produtoContainerList.clientWidth)===produtoContainerList.scrollLeft;
    if(produtoContainerList.scrollLeft > 0){
        arrowLeft.classList.remove('hidden'); // mostrar arrow left

        if(isScrollAtEnd){ // scroll no final
            arrowRight.classList.add("hidden"); // esconder arrow right
        }else{ 
            arrowRight.classList.remove("hidden"); // mostrar arrow right
        }
    }else{ // scroll no inicio
        arrowLeft.classList.add('hidden'); // esconder arrow left
        arrowRight.classList.remove('hidden'); // mostrar arrow right
    }

    
})
const arrowLeft = document.getElementById('products-arrow-left');
arrowLeft.addEventListener('click',()=>{ // mover scroll(left)
    produtoContainerList.scrollLeft -= 150;
})
const arrowRight = document.getElementById('products-arrow-right');
arrowRight.addEventListener('click',()=>{ // mover scroll(right)
    produtoContainerList.scrollLeft += 150;
})

window.addEventListener('resize',()=>{
    const scrollEnabled = produtoContainerList.scrollWidth>produtoContainerList.clientWidth;
    if(scrollEnabled){ // scrollbar habilitado
        if(produtoContainerList.scrollLeft > 0) arrowLeft.classList.remove('hidden'); // esconder arrow left
        arrowRight.classList.remove('hidden'); // mostrar arrow right
    }else{ // scrollbar desabilitado
        arrowLeft.classList.add('hidden'); // esconder arrow left
        arrowRight.classList.add('hidden'); // esconder arrow right
    }
});

