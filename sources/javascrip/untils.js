export const LINK = {
    API_URL: 'https://6330e7ebcff0e7bf70e3363a.mockapi.io'
}

export async function get_data(url){
    const dataJson = await fetch(url)
    const data = await dataJson.json()
    return data
}

export function get_searchParam(paramString){
    const searchStrings = new URLSearchParams(window.location.search);
    return searchStrings.get(paramString);
}

export async function post_data(url,body){
    const dataJson = await fetch(url, {
        method: 'POST',
        body: JSON.stringtify(body)
    })

    const data = await dataJson.json()
}

export async function patch_data(url,body){
    const dataJson = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringtify(body)
    })

    const data = await dataJson.json()
}

export async function delete_data(url,body){
    const dataJson = await fetch(url, {
        method: 'DELETE'
    })

    const data = await dataJson.json()
}

export async function tab_show(tab,content){
    for(var i=0; i<tab.length; i++){
        tab[i].classList.remove('active')
    }
    tab[i].classList.add('active')

    for(var i=0; i<content.length; i++){
        content[i].classList.remove('open')
    }
    content[this.id-1].classList.add('open')
}

export function slide(number,listBox,box,wraperFull,arrowLeft,arrowRight){
// set width and margin for item slide
const widthElement = wraperFull.offsetWidth / number;
let widthAllBox = widthElement * listBox.length;

box.style.width = `${widthAllBox}px`;


listBox.forEach((element) => {
    element.style.width = `${widthElement - 20}px`;
    element.style.margin = `0 10px`
});

// handle slide
let count = 0;
let spacing = widthAllBox - number * widthElement;
arrowRight.addEventListener('click', function () {
    count += widthElement;

    if (count > spacing) {
        count = 0;
    }
    box.style.transform = `translateX(${-count}px)`;
});

arrowLeft.addEventListener('click', function () {
    count -= widthElement;

    if (count < 0) {
        count = spacing;
    }
    box.style.transform = `translateX(${-count}px)`;
})
}

export function mediaSize(){
    const media = [
        window.matchMedia('(min-width: 1200px)'),
        window.matchMedia('(min-width: 576px)'),
    ];

    if (media[0].matches) {
       return 4
    } else if (media[1].matches) {
        return 2
    } else {
       return 1
}}

