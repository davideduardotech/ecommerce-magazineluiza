// CODDING: Menu
class MenuLateral{
    constructor(){
        this.menuContainer = document.getElementById('menu-lateral-container');
        this.menuItemsContainer = document.getElementById('menu-lateral-items');
        this.toggle = document.getElementById('menu-lateral-toggle');
        this.isExpanded = false;

        this.relaxedSize = "min-w-[120px]";
        this.expandedSize = "min-w-[300px]";

        this.items = [
            {name:'Pagina Inicial', icon:'fa-solid fa-house',href:'/sair-da-pagina', id:'menu-item-homepage', selected: false},
            {name:'Pedidos', icon:'fa-solid fa-truck',href:'/sair-da-pagina', id:'menu-item-pedidos', selected: true},
            {name:'Produtos', icon:'fa-solid fa-boxes-stacked',href:'/sair-da-pagina', id:'menu-item-produtos', selected: false},
            {name:'Clientes', icon:'fa-solid fa-users',href:'/sair-da-pagina', id:'menu-item-clientes', selected: false},
            {name:'Promoções', icon:'fa-solid fa-tags',href:'/sair-da-pagina', id:'menu-item-promocao', selected: false},
            {name:'Relatórios', icon:'fa-solid fa-chart-pie',href:'/sair-da-pagina', id:'menu-item-relatorios', selected: false},
            {name:'Configurações', icon:'fa-solid fa-gear',href:'/sair-da-pagina', id:'menu-item-configuracoes', selected: false},
            {name:'Perfil', icon:'fa-solid fa-user',href:'/sair-da-pagina', id:'menu-item-perfil', selected: false}
        ];

        this.renderItems();
        
    }
    renderItems(){
        this.items.forEach(item=>{
            const link = document.createElement('a');
            link.href = item.href;
            link.id = item.id;
            let template;

            if(item.selected){
                link.removeAttribute('href');

                // CODDING: Item Selecionada
                template = `
                <div class="flex flex-row justify-center items-center"> <!-- width: 100% do pai, filho inline-block(tamanho do conteúdo) -->
                    <div class="menu-item bg-white flex flex-row justify-center items-center text-white cursor-pointer rounded-[10px] transition-transform duration-300 hover:scale-105">
                        <div class=" px-[10px] py-[8px] bg-white rounded-[10px] flex flex-row justify-center items-center">
                            <i class="${item.icon} text-xl bg-azul rounded-[10px] min-w-[40px] min-h-[40px]  flex flex-row justify-center items-center shadow-[0_3px_8px_rgba(0,0,0,0.24)]"></i> 
                        </div>
                        <span class="text-base font-normal min-w-[150px] text-azul">${item.name}</span>
                    </div>
                </div>`;
            }else{
                // CODDING: Item 
                template = `
                <div class="flex flex-row justify-center items-center">
                    <div class="menu-item min-h-[40px] flex flex-row justify-center items-center text-white cursor-pointer hover:bg-[#1992ff] transition-transform duration-500 hover:scale-110">
                        <div class="px-[10px]">
                            <i class="${item.icon} text-xl min-w-[40px] min-h-[40px] flex flex-row justify-center items-center"></i>
                        </div> 
                        <span class="text-base min-w-[150px]">${item.name}</span>
                    </div>
                </div>`;
            }
            

            link.innerHTML = template;
            this.menuItemsContainer.appendChild(link);
        });
    }
    changeWidth({width, element}){
        element.className = width+' '+Array.from(element.classList).filter(className=>!className.includes('w-[')).join(' ');
    }
    toggleWidth(){
        this.toggle.addEventListener('click',()=>{
            if(this.isExpanded){ // desexpandir 
                this.changeWidth({width: this.relaxedSize, element: this.menuContainer});

                // esconder
                document.querySelectorAll('.menu-item').forEach(item=>{
                    item.querySelector('span').classList.add('hidden');
                });
            }else{ // expandir
                this.changeWidth({width: this.expandedSize, element: this.menuContainer});
                
                // mostrar
                document.querySelectorAll('.menu-item').forEach(item=>{
                    item.querySelector('span').classList.remove('hidden');
                });
            }

            this.isExpanded = !this.isExpanded;
        });
    }
}

const menu = new MenuLateral();
menu.toggleWidth(); // abrir e fechar menu lateral


