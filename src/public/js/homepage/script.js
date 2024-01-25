
function createElement({tagName,id, className,href,appendChild,textContent}){
    const element = document.createElement(tagName);
    if(id) element.id = id;
    if(className) element.className = className;
    if(href) element.href = href;
    if(appendChild) element.appendChild(appendChild);
    if(textContent) element.textContent = textContent;
    return element;
}

function productCard(product){
    /*
    TEMPLATE DE DADOS: product<Object>
    {
        _id:"",
        nome: "",
        avaliacao:{
            "quantidade de estrelas":3,
            "quantidade de avaliação":5
        },
        "preço(R$)":{...}
        
    }*/
    const linkElement = createElement({tagName: "a",href: `/produto/${product._id}`});

    // Criar card 
    const imageElement = createElement({tagName:'div',id:"card-product-image",className:"w-full min-h-[200px] bg-yellow-900"});
    const cardContainerElement = createElement({tagName:"div", id:"card-product-item", className:"min-w-[300px] max-[650px]:min-w-[250px] flex flex-col",appendChild:imageElement});

    // Criar Detalhes do Produto
    const detalhesDoProdutoElement = createElement({tagName:'div',className:"flex flex-col py-[8px] px-[4px]"});

    // 1° Detalhe: Criar titulo
    const tituloDoProdutoElement = createElement({tagName:'p',id:"card-product-title", className:"text-[16px] text-black",textContent:product.nome});


    // 2° Detalhe: Criar avaliações
    const avaliacoesDoProdutoElement = createElement({tagName:'div', className:"flex flex-row items-center"});
    
    for(let i = 0; i<5; i++){
        if(i <= (product.avaliacao["quantidade de estrelas"]-1)){
            // Criar Icone com Estrelha Preenchida
            const elementIcon = createElement({tagName:'i',className:"fa-solid fa-star text-[12px] text-[#FCD000]"});
            avaliacoesDoProdutoElement.appendChild(elementIcon);
        }else{
            // Criar Icone com Estrelha com borda
            const elementIcon = createElement({tagName:'i', className:"fa-regular fa-star text-[12px] text-[#FCD000]"});
            avaliacoesDoProdutoElement.appendChild(elementIcon);
        }
    }
    
    // Criar Quantidade de Avaliação
    const quantidadeDeAvaliacaoElement = createElement({tagName:'p', className:"text-[14px] text-[#808080] ml-[5px]",textContent:product.avaliacao["quantidade de avaliação"] || ''});
    avaliacoesDoProdutoElement.appendChild(quantidadeDeAvaliacaoElement);

    // 3° Detalhe: Criar preço(R$) no pix e cartão de crédito
    const precoContainerElement = createElement({tagName:'div',className:"flex flex-col"});

    
    if(product["preço(R$)"]["pix"]["desconto(%)"] && product["preço(R$)"]["pix"]["desconto(%)"] > 0){
        // Criar preço(R$) sem desconto(%) no pix
        const precoSemDesconto = createElement({tagName:'p',className:"text-[14px] line-through text-[#808080]",textContent:`R$${product["preço(R$)"]["pix"]["preço(R$)"]}`});
        precoContainerElement.appendChild(precoSemDesconto);


        // Criar preço(R$) com desconto(%) no pix
        const precoComDescontoContainer = createElement({tagName:'div',className:"flex flex-row items-center"});

        const precoComDesconto = createElement({tagName:'p',className:"text-[24px] text-[#404040] font-bold", textContent:`R$${product["preço(R$)"]["pix"]["preço com desconto(R$)"]}`});
        precoComDescontoContainer.appendChild(precoComDesconto);
        
        const precoComDescontoParagraph = createElement({tagName:'p',className:"text-[14px] pl-[2px]",textContent:"no Pix"});
        precoComDescontoContainer.appendChild(precoComDescontoParagraph);
        precoContainerElement.appendChild(precoComDescontoContainer);

        // Adicionar desconto(%)
        const descontoParagraph = createElement({tagName:'p', className:"text-[14px] text-[#59C00B]",textContent:`(${product["preço(R$)"]["pix"]["desconto(%)"]}% de desconto)`});
        precoContainerElement.appendChild(descontoParagraph);

    }else{
        // Criar preço(R$) normal
        const precoNormalContainer = createElement({tagName:'div', className:'flex flex-row items-center'});

        const precoNormal = createElement({tagName:'p',className:'text-[24px] text-[#404040] font-bold',textContent:`R$${product["preço(R$)"]["pix"]["preço(R$)"]}`});
        precoNormalContainer.append(precoNormal);

        precoContainerElement.appendChild(precoNormalContainer);
    }

    // Adicionar preço(R$) do cartão de credito
    const precoDoCartaoDeCredito = createElement({tagName:'p', className:"text-[14px] text-black", textContent:`ou R$${product['preço(R$)']["cartão de crédito"]["valor total(R$)"]} em ${product['preço(R$)']["cartão de crédito"]["parcelas disponiveis"].length}x de R$${product['preço(R$)']["cartão de crédito"]["valor da parcela(R$)"].toFixed(2)} sem juros`});
    precoContainerElement.appendChild(precoDoCartaoDeCredito);

    // Adicionar detalhes do produto
    detalhesDoProdutoElement.appendChild(tituloDoProdutoElement);
    detalhesDoProdutoElement.appendChild(avaliacoesDoProdutoElement);
    detalhesDoProdutoElement.appendChild(precoContainerElement);
    cardContainerElement.appendChild(detalhesDoProdutoElement);
    linkElement.appendChild(cardContainerElement);

    return linkElement;
}  


