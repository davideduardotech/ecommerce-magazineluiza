class Stepper{
    constructor(){
        // CODDING: Formularios Instancias
        this.formularioDePagamento = null;

        // CODDING: Formularios Container
        this.formularioDeInformacoesPessoaisElement = document.getElementById('formulario-informacoes-pessoais');
        this.formularioDeEnderecoElement = document.getElementById('formulario-endereco');
        this.formularioDePagamentoElement = document.getElementById('formulario-de-pagamento');
        

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

    

    preencherInformacoesPessoais(){
        // alterar stepper para informações pessoais
        this.activeStepper(this.personalInformationStepper);
        this.changeStepper({stepper: this.personalInformationStepper,icon: 'fa-solid fa-user', title: 'Informações Pessoais', subtitle: 'preencha as informações'});
        
        // mostrar formulario de informações pessoais
        this.formularioDeInformacoesPessoaisElement.classList.remove('hidden');

        // esconder formulário de endereço
        this.formularioDeEnderecoElement.classList.add('hidden');
    
        // esconder formulário de pagamento
        this.formularioDePagamentoElement.classList.add('hidden');
        
        
    } 
    
    preencherEndereco(){

        // alterar stepper para informações pessoais
        this.changeStepper({stepper: this.personalInformationStepper, icon: 'fa-solid fa-location-dot text-xl', title: 'Endereço de Entrega', subtitle: 'preencha seu endereço'});
      
        // enconder formulário de informações pessoais
        this.formularioDeInformacoesPessoaisElement.classList.add('hidden');

        // mostrar formulário de endereço
        this.formularioDeEnderecoElement.classList.remove('hidden');

        // desativar stepper de pagamento
        this.disableStepper(this.paymentStepper);

        // esconder formulário de pagamento
        this.formularioDePagamentoElement.classList.add('hidden');

        // esconder botão de pagamento do formulario de pagamento
        this.formularioDePagamento.removePaymentButton();
    }

    preencherPagamento(){
        // alterar stepper para pagamento
        this.activeStepper(this.paymentStepper);
        
        // enconder formulário de informações pessoais
        this.formularioDeInformacoesPessoaisElement.classList.add('hidden');

        // esconder formulário de endereço
        this.formularioDeEnderecoElement.classList.add('hidden');

        // mostrar formulário de pagamento
        this.formularioDePagamentoElement.classList.remove('hidden');

        // mostrar botão de pagamento
        this.formularioDePagamento.showPaymentButton();
    }
}

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

class FormularioInformacoesPessoais{
    constructor(stepper){
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

    saveLocalStorage(){
        if(localStorage.getItem('formulario-de-informacoes-pessoais')) localStorage.removeItem('formulario-de-informacoes-pessoais');
        localStorage.setItem('formulario-de-informacoes-pessoais',JSON.stringify({nome: this.nome, sobrenome: this.sobrenome, email: this.email, telefone: this.telefone}));
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

            // CODDING: Salvar informações pessoais no LocalStorage
            this.saveLocalStorage();

            // CODDING: Mostrar formulario de endereço
            this.stepper.preencherEndereco(); 
        });
    }
}