class Pedidos{
    constructor(){
        this.botaoHojeElement = document.getElementById('filtrar-pedidos-de-hoje');
        this.botaoUltimos7diasElement = document.getElementById('filtrar-pedidos-ultimos-7-dias');
        this.botaoUltimos30diasElement = document.getElementById('filtrar-pedido-ultimos-30-dias');
        this.botaoPersonalizadoElement = document.getElementById('filtrar-pedido-data-personalizada');

        // CODDING: Dados
        this.pedidosRealizados = 0;
        this.pedidosRealizadosParagraph = document.getElementById('pedidos-realizados-paragraph');
        this.pedidosEntregues = 0;
        this.pedidosEntreguesParagraph = document.getElementById('pedidos-entregues-paragraph');
        this.pedidosCancelados = 0;
        this.pedidosCanceladosParagraph = document.getElementById('pedidos-cancelados-paragraph');

        this.pedidosFake = [
            {
                loja: "65d81dfb9b90361784fe6cc0",
                user: {nome: "David",sobrenome:"Eduardo"},
                produtos: [{id:"65c990e7e7e8ca8a6eacb6d0", nome:"Fritadeira Elétrica sem Óleo/Air Fryer Nell Smart - Preta 2,4L com Timer",quantidade:1, preco: 297},
                {id:"65c990e7e7e8ca8a6eacb6d0", nome:"Celular Samsung Galaxy A05 128GB, 4GB RAM, Tela de 6.7",quantidade:1, preco: 719.10}],
                createdAt: new Date(2024, 2, 25,0,0,0),
                payment:{
                    type:"pix"
                },
                status: {
                    type: "success",
                    message:"entrege"
                }
            },
            {
                loja: "65d81dfb9b90361784fe6cc0",
                user: {nome: "David",sobrenome:"Eduardo"},
                produtos: [{id:"65c990e7e7e8ca8a6eacb6d0", nome:"Fritadeira Elétrica sem Óleo/Air Fryer Nell Smart - Preta 2,4L com Timer",quantidade:1, preco: 297},
                {id:"65c990e7e7e8ca8a6eacb6d0", nome:"Celular Samsung Galaxy A05 128GB, 4GB RAM, Tela de 6.7",quantidade:1, preco: 719.10}],
                createdAt: new Date(2024, 1, 29,0,0,0),
                payment:{
                    type:"pix"
                },
                status: {
                    type: "success",
                    message:"entrege"
                }
            },
            {
                loja: "65d81dfb9b90361784fe6cc0",
                user: {nome: "Jose",sobrenome:"Souza"},
                produtos: [{id:"65c990e7e7e8ca8a6eacb6d0", nome:"Fritadeira Elétrica sem Óleo/Air Fryer Nell Smart - Preta 2,4L com Timer",quantidade:1, preco: 297},
                {id:"65c990e7e7e8ca8a6eacb6d0", nome:"Celular Samsung Galaxy A05 128GB, 4GB RAM, Tela de 6.7",quantidade:1, preco: 719.10}],
                createdAt: new Date(2024, 1,10, 13,56,0),
                payment:{
                    type:"cartão de credito"
                },
                status: {
                    type: "info",
                    message: "em preparação"
                }
            },
            {
                loja: "65d81dfb9b90361784fe6cc0",
                user: {nome: "Mario",sobrenome:"Cortela"},
                produtos: [{id:"65c990e7e7e8ca8a6eacb6d0", nome:"Fritadeira Elétrica sem Óleo/Air Fryer Nell Smart - Preta 2,4L com Timer",quantidade:1, preco: 297},
                {id:"65c990e7e7e8ca8a6eacb6d0", nome:"Celular Samsung Galaxy A05 128GB, 4GB RAM, Tela de 6.7",quantidade:1, preco: 719.10}],
                createdAt: new Date(2024, 2,26, 5,56,0),
                payment:{
                    type:"dinheiro"
                },
                status: {
                    type: "danger",
                    message: "cancelado"
                }
            },
            {
                loja: "65d81dfb9b90361784fe6cc0",
                user: {nome: "Mario",sobrenome:"Cortela"},
                produtos: [{id:"65c990e7e7e8ca8a6eacb6d0", nome:"Fritadeira Elétrica sem Óleo/Air Fryer Nell Smart - Preta 2,4L com Timer",quantidade:1, preco: 297},
                {id:"65c990e7e7e8ca8a6eacb6d0", nome:"Celular Samsung Galaxy A05 128GB, 4GB RAM, Tela de 6.7",quantidade:1, preco: 719.10}],
                createdAt: new Date(2024, 2,26, 13,0,0),
                payment:{
                    type:"dinheiro"
                },
                status: {
                    type: "danger",
                    message: "cancelado"
                }
            }
        ]

        this.graficoData  = {
            labels: ["00:00","00:50","02:45","06:25","09:43","12:32","18:00"],
            datasets: [{
                label: 'Pedidos',
                data: [1, 1, 1,1,1,1,1],
                fill: false,
                borderColor: '#0086FF',
                tension: 0.1
            },{
                label: 'Entregues',
                data: [1, 2, 2,1,4,2,1],
                fill: false,
                borderColor: '#34D399',
                tension: 0.1
            },{
                label: 'Cancelados',
                data: [0, 1,0,0,0,0,0],
                fill: false,
                borderColor: '#EF4444',
                tension: 0.1
            }]
            };

    }

