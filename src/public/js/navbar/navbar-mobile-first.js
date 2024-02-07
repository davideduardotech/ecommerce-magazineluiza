// Dropdown do menu mobile
const menuMobileBarsContainer = document.getElementById('menu-mobile-bars-container');
menuMobileBarsContainer.addEventListener('click',()=>{
    const menuMobileBarsDropdown = document.getElementById('menu-mobile-dropdown'); 
    menuMobileBarsDropdown.classList.toggle('hidden'); // Mostrar e remover dropdown
    const menuMobileBarsIcon = document.getElementById('menu-mobile-bars-icon'); 

    if(!(menuMobileBarsDropdown.classList.contains('hidden'))){ // Dropdown ativado
        
        // Remova a classe 'fa-bars' e adicione a classe 'fa-xmark'
        menuMobileBarsIcon.classList.remove('fa-bars');
        menuMobileBarsIcon.classList.add('fa-xmark');
    }else{ // Dropdown desativado
        
        // Remova a classe 'fa-bars' e adicione a classe 'fa-xmark'
        menuMobileBarsIcon.classList.remove('fa-xmark');
        menuMobileBarsIcon.classList.add('fa-bars');
    }
    
})