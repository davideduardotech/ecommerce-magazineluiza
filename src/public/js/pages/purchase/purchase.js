

class MinhaSacola{
    constructor(){
        this.produtos = [];
        this.subTotal = 0;
        this.total = 0;
        
        // CODDING: Inicializar
        Array.from(document.getElementById('products').childNodes).filter(child=>child.nodeType===1).forEach(element=>{
            if(element.tagName === 'TR'){
                const produtoObject = this.criarProduto(element); // criar Object do produto
                this.produtos.push(produtoObject);
            }
        });

        this.produtos.forEach(produto=>{
            this.subTotal += produto.valor;
            this.total += produto.valor;
        })

        document.getElementById('subtotal-value').textContent = `R$ ${this.subTotal}`;
        document.getElementById('total-value').textContent = `R$ ${this.total}`;

        console.log('meus produtos:',this.produtos);
    }

    criarProduto(element){ // criar Object do produto
        const produtoId = element.getAttribute('produto-id-data');
        const quantidade = parseInt(element.querySelector('#table-product-item-quantity')?.textContent||'0');
        const valorUnidade = parseFloat(element.querySelector('#table-product-unit-value')?.textContent.replace('R$','').trim()||'0');
        return {id: produtoId, element: element, quantidade: quantidade, valorUnidade: valorUnidade, valor: quantidade*valorUnidade};
    }

    addItem(){
        const addItemList = document.querySelectorAll('.table-product-add-item');
        addItemList.forEach(elementAddItem=>{
            elementAddItem.addEventListener('click',()=>{
                const produtoId = elementAddItem.getAttribute('produto-id-data'); // pegar ObjectID do produto
                this.produtos.forEach((produto, index)=>{
                    if(produto.id === produtoId){
                        console.log(`index do Object na lista de produtos:`,this.produtos.findIndex(produto=> produto.id===produtoId));
                        // adicionar item
                        this.produtos[index].quantidade +=1;
                        produto.element.querySelector('#table-product-item-quantity').textContent = `${this.produtos[index].quantidade}`;

                        // atualizar valor total do item
                        const quantidade = this.produtos[index].quantidade;
                        const valorUnidade = this.produtos[index].valorUnidade;
                        this.produtos[index].valor = quantidade*valorUnidade;
                        produto.element.querySelector('#table-product-amount').textContent = `R$ ${this.produtos[index].valor.toFixed(2)}`;

                        // atualizar valor subtotal e total do checkout
                        let valorTotal = 0;
                        this.produtos.forEach(produto=>{
                            valorTotal+=produto.valor;
                        });

                        this.subTotal = valorTotal;
                        document.getElementById('subtotal-value').textContent = `R$ ${this.subTotal.toFixed(2)}`;
                        this.total = valorTotal;
                        document.getElementById('total-value').textContent = `R$ ${this.total.toFixed(2)}`;
                    }
                })
                
            });
        });
    }

    removeItem(){
        const removeItemList = document.querySelectorAll('.table-product-remove-item');
        removeItemList.forEach(elementRemoveItem=>{
            elementRemoveItem.addEventListener('click',()=>{
                // pegar ObjectID do produto
                const produtoId = elementRemoveItem.getAttribute('produto-id-data');
                this.produtos.forEach((produto,index)=>{
                    if(produto.id === produtoId){
                        // remover item da quantidade
                        if(this.produtos[index].quantidade > 1) {
                            this.produtos[index].quantidade -=1;
                            this.produtos[index].element.querySelector('#table-product-item-quantity').textContent = this.produtos[index].quantidade;
                            
                            // atualizar valor
                            const quantidade = this.produtos[index].quantidade;
                            const valorUnidade = this.produtos[index].valorUnidade;
                            this.produtos[index].valor = quantidade*valorUnidade;
                            this.produtos[index].element.querySelector('#table-product-amount').textContent = `R$ ${this.produtos[index].valor.toFixed(2)}`;

                            // atualizar valor subtotal e total do checkout 
                            let valorTotal = 0;
                            this.produtos.forEach((produto,index)=>{
                                
                                valorTotal += produto.valor;
                            })

                            document.getElementById('subtotal-value').textContent = `R$ ${valorTotal.toFixed(2)}`;
                            document.getElementById('total-value').textContent = `R$ ${valorTotal.toFixed(2)}`;
                        }
                    }
                })
            })
        })
    }
}