class FormularioEndereco{
    constructor(stepper){
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

    saveLocalStorage(){
        if(localStorage.getItem('formulario-de-endereco')) localStorage.removeItem('formulario-de-endereco');
        localStorage.setItem('formulario-de-endereco',JSON.stringify({rua: this.rua, bairro: this.bairro,cidade: this.cidade, estado: this.estado, cep: this.cep}));
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

    voltar(){
        // CODDING: Botão voltar
        const buttonVoltar = document.getElementById('formulario-endereco-botao-voltar');
        buttonVoltar.addEventListener('click',()=>{
            this.stepper.preencherInformacoesPessoais();
        });
    }
    continuar(){
        // CODDING: Botão continuar
        const buttonContinuar = document.getElementById('form-address-button-continue');
        buttonContinuar.addEventListener('click',async ()=>{
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
            
            if(isError) return;
            
            // CODDING: Salvar no LocalStorage
            this.saveLocalStorage(); 
          
            // CODDING: Preencher informações de pagamento
            this.stepper.preencherPagamento(); 
        });
    }
}

class FormularioDePagamento{
    constructor(stepper){
        this.stepper = stepper;

        // CODDING: Tipagem
        this.typePix = 'pix';
        this.typeCreditCard = 'credit_card';
        this.typeBoleto = 'boleto';

        // CODDING: Botões de seleção
        this.botaoDeSelecaoPix = document.getElementById('method-payment-pix');
        this.botaoDeSelecaoCartaoDeCredito = document.getElementById('method-payment-credit-card');
        this.botaoDeSelecaoBoleto = document.getElementById('method-payment-boleto');


        // CODDING: Botões de pagamento
        this.botoesDePagamentoElement = document.getElementById('formulario-de-pagamento-botoes-de-pagamento');
        this.botaoDePagamentoPix = document.getElementById('formulario-de-pagamento-pix');
        this.botaoDePagamentoCreditCard = document.getElementById('formulario-de-pagamento-creditcard');
        this.botaoDePagamentoBoleto = document.getElementById('formulario-de-pagamento-boleto');

      
        this.selectedPaymentMethod = this.typePix;
    }
    voltar(){
        const botaoVoltar = document.getElementById('formulario-de-pagamento-botao-voltar');
        botaoVoltar.addEventListener('click',()=>{
            this.stepper.preencherEndereco();
        });
    }
    showPaymentButton(){
        if(this.selectedPaymentMethod === this.typePix) this.botaoDePagamentoPix.classList.remove('hidden');
        if(this.selectedPaymentMethod === this.typeCreditCard) this.botaoDePagamentoCreditCard.classList.remove('hidden');
        if(this.selectedPaymentMethod === this.typeBoleto) this.botaoDePagamentoBoleto.classList.remove('hidden');
    }
    removePaymentButton(){
        if(this.selectedPaymentMethod === this.typePix) this.botaoDePagamentoPix.classList.add('hidden');
        if(this.selectedPaymentMethod === this.typeCreditCard) this.botaoDePagamentoCreditCard.classList.add('hidden');
        if(this.selectedPaymentMethod === this.typeBoleto) this.botaoDePagamentoBoleto.classList.add('hidden');
    }
    resetButton(selectType){
        // CODDING: Resetar botão do pix
        if(selectType === this.typePix){
        
            this.botaoDeSelecaoPix.classList.replace('bg-azul','bg-white');
            this.botaoDeSelecaoPix.classList.replace('text-white','text-azul');
            this.botaoDeSelecaoPix.querySelector('img').classList.add('hidden');

            // remover beneficios do pix
            const beneficiosDoPix = document.getElementById('method-payment-benefits-of-pix');
            beneficiosDoPix.classList.add('hidden');

            // remover botão do pix
            this.botaoDePagamentoPix.classList.add("hidden");
        }

        // CODDING: Resetar botão do cartão de credito
        if(selectType === this.typeCreditCard){
            
            this.botaoDeSelecaoCartaoDeCredito.classList.replace('bg-azul','bg-white');
            this.botaoDeSelecaoCartaoDeCredito.classList.replace('text-white','text-azul');
            this.botaoDeSelecaoCartaoDeCredito.querySelector('img').classList.add('hidden');

            // remover formulário do cartão de crédito
            const formularioCartaoDeCredito = document.getElementById('method-payment-form-credit-card');
            formularioCartaoDeCredito.classList.add('hidden');

            // remover botão do cartão de crédito
            this.botaoDePagamentoCreditCard.classList.add('hidden');

        }

        // CODDING: Resetar botão do boleto
        if(selectType === this.typeBoleto){

            this.botaoDeSelecaoBoleto.classList.replace('bg-azul','bg-white');
            this.botaoDeSelecaoBoleto.classList.replace('text-white','text-azul');
            this.botaoDeSelecaoBoleto.querySelector('img').classList.add('hidden');

            // remover beneficios do boleto
            const beneficiosDoBoleto = document.getElementById('method-payment-benefits-of-boleto');
            beneficiosDoBoleto.classList.add('hidden');

            // remover botão do boleto
            this.botaoDePagamentoBoleto.classList.add('hidden');
        }
    }
    selectedPix(){
        this.botaoDeSelecaoPix.addEventListener('click',()=>{
            if(this.selectedPaymentMethod === this.typePix) return;

            this.resetButton(this.selectedPaymentMethod); // resetar botão selecionado
            this.selectedPaymentMethod = this.typePix;

            this.botaoDeSelecaoPix.classList.replace('bg-white','bg-azul');
            this.botaoDeSelecaoPix.classList.replace('text-azul','text-white');
            this.botaoDeSelecaoPix.querySelector('img').classList.remove('hidden');

            // mostrar beneficios do pix
            const beneficiosDoPix = document.getElementById('method-payment-benefits-of-pix');
            beneficiosDoPix.classList.remove('hidden');

            // mostrar botão do pix
            this.botaoDePagamentoPix.classList.remove('hidden');

        });
    }
    selectedCreditCard(){
        this.botaoDeSelecaoCartaoDeCredito.addEventListener('click',()=>{
            if(this.selectedPaymentMethod === this.typeCreditCard) return

            this.resetButton(this.selectedPaymentMethod); // resetar botão selecionado
            this.selectedPaymentMethod = this.typeCreditCard;

            this.botaoDeSelecaoCartaoDeCredito.classList.replace('bg-white','bg-azul');
            this.botaoDeSelecaoCartaoDeCredito.classList.replace('text-azul','text-white');
            this.botaoDeSelecaoCartaoDeCredito.querySelector('img').classList.remove('hidden');

            // mostrar formulário do cartão de credito
            const formularioCreditCard = document.getElementById('method-payment-form-credit-card');
            formularioCreditCard.classList.remove('hidden');

            // mostrar botão do cartão de crédito
            this.botaoDePagamentoCreditCard.classList.remove('hidden');
        });
    }
    selectedBoleto(){
        this.botaoDeSelecaoBoleto.addEventListener('click',()=>{
            if(this.selectedPaymentMethod === this.typeBoleto) return console.log(`${this.metodoDePagamento} já selecioando, escolha outro`);

            this.resetButton(this.selectedPaymentMethod); // resetar botão selecionado
            this.selectedPaymentMethod = this.typeBoleto;

            this.botaoDeSelecaoBoleto.classList.replace('bg-white','bg-azul');
            this.botaoDeSelecaoBoleto.classList.replace('text-azul','text-white');
            this.botaoDeSelecaoBoleto.querySelector('img').classList.remove('hidden');

            // mostrar beneficios do boleto
            const beneficiosDoBoleto = document.getElementById('method-payment-benefits-of-boleto');
            beneficiosDoBoleto.classList.remove('hidden');

            // mostrar botão do boleto
            this.botaoDePagamentoBoleto.classList.remove('hidden');
        });
    }
    
}

const stepper = new Stepper();
stepper.preencherInformacoesPessoais(); 


const minhaSacola = new MinhaSacola();
minhaSacola.addItem();
minhaSacola.removeItem();

const formularioInformacoesPessoais = new FormularioInformacoesPessoais(stepper);
formularioInformacoesPessoais.continuar(); 


const formularioEndereco = new FormularioEndereco(stepper);
formularioEndereco.continuar(); 
formularioEndereco.voltar();

const formularioDePagamento = new FormularioDePagamento(stepper);
stepper.formularioDePagamento = formularioDePagamento;
formularioDePagamento.selectedPix(); 
formularioDePagamento.selectedCreditCard();
formularioDePagamento.selectedBoleto();
formularioDePagamento.voltar();