function personalizarProdutos(){
    // Titulo dos Produtos
    const cardProductTitleAll = document.querySelectorAll('#card-product-title');
    cardProductTitleAll.forEach((cardProductTitle,index)=>{
        const maxLength = 60;
        if(cardProductTitle.textContent.length > maxLength){
            const textoCortado = cardProductTitle.textContent.substring(0,maxLength)+"...";
            const textoRestante = cardProductTitle.textContent.substring(maxLength);
            const novoInnerHTML = `${textoCortado}<p class="hidden">${textoRestante}</p>`;
            cardProductTitle.innerHTML = novoInnerHTML;

            cardProductTitle.addEventListener('click',()=>{
                const hiddenParagraph = cardProductTitle.querySelector('p');
                hiddenParagraph.classList.toggle('hidden');
                if(!hiddenParagraph.classList.contains('hidden')){
                    cardProductTitle.innerHTML = cardProductTitle.innerHTML.replace('...','');
                }else{
                    cardProductTitle.innerHTML = cardProductTitle.innerHTML.replace('<p','...<p');
                }
            })

        }
    })


    // Product Card Container
    const productCardContainerElements = document.querySelectorAll('#product-card-container');
    productCardContainerElements.forEach(productCardContainerElement=>{
        // Elements
        const productCardArrowRight = productCardContainerElement.querySelector('#product-card-arrow-right');
        const productCardArrowLeft = productCardContainerElement.querySelector('#product-card-arrow-left');
        const productCardScrollBar = productCardContainerElement.querySelector('#product-card-scrollbar');

        // Scroll
        productCardArrowLeft.addEventListener('click',()=>{
            productCardScrollBar.scrollLeft -= 300;
        })
        productCardArrowRight.addEventListener('click',()=>{
            productCardScrollBar.scrollLeft += 300;
        })

        // Hover
        productCardArrowLeft.addEventListener('mouseover',()=>{
            
            productCardArrowLeft.classList.replace('shadow-[0_3px_8px_rgba(0,0,0,0.24)]','shadow-[0_5px_15px_rgba(0,0,0,0.35)]');
        })
        productCardArrowLeft.addEventListener('mouseout',()=>{
            productCardArrowLeft.classList.replace('shadow-[0_5px_15px_rgba(0,0,0,0.35)]','shadow-[0_3px_8px_rgba(0,0,0,0.24)]');
        })

        productCardArrowRight.addEventListener('mouseover',()=>{
            productCardArrowRight.classList.replace('shadow-[0_3px_8px_rgba(0,0,0,0.24)]','shadow-[0_5px_15px_rgba(0,0,0,0.35)]');
        })
        productCardArrowRight.addEventListener('mouseout',()=>{
            productCardArrowRight.classList.replace('shadow-[0_5px_15px_rgba(0,0,0,0.35)]','shadow-[0_3px_8px_rgba(0,0,0,0.24)]');
        })

    })


    // Product Card Scrollbar
    const productCardScrollBars = document.querySelectorAll('#product-card-scrollbar');
    productCardScrollBars.forEach(productCardScrollBar=>{
        // Arrows
        const productCardArrowLeft = document.getElementById('product-card-arrow-left');
        const productCardArrowRight = document.getElementById('product-card-arrow-right');

        // ScrollBar
        if(productCardScrollBar.scrollLeft === 0){ // Inicio da scrollbar
            productCardArrowLeft.classList.add('hidden');
            productCardArrowRight.classList.remove('hidden');
        }   
        else if(productCardScrollBar.scrollLeft === productCardScrollBar.scrollWidth){ // Final do scrollbar
            productCardArrowLeft.classList.remove('hidden');
            productCardArrowRight.classList.add('hidden');
        }else{
            productCardArrowLeft.classList.remove('hidden');
            productCardArrowRight.classList.remove('hidden');
        }

        // Evento de Scroll
        productCardScrollBar.addEventListener('scroll',()=>{
            const scrollPercentage = (productCardScrollBar.scrollLeft / (productCardScrollBar.scrollWidth - productCardScrollBar.clientWidth)) * 100;
            // ScrollBar
            if(productCardScrollBar.scrollLeft === 0){ // Inicio da scrollbar
                productCardArrowLeft.classList.add('hidden');
                productCardArrowRight.classList.remove('hidden');
            }   
            else if(productCardScrollBar.scrollLeft === (productCardScrollBar.scrollWidth-productCardScrollBar.clientWidth)){ // Final do scrollbar
                productCardArrowLeft.classList.remove('hidden');
                productCardArrowRight.classList.add('hidden');
            }else{
                productCardArrowLeft.classList.remove('hidden');
                productCardArrowRight.classList.remove('hidden');
            }
        })
    })


    // Product Card Item
    const productCardItems = document.querySelectorAll('#card-product-item');
    console.log('productCardItems:',productCardItems);
    productCardItems.forEach(productCardItem=>{
        const productCardTitle = productCardItem.querySelector('#card-product-title');
        productCardItem.addEventListener('mouseover',()=>{

            productCardTitle.classList.replace('text-black','text-azul');
        })
        productCardItem.addEventListener('mouseout',()=>{
            productCardTitle.classList.replace('text-azul','text-black');
        })
    })



}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Pegar Produtos
async function requestData(){
    try{
        // CODDING: Pegar Containers
        const cardLoading = document.getElementById('card-loading');
        const cardContent = document.getElementById('card-content');


        const resposta = await fetch('http://localhost:3000/api/produto/search?limit=10',{method: 'GET'});
        if(!resposta.ok){
            console.log(`ocorreu um erro, não foi possivel fazer requisição: GET http://localhost:3000/api/produto/search?limit=10 |`,resposta);
            return 
        }

        const produtosData = await resposta.json();
        for(const [index,product] of Object.entries(produtosData["products"])){
            const cardProduct = productCard({
                _id: product._id,
                nome: product.nome,
                avaliacao:{
                    "quantidade de estrelas":getRandomInt(1,5),
                    "quantidade de avaliação":getRandomInt(10,100)
                },
                "preço(R$)":product['preço(R$)']
                
            });

            const productCardScrollBar = document.getElementById('product-card-scrollbar');
            const ultimoElemento = productCardScrollBar.lastElementChild;
            productCardScrollBar.insertBefore(cardProduct,ultimoElemento);
        }

        personalizarProdutos();

        // CODDING: Mostrar Produtos
        cardLoading.classList.add('hidden');
        cardContent.classList.remove('hidden');
    }catch(error){
        console.log('ocorreu um erro:',error);
    }
}
requestData();

