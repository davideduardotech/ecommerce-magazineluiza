
// CODDING: Stepper
class Stepper{
    constructor(){
        this.formularioDeInformacoesPessoais = document.getElementById('formulario-informacoes-pessoais');
        this.formularioDeEndereco = document.getElementById('formulario-endereco');
        this.formularioDePagamento = document.getElementById('formulario-de-pagamento');

        this.iconSize = '';

        // CODDING: Stepper informações pessoais
        this.personalInformationStepper = document.getElementById('stepper-personal-information');
        this.paymentStepper = document.getElementById('stepper-payment');
        this.trackOrderStepper = document.getElementById('stepper-track-order');
        
    }

    activeStepper(stepper){
        const iconContainer = stepper.querySelectorAll('span')[0];
        iconContainer.classList.remove('border','border-gray-400','text-gray-400');
        iconContainer.classList.add('bg-azul','text-white');

        const title = stepper.querySelector('h3');
        title.classList.replace('text-gray-400','text-azul');

        const subTitle = stepper.querySelector('p');
        subTitle.classList.replace('text-gray-400','text-azul');
    }
    disableStepper(stepper){
        const iconContainer = stepper.querySelectorAll('span')[0]; 
        iconContainer.classList.add('border','border-gray-400','text-gray-400');
        iconContainer.classList.remove('bg-azul','text-white');
        
        const title = stepper.querySelector('h3');
        title.classList.replace('text-azul','text-gray-400');

        const subTitle = stepper.querySelector('p');
        subTitle.classList.replace('text-azul','text-gray-400');


    }
    changeStepper({stepper, icon, title, subtitle}){
        if(icon){
            const iconElement = stepper.querySelector('i');
            iconElement.className = icon+' '+Array.from(iconElement.classList).filter(className=>!className.startsWith('fa')).join(' ');
        
        }

        if(title){ // alterar titulo
            const titleElement = stepper.querySelector('h3');
            titleElement.textContent = title;
        }

        if(subtitle){ // alterar subtitulo
            const subtitleElement = stepper.querySelector('p');
            subtitleElement.textContent = subtitle;
        }
        
    }

    alterarStepper({type}){ // {type: "personal-information"}, {type: "address"}
        if(type === 'personal-information'){

        }
    }
    

    preencherInformacoesPessoais(){
        // alterar stepper para informações pessoais
        this.activeStepper(this.personalInformationStepper);
        this.changeStepper({stepper: this.personalInformationStepper, title: 'Informações Pessoais', subtitle: 'preencha as informações'});
        
        // mostrar formulario de informações pessoais
        this.formularioDeInformacoesPessoais.classList.remove('hidden');

        // esconder formulário de endereço
        this.formularioDeEndereco.classList.add('hidden');
    
        // esconder formulário de pagamento
        this.formularioDePagamento.classList.add('hidden');
    } 
    
    preencherEndereco(){
        // alterar stepper para informações pessoais
        this.changeStepper({stepper: this.personalInformationStepper, icon: 'fa-solid fa-location-dot text-xl', title: 'Endereço de Entrega', subtitle: 'preencha seu endereço'});
      
        // enconder formulário de informações pessoais
        this.formularioDeInformacoesPessoais.classList.add('hidden');

        // mostrar formulário de endereço
        this.formularioDeEndereco.classList.remove('hidden');

        // esconder formulário de pagamento
        this.formularioDePagamento.classList.add('hidden');
    }

    preencherPagamento(){
        // alterar stepper para pagamento
        this.activeStepper(this.paymentStepper);
        

        // enconder formulário de informações pessoais
        this.formularioDeInformacoesPessoais.classList.add('hidden');

        // esconder formulário de endereço
        this.formularioDeEndereco.classList.add('hidden');

        // esconder formulário de pagamento
        this.formularioDePagamento.classList.remove('hidden');
    }
}

const stepper = new Stepper();
stepper.preencherInformacoesPessoais(); // CODDING: Preencher informações pessoais

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