const minhaSacola = new MinhaSacola();
minhaSacola.addItem(); // CODDING: Adicionar item
minhaSacola.removeItem(); // CODDING: Remover item

console.log(`input nome:`,document.getElementById('input-nome'));
console.log(`input nome:`,document.getElementById('input-nome').value);

class FormularioInformacoesPessoais{
    constructor(){
        this.nome = document.getElementById('input-nome')?.value;
        this.nomeElement = document.getElementById('input-nome');
        this.sobrenome = document.getElementById('input-sobrenome')?.value;
        this.sobrenomeElement = document.getElementById('input-sobrenome');
        this.email = document.getElementById('input-email')?.value;
        this.emailElement = document.getElementById('input-email');
        this.telefone = document.getElementById('input-telefone')?.value;
        this.telefoneElement = document.getElementById('input-telefone');
        
        if(this.nomeElement){ // nome
            this.nomeElement.addEventListener('input',()=>{
                this.nome = this.nomeElement.value;
                this.removeError(document.getElementById('container-input-nome'));
            })
        }

        if(this.sobrenomeElement){ // sobrenome
            this.sobrenomeElement.addEventListener('input',()=>{
                this.sobrenome = this.sobrenomeElement.value;
                this.removeError(document.getElementById('container-input-sobrenome'));
            })
        }

        if(this.emailElement){ // email
            this.emailElement.addEventListener('input',()=>{
                this.email = this.emailElement.value;
                this.removeError(document.getElementById('container-input-email'));
            })
        }
        
        if(this.telefoneElement){ // telefone
            this.telefoneElement.addEventListener('input',()=>{
                this.telefone = this.telefoneElement.value;
                this.removeError(document.getElementById('container-input-telefone'));
            })
        }

    }

    addError(containerElement){
        const label = containerElement.querySelector('label');
        const input = containerElement.querySelector('input');
        const paragraph = containerElement.querySelector('p');
        
        label.classList.add('text-red-500');
        input.classList.add('border-red-500','text-red-500','placeholder-red-500');
        input.classList.replace('focus:border-azul','focus:border-red-500');
        paragraph.classList.remove('hidden');
    }

    removeError(containerElement){
        const label = containerElement.querySelector('label');
        const input = containerElement.querySelector('input');
        const paragraph = containerElement.querySelector('p');

        label.classList.remove('text-red-500');
        input.classList.remove('border-red-500','text-red-500','placeholder-red-500');
        input.classList.replace('focus:border-red-500','focus:border-azul');

        paragraph.classList.add('hidden');
    }

    continuar(){
        const buttonContinue = document.getElementById('form-personal-information-button-continue');
        buttonContinue.addEventListener('click',()=>{
            // verificar nome
            if(this.nome.trim() === ''){
                const containerElement = document.getElementById('container-input-nome');
                this.addError(containerElement);
            }

            // verificar sobrenome 
            if(this.sobrenome.trim() === ''){
                const containerElement = document.getElementById('container-input-sobrenome');
                this.addError(containerElement);
            }

            // verificar email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexEmail.test(this.email)){ // email inválido
                const containerElement = document.getElementById('container-input-email');
                this.addError(containerElement);
            }

            // verificar telefone
            const regexTelefone = /^\d{2}\d{9}$/;
            if(!regexTelefone.test(this.telefone)){ // telefone inválido
                const containerElement = document.getElementById('container-input-telefone');
                this.addError(containerElement);
            }
        });
    }
}

