import { get_data, LINK } from "./untils.js"

const contentWraper = document.querySelector('.content-wraper')
const loading = document.querySelector('.loading')
const afterLoading = document.querySelector('.after-loading')
loading.style.display="block"


async function main(){
  try {
      const elements = await get_data(`${LINK.API_URL}/listcar?page=1&limit=5`);
      elements.forEach(element => {
      const newElement = buildProductElement(element);
      contentWraper.appendChild(newElement)
  })
  const allElement = await get_data(`${LINK.API_URL}/listcar`);
  const countAll = document.querySelector('.count')
  countAll.innerText=allElement.length

    }
    catch(err) {
      
    }
    finally {
      loading.style.display = "none";
      afterLoading.style.display = "block";
    }

}

/* end */

main()

/* Show more question */

const iconPlus = document.getElementsByClassName('icon-plus')
const iconMinus = document.getElementsByClassName('icon-minus')

const question = document.getElementsByClassName('question-list__content')
const questionTitle = document.querySelectorAll('.questtion-list__title')

for(var i=0; i<iconPlus.length; i++){
    iconPlus[i].addEventListener('click',function(){
    iconPlus[this.id-1].style.display='none'
    iconMinus[this.id-1].style.display='block'

    question[this.id-1].classList.add('active')
    questionTitle[this.id-1].classList.add('active')
    })
}

for(var i=0; i<iconMinus.length; i++){
    iconMinus[i].addEventListener('click',function(){
    iconPlus[this.id-1].style.display='block'
    iconMinus[this.id-1].style.display='none'

    question[this.id-1].classList.remove('active')
    questionTitle[this.id-1].classList.remove('active')
    })
}

/* end */


/* build product Element */

function buildProductElement(product){
  const productTemplate = document.querySelector('#product-detail')
  const fragment = productTemplate.content.cloneNode(true)
  const productElement = fragment.querySelector('.car-item-box')

    const productImg = productElement.querySelector('.car-box__image img')
    productImg.src = product.src[0]

    const productName = productElement.querySelector('.car-info__title a')
    productName.innerText = product.name

    const productDescribe = productElement.querySelector('.car-info__title p')
    productDescribe.innerText = product.describe

    const productOldPrice = productElement.querySelector('.old-price')
    productOldPrice.innerText = product.old_price

    const productNewPrice = productElement.querySelector('.new-price')
    productNewPrice.innerText = product.price

    const features = productElement.querySelectorAll('.feature')
    for (let index = 0; index < features.length; index++) {
      features[index].innerText = product.description[index]
  }

    const overlayProductLink = productElement.querySelector('.overlay-list__item-link')
    overlayProductLink.href = `details.html?carID=${product.id}`

    const titleProductLink = productElement.querySelector('.car-info__title-link')
    titleProductLink.href = `details.html?carID=${product.id}`

    const btnProductLink = productElement.querySelector('.car-info__btn-link')
    btnProductLink.href = `details.html?carID=${product.id}`

    const addFavouriteBtn = productElement.querySelector('.favourite-add')
    const added = productElement.querySelector('.favourite-added')
    added.style.display="none"

  addFavouriteBtn.addEventListener('click',function(){
     added.style.display="block"
    favouriteEmpty.style.display="none"

    addFavouriteBtn.style.display="none"
    addToFavourite(product)
  })

    return productElement
}

/* end */


/* Show data */
async function getDataWithPage(page , contentWraper, loading , afterLoading){
  try {
      const elements = await get_data(`${LINK.API_URL}/listcar?page=${page}&limit=5`);
      elements.forEach(element => {
      const newElement = buildProductElement(element);
      contentWraper.appendChild(newElement)
  })
    }
    catch(err) {
      
    }
    finally {
      loading.style.display = "none";
      afterLoading.style.display = "block";
    }
}

/* end */


/* panigation */

const panigations = document.querySelectorAll('.pagination-link')