// CODDING: Formulario de informações pessoais
class FormularioInformacoesPessoais{
    constructor(){
        // CODDING: Instancia de Stepper
        this.stepper = stepper;

        this.nome = document.getElementById('input-nome')?.value;
        this.nomeElement = document.getElementById('input-nome');
        this.nomeContainer = document.getElementById('formulario-informacoes-pessoais-container-nome');
        this.sobrenome = document.getElementById('input-sobrenome')?.value;
        this.sobrenomeElement = document.getElementById('input-sobrenome');
        this.sobrenomeContainer = document.getElementById('formulario-informacoes-pessoais-container-sobrenome');
        this.email = document.getElementById('input-email')?.value;
        this.emailElement = document.getElementById('input-email');
        this.emailContainer = document.getElementById('formulario-informacoes-pessoais-container-email');
        this.telefone = document.getElementById('input-telefone')?.value;
        this.telefoneElement = document.getElementById('input-telefone');
        this.telefoneContainer = document.getElementById('formulario-informacoes-pessoais-container-telefone');
        
        if(this.nomeElement){ // nome
            this.nomeElement.addEventListener('input',()=>{
                this.nome = this.nomeElement.value;
                this.removeError(this.nomeContainer);
            });
        }

        if(this.sobrenomeElement){ // sobrenome
            this.sobrenomeElement.addEventListener('input',()=>{
                this.sobrenome = this.sobrenomeElement.value;
                this.removeError(this.sobrenomeContainer);
            });
        }

        if(this.emailElement){ // email
            this.emailElement.addEventListener('input',()=>{
                this.email = this.emailElement.value;
                this.removeError(this.emailContainer);
            });
        }
        
        if(this.telefoneElement){ // telefone
            this.telefoneElement.addEventListener('input',()=>{
                this.telefone = this.telefoneElement.value;
                this.removeError(this.telefoneContainer);
            });
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
        const buttonContinue = document.getElementById('formulario-informacoes-pessoais-botao-continuar');
        buttonContinue.addEventListener('click',()=>{
            let isError = false;

            // verificar nome
            if(this.nome.trim() === '') (this.addError(this.nomeContainer), isError = true);
        
            // verificar sobrenome 
            if(this.sobrenome.trim() === '') (this.addError(this.sobrenomeContainer), isError = true);
            

            // verificar email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexEmail.test(this.email)) (this.addError(this.emailContainer), isError=true);

            // verificar telefone
            const regexTelefone = /^\d{2}\d{9}$/;
            if(!regexTelefone.test(this.telefone)) (this.addError(this.telefoneContainer), isError = true);

            if(isError) return;

            // CODDING: Mostrar formulario de endereço
            this.stepper.preencherEndereco(); 
        });
    }
}

const formularioInformacoesPessoais = new FormularioInformacoesPessoais();
formularioInformacoesPessoais.continuar(); // CODDING: Continuar

// CODDING: Formulário de endereço
class FormularioAddress{
    constructor(){
        // CODDING: Stepper
        this.stepper = stepper;


        this.rua = document.getElementById('input-rua').value;
        this.ruaElement = document.getElementById('input-rua');
        this.ruaContainer = document.getElementById('container-input-rua');
        this.bairro = document.getElementById('input-bairro').value;
        this.bairroElement = document.getElementById('input-bairro');
        this.bairroContainer = document.getElementById('container-input-bairro');
        this.cidade = document.getElementById('input-cidade').value;
        this.cidadeElement = document.getElementById('input-cidade');
        this.cidadeContainer = document.getElementById('container-input-cidade');
        this.estado = document.getElementById('input-estado').value;
        this.estadoElement = document.getElementById('input-estado');
        this.estadoContainer = document.getElementById('container-input-estado');
        this.cep = document.getElementById('input-cep').value;
        this.cepElement = document.getElementById('input-cep');
        this.cepContainer = document.getElementById('container-input-cep');

        [this.ruaElement, this.bairroElement, this.cidadeElement, this.estadoElement, this.cepElement].forEach(element=>{
            element.addEventListener('input', async (event)=>{
                if(event.target.id === this.ruaElement.id) (this.rua = event.target.value, this.removeErrorInInput(this.ruaContainer)); // rua
                if(event.target.id === this.bairroElement.id) (this.bairro = event.target.value, this.removeErrorInInput(this.bairroContainer)); // bairro
                if(event.target.id === this.cidadeElement.id) (this.cidade = event.target.value, this.removeErrorInInput(this.cidadeContainer)); // cidade
                if(event.target.id === this.estadoElement.id) (this.estado = event.target.value, this.removeErrorInInput(this.estadoContainer)); // estado
                if (event.target.id === this.cepElement.id) { // Verifica se o evento é no campo de CEP
                    this.removeErrorInInput(this.cepContainer);
                    this.cepElement.value = event.target.value.replace(/\D/g, "").substring(0,8); // Remove todos os caracteres que não são dígitos
                    if(this.cepElement.value.length===8){
                
                        const request = await this.validateZipCode(this.cepElement.value);
                        if(request.status){
                            this.cep = this.cepElement.value;

                            this.rua = request.data.logradouro;
                            this.ruaElement.value = this.rua;

                            this.bairro = request.data.bairro;
                            this.bairroElement.value = this.bairro;

                            this.cidade = request.data.localidade;
                            this.cidadeElement.value = this.cidade;

                            this.estado = request.data.uf;
                            this.estadoElement.value = this.estado;

                            // remover erro 
                            [this.ruaContainer, this.bairroContainer, this.cidadeContainer, this.estadoContainer, this.cepContainer].forEach(container=>this.removeErrorInInput(container));
                        }else{
                            this.addErrorInInput(this.cepContainer);
                        }
                        
                    }
                  
                    
                    
                }
            })
        })
    }