const formularioInformacoesPessoais = new FormularioInformacoesPessoais();
formularioInformacoesPessoais.continuar();


// CODDING: Realizar pagamento 
class RealizarPagamento{
    constructor(){
        // tipagem
        this.typePix = 'pix';
        this.typeCreditCard = 'credit_card';
        this.typeBoleto = 'boleto';

        this.metodoDePagamento = this.typePix;
    }
    resetButtonSelected(selectType){
        // CODDING: Resetar botão do pix
        if(selectType === this.typePix){
            const methodPaymentPix = document.getElementById('method-payment-pix');
            methodPaymentPix.classList.replace('bg-azul','bg-white');
            methodPaymentPix.classList.replace('text-white','text-azul');
            methodPaymentPix.querySelector('img').classList.add('hidden');
        }

        // CODDING: Resetar botão do cartão de credito
        if(selectType === this.typeCreditCard){
            const methodPaymentCreditCard = document.getElementById('method-payment-credit-card');
            methodPaymentCreditCard.classList.replace('bg-azul','bg-white');
            methodPaymentCreditCard.classList.replace('text-white','text-azul');
            methodPaymentCreditCard.querySelector('img').classList.add('hidden');
        }

        // CODDING: Resetar botão do boleto
        if(selectType === this.typeBoleto){
            const methodPaymentBoleto = document.getElementById('method-payment-boleto');
            methodPaymentBoleto.classList.replace('bg-azul','bg-white');
            methodPaymentBoleto.classList.replace('text-white','text-azul');
            methodPaymentBoleto.querySelector('img').classList.add('hidden');
        }
    }
    selectedPix(){
        const methodPaymentPix = document.getElementById('method-payment-pix');
        methodPaymentPix.addEventListener('click',()=>{
            if(this.metodoDePagamento === this.typeBoleto) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            console.log('resetar botão:',this.metodoDePagamento);
            this.resetButtonSelected(this.metodoDePagamento); // resetar botão selecionado
            this.metodoDePagamento = this.typeCreditCard;

            methodPaymentPix.classList.replace('bg-white','bg-azul');
            methodPaymentPix.classList.replace('text-azul','text-white');
            methodPaymentPix.querySelector('img').classList.remove('hidden');

        });
    }
    selectedCreditCard(){
        const methodPaymentCreditCard = document.getElementById('method-payment-credit-card');
        methodPaymentCreditCard.addEventListener('click',()=>{
            if(this.metodoDePagamento === this.typeCreditCard) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            console.log('resetar botão:',this.metodoDePagamento);
            this.resetButtonSelected(this.metodoDePagamento); // resetar botão selecionado
            this.metodoDePagamento = this.typeCreditCard;

            methodPaymentCreditCard.classList.replace('bg-white','bg-azul');
            methodPaymentCreditCard.classList.replace('text-azul','text-white');
            methodPaymentCreditCard.querySelector('img').classList.remove('hidden');
        });
    }
    selectedBoleto(){
        const methodPaymentBoleto = document.getElementById('method-payment-boleto');
        methodPaymentBoleto.addEventListener('click',()=>{
            if(this.metodoDePagamento === this.typeBoleto) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            console.log('resetar botão:',this.metodoDePagamento);
            this.resetButtonSelected(this.metodoDePagamento); // resetar botão selecionado
            this.metodoDePagamento = this.typeCreditCard;

            methodPaymentBoleto.classList.replace('bg-white','bg-azul');
            methodPaymentBoleto.classList.replace('text-azul','text-white');
            methodPaymentBoleto.querySelector('img').classList.remove('hidden');
        });
    }
    
}

const realizarPagamento = new RealizarPagamento();
realizarPagamento.selectedPix(); 
realizarPagamento.selectedCreditCard();
realizarPagamento.selectedBoleto();
