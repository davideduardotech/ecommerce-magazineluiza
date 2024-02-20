class MinhaSacola{
    constructor(){
        this.produtos = [];
        this.subTotal = 0;
        this.total = 0;
    
        Array.from(document.getElementById('produtos').childNodes).filter(child=>child.nodeType===1).forEach(element=>{
            if(element.tagName === 'TR'){
                const produtoId = element.getAttribute('produto-id-data');
                const produto = {
                    id: produtoId,
                    quantidade:1,
                    valorUnidade:0,
                    valor:0
                };
                this.produtos.push(produto);
            }
        });

        console.log('meus produtos:',this.produtos);
    }

    add(){

    }
}

const minhaSacola = new MinhaSacola();

console.log(document.getElementById('produtos'));