    dataFormatada(data){
        try{
            const dia = data.getDate() < 10 ? `0${data.getDate()}`:data.getDate();
            const mes = data.getMonth() < 10 ? `0${data.getMonth()}`:data.getMonth();
            const ano = data.getFullYear();
            const hora = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
            const minutos = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
            const segundos = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
            return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
        }catch(error){
            return '%d/%m/%YYYY %H:%M:%S';
        }
    }
    adicionarPedidosNaLista(pedidos){
        // CODDING: Limpar lista
        const tabela = document.getElementById('lista-de-pedidos-table');
        const tbody = tabela.querySelector('tbody');
        tbody.innerHTML = '';
        
        // CODDING: Adicionar pedidos
        pedidos.forEach(pedido=>{
            let tdValor;
            if(['success', 'warning','info'].includes(pedido.status.type)){
                tdValor = `<td class="py-[16px] pr-[8px]">
                <div class="flex flex-row justify-center items-center space-x-[5px]">
                    <i class="fa-solid fa-money-bill-trend-up text-base text-green-500"></i>
                    <div class="flex flex-col items-start ">
                        <span class="whitespace-nowrap text-sm/none">R$ 37.90</span>
                        <span class="whitespace-nowrap text-gray-500">${pedido.payment.type}</span>
                    </div>
                </div>
                
            </td>`
            }
            
            if(pedido.status.type === 'danger'){
                tdValor = `<td class="py-[16px] pr-[8px]">
                        <div class="flex flex-row justify-center items-center space-x-[5px]">
                            
                            <div class="flex flex-col items-start ">
                                <span class="whitespace-nowrap text-sm/none text-[#FD4755]">R$ 37.90</span>
                                <span class="whitespace-nowrap text-gray-500">${pedido.payment.type}</span>
                            </div>
                        </div>
                        
                    </td>`;
            }




            const trElement = document.createElement('tr');
            trElement.className = "text-sm border-b-[1px] border-gray-400";
            const templateTdTable = `
                <td class="py-[16px] pr-[8px] space-x-[10px] flex flex-row justify-center items-center">
                   
                    <div class="w-[40px] h-[40px] rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.24)]">
                        <img src="/img/profile/default/default.png" class="w-auto h-auto max-w-full max-h-full" alt="">
                    </div>
                    <div class="flex flex-col">
                        <span class="whitespace-nowrap ">${pedido.user.nome} ${pedido.user.sobrenome}</span>
                        
                        <span class="whitespace-nowrap text-gray-500">${this.dataFormatada(pedido.createdAt)}</span>
                    </div>
                </td>
               
                ${tdValor}
                <td class="py-[16px] pr-[8px]">
                    <div class="border-l-[4px] border-[#2BD874] px-[8px] py-[4px] bg-[#C2F3D6] text-[#23AF59] flex flex-row justify-start items-center space-x-[5px] whitespace-nowrap">
                        <i class="fa-solid fa-tag"></i>
                        <span>entregue</span>
                    </div>
                    
                </td>
                <td class="py-[16px] pr-[8px]">
                    <button class="px-[8px] py-[4px] h-[40px] space-x-[5px] rounded-[5px] text-azul whitespace-nowrap shadow-[0_3px_8px_rgba(0,0,0,0.24)]">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        <span>Abrir pedido</span>
                    </button>
                </td>`;
            trElement.innerHTML = templateTdTable;
            tbody.appendChild(trElement);
        });

    }

    hojeSelected(){
        this.pedidosRealizados = 0;
        this.pedidosEntregues = 0;
        this.pedidosCancelados = 0;

        // CODDING: Filtrar pedidos pela data atual
        const pedidosFiltrados = this.pedidosFake.filter(pedido=>pedido.createdAt.getDate() === new Date(Date.now()).getDate());
        
        // CODDING: Alterar cards de pedidos realizados, entregues e cancelados
        this.pedidosRealizados = pedidosFiltrados.length;
        this.pedidosRealizadosParagraph.textContent = `${this.pedidosRealizados}`;

        this.pedidosEntregues = pedidosFiltrados.filter(pedido=>pedido.status.type === "success").length;
        this.pedidosEntreguesParagraph.textContent = `${this.pedidosEntregues}`;

        this.pedidosCancelados = pedidosFiltrados.filter(pedido=>pedido.status.type === "darger").length;
        this.pedidosCanceladosParagraph.textContent = `${this.pedidosCancelados}`;

        // CODDING: Adicionar pedidos na lista
        this.adicionarPedidosNaLista(pedidosFiltrados);

    }

