import { LINK , get_data ,tab_show, slide, mediaSize} from "./untils.js"

const counts = document.querySelectorAll('.product-header__tab-count')
const productTab = document.getElementsByClassName('product-header__tab')


/* Loading */
const loading = document.querySelectorAll('.loading')
const afterLoading = document.querySelectorAll('.after-loading')

loading.forEach(element => {
element.style.display = "block";
});

afterLoading.forEach(element => {
    element.style.display = "none";
});

/* end */


/* build Element product  */

function buildElement(carlists) {
    const templateProduct = document.querySelector('#product')
    const fragment = templateProduct.content.cloneNode(true)
    const productBox = fragment.querySelector('.product-box')
  
    const imgSRC = productBox.querySelector('.product-image img')
    imgSRC.src = carlists.src[0]
  
    const name = productBox.querySelector('.product-name')
    name.innerText = carlists.name
  
    const price = productBox.querySelector('.product-price')
    price.innerText = carlists.price

    const oldPrice = productBox.querySelector('.product-old-price')
    oldPrice.innerText = carlists.old_price
  
    const features = productBox.querySelectorAll('.features')
    for (let index = 0; index < features.length; index++) {
        features[index].innerText = carlists.description[index]
    }
    
    const link = productBox.querySelector('.product-link')
    link.href = `details.html?carID=${carlists.id}`
  
    return productBox
  }

  /* end */


  /* Slide product */
function make_slide(number) {
    const wraperFull = document.querySelector('.product-main');
    const box = document.querySelector('.product-main__review.open');
    const listBox = document.querySelectorAll('.product-main__review.open .product-box');
    const arrowLeft = document.querySelector('.product-nav__arrowLeft');
    const arrowRight = document.querySelector('.product-nav__arrowRight');
    
    slide(number,listBox,box,wraperFull,arrowLeft,arrowRight)
}

/* end */

/* show Tab product */

async function show(e){
    const loadingSlide = document.querySelector('.loading-slide')
    const afterLoadingSlide = document.querySelector('.after-loading-slide')
    const boxs = document.getElementsByClassName('product-main__review')
    const tabId = e.target.getAttribute('id');

    loadingSlide.style.display = "block";
    afterLoadingSlide.style.display = "none";

    for(var i=0; i<productTab.length; i++){
        productTab[i].classList.remove('active')
    }
    this.classList.add('active')

    for(var i=0; i<boxs.length; i++){
        boxs[i].classList.remove('open')
    }
    boxs[this.id-1].classList.add('open')

    boxs[this.id-1].innerHTML=''


    try {
        const elements = await get_data(`${LINK.API_URL}/listcar?category=${tabId}`);
        console.log(elements.length)
        elements.forEach(element => {
        const newElement = buildElement(element);
        boxs[this.id-1].appendChild(newElement)
        make_slide(mediaSize())
    })
        counts.forEach(element => {
        element.innerHTML = ''
        });
        counts[this.id-1].innerText = '(' + elements.length +')'
      }
      catch(err) {
        
      }
      finally {
        loading.forEach(element => {
            element.style.display = "none";
        })

        afterLoading.forEach(element => {
            element.style.display = "flex";
        })
      }
}

/* end */




async function main() {

    try {
        const elements = await get_data(`${LINK.API_URL}/listcar?category=1`);
        elements.forEach(element => {
            const newElement = buildElement(element);
            const audi = document.querySelector('.audi')
            audi.appendChild(newElement)
            make_slide(mediaSize())
        })
        counts[0].innerText = '(' + elements.length +')'
        
    
        const bigSale = await get_data(`${LINK.API_URL}/listcar?category=5`);
        bigSale.forEach(element => {
            const newElement = buildElement(element);
            const boxBigSale = document.querySelector('.sale-box__left')
            newElement.classList.add('box-lg')
            boxBigSale.appendChild(newElement)
        })
    
        const sale = await get_data(`${LINK.API_URL}/listcar?category=6`);
        sale.forEach(element => {
            const newElement = buildElement(element)
            const boxSale = document.querySelector('.sale-box__right')
            newElement.classList.add('box-sm')
            boxSale.appendChild(newElement)
        })
      }
      catch(err) {
        
      }
      finally {
        loading.forEach(element => {
            element.style.display = "none";
        })

        afterLoading.forEach(element => {
            element.style.display = "flex";
        })
      }

   

}

window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200) {
        make_slide(4);
    } else if (window.innerWidth >= 576) {
        make_slide(2);
    } else {
        make_slide(1);
    }
});
    
for(var i=0; i<productTab.length; i++){
    productTab[i].addEventListener('click',show)
}

main()











