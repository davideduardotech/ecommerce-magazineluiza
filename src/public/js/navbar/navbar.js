console.log('javascript importado pra o HTML');

// Profile
const profileContainer = document.getElementById('profile-container');
if(profileContainer){
    const profileItem = profileContainer.querySelector('#profile-item');
    const profileItemImage = profileItem.querySelector('img');
    const profileItemParagraphs = profileItem.querySelectorAll('p');
    const profileDropdown = profileContainer.querySelector('#profile-dropdown');
    profileContainer.addEventListener('mouseover',()=>{
        profileDropdown.classList.remove('hidden');
        profileItem.classList.add('bg-white');
        const profileItemName = document.getElementById('profile-item-name');
        profileItemName.classList.add('text-azul');
        profileItemImage.src = "https://img.icons8.com/ios-filled/50/0086FF/user-male-circle.png";
        profileItemParagraphs.forEach((paragraph,index)=>{
            if(index==0){
                paragraph.classList.add('text-azul');
            }else{
                paragraph.classList.add('text-black');
            }
        });
    })
    profileContainer.addEventListener('mouseout',()=>{
        profileDropdown.classList.add('hidden');
        profileItem.classList.remove('bg-white');
        const profileItemName = document.getElementById('profile-item-name');
        profileItemName.classList.remove('text-azul');
        profileItemImage.src = "https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png";
        profileItemParagraphs.forEach((paragraph,index)=>{
            if(index==0){
                paragraph.classList.remove('text-azul');
            }else{
                paragraph.classList.remove('text-black');
            }
        });    
    })

    const profileDropdownItens = profileDropdown.querySelectorAll('#profile-dropdown-item');
    console.log(`profileDropdownItens:`,profileDropdownItens);
    profileDropdownItens.forEach(dropdownItem=>{
        dropdownItem.addEventListener('mouseover',()=>{
            const dropdownItemIcon = dropdownItem.querySelector('i');
            const dropdownItemText = dropdownItem.querySelector('p');
            console.log('dropdownItemIcon:mouseover',dropdownItemIcon);
            console.log('dropdownItemText:mouseover',dropdownItemText);

            dropdownItemIcon.classList.replace('text-black','text-azul');
            dropdownItemText.classList.replace('text-black','text-azul');
            dropdownItemText.classList.add('underline');
        });

        dropdownItem.addEventListener('mouseout',()=>{
            const dropdownItemIcon = dropdownItem.querySelector('i');
            const dropdownItemText = dropdownItem.querySelector('p');
            console.log('dropdownItemIcon:mouseout',dropdownItemIcon);
            console.log('dropdownItemText:mouseout',dropdownItemText);
            dropdownItemIcon.classList.replace('text-azul','text-black');
            dropdownItemText.classList.replace('text-azul','text-black');
            dropdownItemText.classList.remove('underline');
        });
    })
}





// Menu
const menuContainers = document.querySelectorAll('.menu-container');
menuContainers.forEach(menuContainer=>{
    const menuItem = menuContainer.querySelector('#menu-item');
    const menuItemIcon = menuContainer.querySelector('#menu-item-icon');
    const menuItemText = menuContainer.querySelector('#menu-item-text');
    const menuLinks = menuContainer.querySelector('#menu-links')

    menuContainer.addEventListener('mouseover',()=>{
        menuLinks.classList.remove('hidden');
        menuItem.classList.add('bg-white');
        if(menuItemIcon){
            menuItemIcon.classList.add('text-azul');
        }
        if(menuItemText){
            menuItemText.classList.add('text-azul');
        }
    });
    menuContainer.addEventListener('mouseout',()=>{
        menuLinks.classList.add('hidden');
        menuItem.classList.remove('bg-white');
        if(menuItemIcon){
            menuItemIcon.classList.remove('text-azul');
        }
        if(menuItemText){
            menuItemText.classList.remove('text-azul');
        }
    });
})


// Menu Mobile
const menuMobileContainer = document.getElementById('menu-mobile-container');
const menuMobileItem = document.getElementById('menu-mobile-item');
const menuMobileIcon = document.getElementById('menu-mobile-icon');
const menuMobileDropdown = document.getElementById('menu-mobile-dropdown');
menuMobileContainer.addEventListener('mouseover',()=>{
    menuMobileDropdown.classList.remove('hidden');
    menuMobileItem.classList.add('bg-white');
    menuMobileIcon.classList.add('text-azul');
})

menuMobileContainer.addEventListener('mouseout',()=>{
    menuMobileDropdown.classList.add('hidden');
    menuMobileItem.classList.remove('bg-white');
    menuMobileIcon.classList.remove('text-azul');
})

const menuMobileDropdownItens = document.querySelectorAll('#menu-mobile-dropdown-item');
menuMobileDropdownItens.forEach(item=>{
    const menuMobileDropdownItemIcon = item.querySelector('i');
    const menuMobileDropdownItemText = item.querySelector('p');
    item.addEventListener('mouseover',()=>{
        menuMobileDropdownItemIcon.classList.replace('text-black','text-azul');
        menuMobileDropdownItemText.classList.replace('text-black','text-azul');
        menuMobileDropdownItemText.classList.add('underline');
    })

    item.addEventListener('mouseout',()=>{
        menuMobileDropdownItemIcon.classList.replace('text-azul','text-black');
        menuMobileDropdownItemText.classList.replace('text-azul','text-black');
        menuMobileDropdownItemText.classList.remove('underline');
    })
})


