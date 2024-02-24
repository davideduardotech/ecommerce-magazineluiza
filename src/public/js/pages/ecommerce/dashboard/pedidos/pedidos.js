
class Menu{
    constructor(){
        this.menuContainer = document.getElementById('menu-lateral-container');
        this.toggle = document.getElementById('menu-lateral-toggle');
        this.isExpanded = false;

        this.relaxedSize = "min-w-[120px]";
        this.expandedSize = "min-w-[300px]";

        this.itensMenu = [{icon:'',name:'pagina inicial',href:''}];
        this.menuSelected = undefined;

        //this.changeWidth({width: this.relaxedSize, element: this.menuContainer});

        //document.querySelectorAll('.menu-item').forEach(item=>{
        //    item.querySelector('span').classList.add('hidden');
        //});
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

const menu = new Menu();
menu.toggleWidth(); // abrir e fechar menu lateral