    addErrorInInput(element){
        const label = element.querySelector('label');
        const input = element.querySelector('input');
        const paragraph = element.querySelector('p');

        label.classList.add('text-red-500');
        input.classList.add('border-red-500','placeholder-red-500','text-red-500');
        input.classList.replace('focus:border-azul','focus:bordeer-red-500');
        paragraph.classList.remove('hidden');
    }
    removeErrorInInput(element){
        const label = element.querySelector('label');
        const input = element.querySelector('input');
        const paragraph = element.querySelector('p');

        label.classList.remove('text-red-500');
        input.classList.remove('border-red-500','placeholder-red-500','text-red-500');
        input.classList.replace('focus:border-red-500','focus:bordeer-azul');
        paragraph.classList.add('hidden');
    }

    async validateZipCode(cep){
        try{
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if(request.status !== 200) return {status:false, data:{}};
            const requestData = await request.json();
            if(!requestData.logradouro && !requestData.bairro && !requestData.localidade && !requestData.uf) return {status:false,data:{}};
            return {status:true, data:requestData};
        }catch(error){
            return {status:false, data:{}};
        }
    }

    continuar(){
        const button = document.getElementById('form-address-button-continue');
        button.addEventListener('click',async ()=>{
            let isError = false;
            if(this.ruaElement.value.trim().length === 0) (this.addErrorInInput(this.ruaContainer), isError = true); // verificar nome da rua
            if(this.bairroElement.value.trim().length === 0) (this.addErrorInInput(this.bairroContainer), isError = true); // verificar bairro
            if(this.cidadeElement.value.trim().length === 0) (this.addErrorInInput(this.cidadeContainer), isError = true); // verificar cidade
            if(this.estadoElement.value.trim().length === 0) (this.addErrorInInput(this.estadoContainer), isError = true); // verificar estado
            if(this.cepElement.value.trim().length === 0 || this.cepElement.value.trim().length < 8) (this.addErrorInInput(this.cepContainer), isError = true); // verificar tamanho do cep
            if(this.cepElement.value.trim().length === 8){
                const request = await this.validateZipCode(this.cepElement.value.trim());
                if(!request.status) (this.addErrorInInput(this.cepContainer), isError = true);
            }
            

            if(isError) return console.log('Erros encontrado não é possivel continuar');
            console.log(`rua: ${this.rua}\nbairro: ${this.bairro}\ncidade: ${this.cidade}\nestado: ${this.estado}\ncep: ${this.cep}`);

            // CODDING: Preencher informações de pagamento
            this.stepper.preencherPagamento(); 
        });
    }
}

const formularioAddress = new FormularioAddress();
formularioAddress.continuar(); // CODDING: Continuar 

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

            // remover beneficios do pix
            const beneficiosDoPix = document.getElementById('method-payment-benefits-of-pix');
            beneficiosDoPix.classList.add('hidden');

