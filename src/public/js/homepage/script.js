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
const productCardContainers = document.querySelectorAll('#product-card-container');
productCardContainers.forEach(productCardContainer=>{
    // Elements
    const productCardArrowRight = productCardContainer.querySelector('#product-card-arrow-right');
    const productCardArrowLeft = productCardContainer.querySelector('#product-card-arrow-left');
    const productCardScrollBar = productCardContainer.querySelector('#product-card-scrollbar');

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