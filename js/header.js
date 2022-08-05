// nav - MY 상품 토글
function myProduct(){
    const myProductBtn = document.querySelector('header .my-product span');
    const myProductList = document.querySelector('header .my-product__list');
    console.log('hi');
    myProductBtn.classList.toggle('active');
    myProductList.classList.toggle('active');
}

// 스크롤시 헤더 고정
function scrollFunc(){
    const container = document.querySelector('#container');

    if(scrollY >= 103){
        header.classList.add("fixed");
        container.style.marginTop = '160px';
    }else{
        header.classList.remove("fixed");
        container.style.marginTop = '';
    }
}
document.addEventListener('scroll', scrollFunc);