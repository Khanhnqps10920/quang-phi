import { LINK, get_searchParam , get_data} from "./untils.js";

/* Loading data */
const loading = document.querySelector('.loading')
loading.style.display="block"

const afterLoading = document.querySelector('.after-loading')
afterLoading.style.display="none"

/* end */

const nameBreadCrumb = document.querySelector('.name-car')
const carID = get_searchParam('carID')

async function main(){
  try {
  const clasifyBox = document.querySelector('.right-clasify')
  const productboxLeft = document.querySelector('.left-content')
  const rightBoxDescribe = document.querySelector('.right-describe')

    const elements = await get_data(`${LINK.API_URL}/listcar/${carID}`)
    nameBreadCrumb.innerText = elements.name
    const newElementText = buildInfo(elements)
    const newElementImg = buildImage(elements)
    const newElementDescribe = buildDescribe(elements)

    productboxLeft.appendChild(newElementImg)
    clasifyBox.appendChild(newElementText)
    rightBoxDescribe.appendChild(newElementDescribe)
  }
  catch(err) {
    
  }
  finally {
    loading.style.display = "none";
      afterLoading.style.display = "block";
  }
}

main()

/* Show more Text description */

const showMoreBtn = document.querySelectorAll('.show-more')
const showLessBtn = document.querySelectorAll('.show-less')
const textMore = document.querySelectorAll('.text-more')

showLessBtn.forEach(element => {
  element.style.display = "none"
});

  for (let i = 0; i < showMoreBtn.length; i++) {
    showMoreBtn[i].addEventListener('click',function(){
      textMore[this.id - 1].classList.add('active')
      showMoreBtn[this.id - 1].style.display="none"
      showLessBtn[this.id - 1].style.display = "block"
    
  })
}

for (let i = 0; i < showLessBtn.length; i++) {
  showLessBtn[i].addEventListener('click',function(){
    textMore[this.id - 1].classList.remove('active')
    showMoreBtn[this.id - 1].style.display="block"
    showLessBtn[this.id - 1].style.display = "none"
  
})
}

/* end */

/* Build element info  */

const infoTemplate = document.querySelector('#info-template')
  const infoFragment = infoTemplate.content.cloneNode(true)
  const elementInfo = infoFragment.querySelector('.product-info') 
  const addFavouriteBtn = elementInfo.querySelector('.favourite-add')
  const added = elementInfo.querySelector('.favourite-added')
  added.style.display="none"

function buildInfo(product){
  const productName = elementInfo.querySelector('.product-name h3')
  productName.innerText = product.name
  
  const features = elementInfo.querySelectorAll('.features p')
   for (let i = 0; i < features.length; i++) {
    features[i].innerText = product.description[i]
  }

  const productPrice = elementInfo.querySelector('.product-price')
  productPrice.innerText = product.price

  const productOldPrice = elementInfo.querySelector('.product-old-price')
  productOldPrice.innerText = product.old_price


  addFavouriteBtn.addEventListener('click',function(){
    addToFavourite(product)
  added.style.display="block"
  addFavouriteBtn.style.display="none"
  favouriteEmpty.style.display="none"
  })

  return elementInfo
} 

/* end */

/* Build Êlement IMG */

const imgTemplate = document.querySelector('#img-template')
const imgFragment = imgTemplate.content.cloneNode(true)
const imageElement = imgFragment.querySelector('.product-imgs')

function buildImage(data){
const headerIMG = imageElement.querySelectorAll('.main-img img')
const tabIMG = imageElement.querySelectorAll('.product-tab img')

  for (let i = 0; i < headerIMG.length; i++) {
    headerIMG[i].src = data.src[i + 1]
  }

  for (let i = 0; i < tabIMG.length; i++) {
    tabIMG[i].src = data.src[i + 1]
  }

  return imageElement
}

/* end */

/* Show tab IMG */
const productTab = imageElement.querySelectorAll('.product-tab')

async function show(e){
  const imgs = imageElement.getElementsByClassName('main-img')

  for(let i=0; i<productTab.length; i++){
      productTab[i].classList.remove('active')
  }
  this.classList.add('active')

  for(let i=0; i<imgs.length; i++){
      imgs[i].classList.remove('active')
  }
  imgs[this.id-1].classList.add('active')
} 

for(let i=0; i<productTab.length; i++){
productTab[i].addEventListener('click',show)
}

/* end */

/* build describe element */

function buildDescribe(describe){
  const leftDescribe = document.querySelector('#right-describe')
  const describeFragment = leftDescribe.content.cloneNode(true)
  const describeElement = describeFragment.querySelector('.describe-list')

  const describeList = describeElement.querySelectorAll('.describe-list__item span')
  for (let i = 0; i < describeList.length; i++) {
    describeList[i].innerText = describe.feature[i]
  }

  return describeElement
}

/* end */

/* add product to favourite */

const favouriteList = []
const favouriteWraper = document.querySelector('.favourite-wraper')
const countFavourite = document.querySelector('.favourite-total span')
countFavourite.innerText = 0
const favouriteEmpty = document.querySelector('.favourite-empty')

const favourite = document.querySelector('.favourite-header')
favourite.addEventListener('click',function(){
  favouriteWraper.classList.add('active')
})

const closeFavourite = document.querySelector('.close-favourite')
closeFavourite.addEventListener('click',function(){
  favouriteWraper.classList.remove('active')
})

const buildFavouriteProductElement = (product) =>{
  const favouriteTemplate = document.querySelector('#favourite-cart')
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
    added.style.display="none"
    addFavouriteBtn.style.display="flex"
  })

  return favouriteItem
}

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

const removeToFavourite = (product) => {
  const favouriteIndex = favouriteList.findIndex(function (favourite) {
    return favourite.id === product.id;
})

favouriteList.splice(favouriteIndex, 1);

if(favouriteList.length >= 1 ){
favouriteEmpty.style.display="none"
countFavourite.innerText = favouriteList.length
}

if(favouriteList.length === 0 ){
  favouriteEmpty.style.display="block"
  countFavourite.innerText = 0
  }

buildFavouriteProduct()
}

/* end */