async function showPageWithPanigation(e){
  const paniID=e.target.getAttribute('id');

  loading.style.display="block"
  contentWraper.innerHTML=''

  for (let i=0; i<panigations.length; i++){
    panigations[i].classList.remove('is-active')
  }
  this.classList.add('is-active')

  getDataWithPage(paniID , contentWraper, loading , afterLoading)
}

async function showSliderPanigation(n){
  loading.style.display="block"
  contentWraper.innerHTML=''

  if(n > panigations.length){
    panigationIndex = 1
  }

  if(n < 1){
    panigationIndex = panigations.length
  }

  for (let i=0; i<panigations.length; i++){
    panigations[i].classList.remove('is-active')
  }
  panigations[panigationIndex-1].classList.add('is-active')

  getDataWithPage(panigationIndex , contentWraper, loading , afterLoading)
}


for (let i=0; i<panigations.length; i++){
  panigations[i].addEventListener('click',showPageWithPanigation)
}


let panigationIndex = 1

function changeSlidePanigation(n) {
  showSliderPanigation(panigationIndex += n);
}

const prev = document.querySelector('.link-wide-first')
const next = document.querySelector('.link-wide-last')

prev.addEventListener('click',function(){
  changeSlidePanigation(-1)
})
next.addEventListener('click',function(){
  changeSlidePanigation(1)
})

/* end */


/* Add product fo Favourite */

const favouriteList = []
const favouriteWraper = document.querySelector('.favourite-wraper')

const favourite = document.querySelector('.favourite-header')
favourite.addEventListener('click',function(){
  favouriteWraper.classList.add('active')
})

const closeFavourite = document.querySelector('.close-favourite i')
closeFavourite.addEventListener('click',function(){
  favouriteWraper.classList.remove('active')
})

const buildFavouriteProductElement = (product) =>{
  const favouriteTemplate = document.querySelector('#favourite')
  const favouriteFragment = favouriteTemplate.content.cloneNode(true)
  const favouriteItem = favouriteFragment.querySelector('.favourite-item')
  const favoriteProductImg = favouriteItem.querySelector('.favourite-product img')
  favoriteProductImg.src = product.src[0]
  const favoutiteProductName = favouriteItem.querySelector('.favoutite-product__name')
  favoutiteProductName.innerText = product.name

  const favoutiteProductPrice = favouriteItem.querySelector('.favoutite-product__price')
  favoutiteProductPrice.innerText = product.price

  const removeFavourite = favouriteItem.querySelector('.favourite-remove-item')
  removeFavourite.addEventListener('click',function(){
    removeToFavourite(product)
    buildFavouriteProduct()
  })

  return favouriteItem
}

const countFavourite = document.querySelector('.favourite-total span')
countFavourite.innerText = 0

const buildFavouriteProduct = () => {
  const favouriteWraper = document.querySelector('.favourite-list')
  favouriteWraper.innerHTML = ''
  favouriteList.forEach(element => {
    const favouriteElement = buildFavouriteProductElement(element)
    favouriteWraper.appendChild(favouriteElement)
  });
}

const addToFavourite = (favourite) =>{
  favouriteWraper.classList.add('active')

   buildFavouriteProduct()
   const newFavourite = {
    ...favourite,
  }

  favouriteList.push(newFavourite)
  countFavourite.innerText = favouriteList.length
  buildFavouriteProduct()
}

const favouriteEmpty = document.querySelector('.favourite-empty')

const removeToFavourite = (product) => {
  const favouriteIndex = favouriteList.findIndex(function (favourite) {
    return favourite.id === product.id;
})

favouriteList.splice(favouriteIndex, 1);

if(favouriteList.length >= 1 ){
favouriteEmpty.style.display="none"
countFavourite.innerText = favouriteList.length
}

if(favouriteList.length ===0 ){
  favouriteEmpty.style.display="block"
  countFavourite.innerText = 0
  }

buildFavouriteProduct()
}

/* end */

/* Change Background header */

const navbar = document.querySelector('.navbar');
window.onscroll = () => {
    if (window.scrollY > 1) {
        navbar.classList.add('nav-active');
    } else {
        navbar.classList.remove('nav-active');
    }
};

/* end */





