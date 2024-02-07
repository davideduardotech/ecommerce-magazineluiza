const productsArrowLeft = document.getElementById('products-arrow-left');
if(productsArrowLeft.scrollLeft === 0) productsArrowLeft.classList.add("hidden");
productsArrowLeft.addEventListener('click',()=>{
    const products = document.getElementById('products');

    if(productsArrowRight.classList.contains('hidden')) productsArrowRight.classList.remove('hidden');

    if(products.scrollLeft > 0){
        products.scrollLeft -= 50;
        if(products.scrollLeft === 0){
            productsArrowLeft.classList.add('hidden')
        }
    }

})

const productsArrowRight = document.getElementById('products-arrow-right');
productsArrowRight.addEventListener('click',()=>{
    const products = document.getElementById('products');

    if(products.scrollLeft > 0 && productsArrowLeft.classList.contains('hidden')) productsArrowLeft.classList.remove('hidden');

    products.scrollLeft += 50;
    if((products.scrollWidth-products.scrollLeft) === products.clientWidth){
        productsArrowRight.classList.add('hidden');
    }
})


const productContainer = document.getElementById('product-container');
productContainer.addEventListener('mouseover',()=>{
    const productText = document.getElementById('product-text');
    productText.classList.replace('text-[#404040]','text-azul');
})
productContainer.addEventListener('mouseout',()=>{
    const productText = document.getElementById('product-text');
    productText.classList.replace('text-azul','text-[#404040]');
})