const navMobileBtn = document.querySelector('.nav-menu__icon')
const navCloseBtn = document.querySelector('.nav-menu__close')

navMobileBtn.addEventListener('click',function(){
    const listMobile = document.querySelector('.list-mobile')
    listMobile.classList.add('active')
})

navCloseBtn.addEventListener('click',function(){
    const listMobile = document.querySelector('.list-mobile')
    listMobile.classList.remove('active')
})