            // remover botão do pix
            const buttonDoPix = document.getElementById('method-payment-button-pix');
            buttonDoPix.classList.add("hidden");
        }

        // CODDING: Resetar botão do cartão de credito
        if(selectType === this.typeCreditCard){
            const methodPaymentCreditCard = document.getElementById('method-payment-credit-card');
            methodPaymentCreditCard.classList.replace('bg-azul','bg-white');
            methodPaymentCreditCard.classList.replace('text-white','text-azul');
            methodPaymentCreditCard.querySelector('img').classList.add('hidden');

            // remover formulário do cartão de crédito
            const formularioCartaoDeCredito = document.getElementById('method-payment-form-credit-card');
            formularioCartaoDeCredito.classList.add('hidden');

            // remover botão do cartão de crédito
            const buttonCreditCard = document.getElementById('method-payment-button-creditcard');
            buttonCreditCard.classList.add('hidden');

        }

        // CODDING: Resetar botão do boleto
        if(selectType === this.typeBoleto){
            const methodPaymentBoleto = document.getElementById('method-payment-boleto');
            methodPaymentBoleto.classList.replace('bg-azul','bg-white');
            methodPaymentBoleto.classList.replace('text-white','text-azul');
            methodPaymentBoleto.querySelector('img').classList.add('hidden');

            // remover beneficios do boleto
            const beneficiosDoBoleto = document.getElementById('method-payment-benefits-of-boleto');
            beneficiosDoBoleto.classList.add('hidden');

            // remover botão do boleto
            const buttonBoleto = document.getElementById('method-payment-button-boleto');
            buttonBoleto.classList.add('hidden');
        }
    }
    selectedPix(){
        const methodPaymentPix = document.getElementById('method-payment-pix');
        methodPaymentPix.addEventListener('click',()=>{
            if(this.metodoDePagamento === this.typePix) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            console.log('resetar botão:',this.metodoDePagamento);
            this.resetButtonSelected(this.metodoDePagamento); // resetar botão selecionado
            this.metodoDePagamento = this.typePix;

            methodPaymentPix.classList.replace('bg-white','bg-azul');
            methodPaymentPix.classList.replace('text-azul','text-white');
            methodPaymentPix.querySelector('img').classList.remove('hidden');

            // mostrar beneficios do pix
            const beneficiosDoPix = document.getElementById('method-payment-benefits-of-pix');
            beneficiosDoPix.classList.remove('hidden');

            // mostrar botão do pix
            const buttonPix = document.getElementById('method-payment-button-pix');
            buttonPix.classList.remove('hidden');

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

            // mostrar formulário do cartão de credito
            const formularioCreditCard = document.getElementById('method-payment-form-credit-card');
            formularioCreditCard.classList.remove('hidden');

            // mostrar botão do cartão de crédito
            const buttonCreditCard = document.getElementById('method-payment-button-creditcard');
            buttonCreditCard.classList.remove('hidden');
        });
    }
    selectedBoleto(){
        const methodPaymentBoleto = document.getElementById('method-payment-boleto');
        methodPaymentBoleto.addEventListener('click',()=>{
            if(this.metodoDePagamento === this.typeBoleto) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            console.log('resetar botão:',this.metodoDePagamento);
            this.resetButtonSelected(this.metodoDePagamento); // resetar botão selecionado
            this.metodoDePagamento = this.typeBoleto;

            methodPaymentBoleto.classList.replace('bg-white','bg-azul');
            methodPaymentBoleto.classList.replace('text-azul','text-white');
            methodPaymentBoleto.querySelector('img').classList.remove('hidden');

            // mostrar beneficios do boleto
            const beneficiosDoBoleto = document.getElementById('method-payment-benefits-of-boleto');
            beneficiosDoBoleto.classList.remove('hidden');

            // mostrar botão do boleto
            const buttonBoleto = document.getElementById('method-payment-button-boleto');
            buttonBoleto.classList.remove('hidden');
        });
    }
    
}

const realizarPagamento = new RealizarPagamento();
realizarPagamento.selectedPix(); 
realizarPagamento.selectedCreditCard();
realizarPagamento.selectedBoleto();