    ultimos7diasSelected(){
        console.log(`${this.pedidosFake[1].createdAt.getTime()} > ${Date.now()}`,this.pedidosFake[1].createdAt.getTime()>Date.now())
        const dataSeteDiasAtras = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));

        // CODDING: Filtrar pedidos feitos 7 dias atrás
        const pedidosFiltrados = this.pedidosFake.filter(pedido=>pedido.createdAt.getTime()>dataSeteDiasAtras.getTime());

        // CODDING: Alterar cards de pedido realizados, entregues e cancelados
        this.pedidosRealizados = pedidosFiltrados.length;
        this.pedidosRealizadosParagraph.textContent = `${this.pedidosRealizados}`;

        this.pedidosEntregues = pedidosFiltrados.filter(pedido=>pedido.status.type === "success").length;
        this.pedidosEntreguesParagraph.textContent = `${this.pedidosEntregues}`;

        this.pedidosCancelados = pedidosFiltrados.filter(pedido=>pedido.status.type === "darger").length;
        this.pedidosCanceladosParagraph.textContent = `${this.pedidosCancelados}`;

        // CODDING: Adicionar pedidos na lista
        this.adicionarPedidosNaLista(pedidosFiltrados);
    }

    ultimos30diasSelected(){
        const dataTrintaDiasAtras = new Date(Date.now() -(30*24*60*60*1000));
        
        // CODDING: Filtrar pedidos feitos 7 dias atrás
        const pedidosFiltrados = this.pedidosFake.filter(pedido=>pedido.createdAt.getTime()>dataTrintaDiasAtras.getTime());

        // CODDING: Alterar cards de pedido realizados, entregues e cancelados
        this.pedidosRealizados = pedidosFiltrados.length;
        this.pedidosRealizadosParagraph.textContent = `${this.pedidosRealizados}`;

        this.pedidosEntregues = pedidosFiltrados.filter(pedido=>pedido.status.type === "success").length;
        this.pedidosEntreguesParagraph.textContent = `${this.pedidosEntregues}`;

        this.pedidosCancelados = pedidosFiltrados.filter(pedido=>pedido.status.type === "darger").length;
        this.pedidosCanceladosParagraph.textContent = `${this.pedidosCancelados}`;

        // CODDING: Adicionar pedidos na lista
        this.adicionarPedidosNaLista(pedidosFiltrados);
    }

    disableButton(element){
        if(element.className.includes('bg-azul')) element.classList.remove('bg-azul');
        if(element.className.includes('text-white')) element.classList.remove('text-white');

        element.classList.add('border-2','border-azul','text-azul');
    }
    activateButton(element){
        if(element.className.includes('border-2')) element.classList.remove('border-2');
        if(element.className.includes('border-azul')) element.classList.remove('border-azul');
        if(element.className.includes('text-azul')) element.classList.remove('text-azul');
        element.classList.add('bg-azul','text-white');
    }
    filtrar(){
        // CODDING: Hoje
        this.botaoHojeElement.addEventListener('click',()=>{

            // ativar botão
            this.activateButton(this.botaoHojeElement);

            // desabilitar outros botões
            [this.botaoUltimos7diasElement, this.botaoUltimos30diasElement, this.botaoPersonalizadoElement].forEach(element=>{
                this.disableButton(element);
            });

            this.hojeSelected();
        });

        // CODDING: Últimos 7 dias
        this.botaoUltimos7diasElement.addEventListener('click',()=>{
            console.log('clicou pra filtrar últimos 7 dias');

            // ativar botão
            this.activateButton(this.botaoUltimos7diasElement);

            // desabilitar outros botões
            [this.botaoHojeElement, this.botaoUltimos30diasElement, this.botaoPersonalizadoElement].forEach(element=>{
                this.disableButton(element);
            });

            this.ultimos7diasSelected();
        });

        // CODDING: Últimos 30 dias
        this.botaoUltimos30diasElement.addEventListener('click',()=>{
            console.log('clicou pra filtrar ultimos 30 dias');

            // ativar botão
            this.activateButton(this.botaoUltimos30diasElement);

            // desabilitar outros botões
            [this.botaoHojeElement, this.botaoUltimos7diasElement, this.botaoPersonalizadoElement].forEach(element=>{
                this.disableButton(element);
            });

            this.ultimos30diasSelected();
        });

        // CODDING: Data personalizada
        this.botaoPersonalizadoElement.addEventListener('click',()=>{
            console.log('clicou pra filtrar por uma data personalizada');

            // ativar botão
            this.activateButton(this.botaoPersonalizadoElement);

            // desabilitar outros botões
            [this.botaoHojeElement, this.botaoUltimos30diasElement, this.botaoUltimos7diasElement].forEach(element=>{
                this.disableButton(element);
            });
        });
    }
}

const pedido = new Pedidos();
pedido.filtrar();
