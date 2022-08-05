/* item filter - s */
//아이템필터
const filterItem = document.querySelectorAll('#filter .filter__item');

const addFilter = document.querySelector('#checked');
const addFilterItem = addFilter.querySelector('.filter__item');

for(let i = 0; i < filterItem.length; i++) {
    const filterBtn = filterItem[i].querySelectorAll('button');

    for(let j = 0; j < filterBtn.length; j++){
        const addItemName = filterBtn[j].innerText;

        filterBtn[j].addEventListener("click", ()=>{
            if(filterBtn[j].classList.contains('checked') === false){
                filterBtn[j].classList.add('checked');
                const divItem = document.createElement("div");
                divItem.innerHTML = `${addItemName}<button onclick="deleteItem(event)"><i class="fas fa-times"></i></button>`;
                addFilterItem.appendChild(divItem);
            }
            const addFilterBtnItem = addFilterItem.querySelectorAll('div');
            if(addFilterBtnItem.length >= 1){
                addFilter.classList.add('on');
            }
        });
    }
}

function deleteItem(event){
    const addFilterItemCur = event.currentTarget.parentNode; //divItem
    const addFilterBtnItem = addFilterItem.querySelectorAll('div');

    const checkedBtn = document.querySelectorAll('#filter .checked');
    for(let i = 0; i < checkedBtn.length; i++){
        if(checkedBtn[i].innerText === addFilterItemCur.innerText){
            checkedBtn[i].classList.remove('checked');
        }
    }
    addFilterItemCur.remove();
    if(addFilterBtnItem.length <= 1){
        addFilter.classList.remove('on');
    }
}

function deleteAll(){
    addFilterItem.innerHTML = "";

    const checkedBtn = document.querySelectorAll('#filter .checked');
    for(let i = 0; i < checkedBtn.length; i++){
        if(checkedBtn[i].classList.contains('checked')){
            checkedBtn[i].classList.remove('checked');
        }
    }
    addFilter.classList.remove('on');
}
/* item filter - e */

/* event banner slide */
function eventSlide(){
    let curPos = 0,
        position = 0;
    const slide = document.querySelector('.event-slide'),
        list = slide.querySelector('ul'),
        item = slide.querySelectorAll('li'),
        itemWidth = 100 / item.length,
        prevBtn = slide.querySelector('.prev-btn'),
        nextBtn = slide.querySelector('.next-btn');

    function prev(){
        if(curPos < 1){
            curPos = item.length - 1;
        }else {
            curPos -= 1;
        }
        position = curPos * itemWidth;
        list.style.transform = `translateX(-${position}%)`;
    }
    function next(){
        if(curPos < item.length - 1){
            curPos += 1;
        } else {
            curPos = 0;
        }
        position = curPos * itemWidth;
        list.style.transform = `translateX(-${position}%)`;
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    // function play(){
        
    // }
    // play();
}
eventSlide();

/* cart button */
const goodsItem = document.querySelectorAll('.list-item');
for(let i = 0; i < goodsItem.length; i++){
    const cartBtn = goodsItem[i].querySelector('.goods-cart');
    cartBtn.addEventListener("click", ()=>{
        if(cartBtn.classList.contains('on') === false){
            alert("장바구니에 상품이 추가되었습니다.");
            cartBtn.classList.add('on');
            cartBtn.style.color = "#e4130c";
        }else{
            if(confirm("이미 같은 상품이 장바구니에 추가되어 있습니다. 장바구니로 이동하시겠습니까?")){
                location.href="../cart.html";
            };
        }
    })
}

//판매순 필터
const pickBtn = document.querySelectorAll('.pick-btn button');
for(let i = 0; i < pickBtn.length; i++){
    pickBtn[i].addEventListener('click', ()=>{
        let j = 0;
        while(j < pickBtn.length){
            pickBtn[j++].classList.remove('active');
        }
        pickBtn[i].classList.add('active');
        bestItem();
    })
}
function bestItem(){
    //판매인기순 필터시 BEST 아이콘 적용
    for(let i = 0; i < 3; i++){
        const bestIconPosition = goodsItem[i].querySelector('.item-wrap a');

        if(pickBtn[0].classList.contains("active") === true){
            const bestIcon = document.createElement("div");
            bestIcon.className = "best-icon";
            bestIcon.innerHTML = `<span>BEST</span><strong>${i + 1}</strong>`;
            bestIconPosition.prepend(bestIcon);
            goodsItem[i].classList.add('best-item');
            
        } else {
            const bestIcon = goodsItem[i].querySelector('.best-icon');
            if(bestIcon){
                bestIcon.remove();
            }
            goodsItem[i].classList.remove('best-item');
        }
    }
}
bestItem();

// N개씩 보이기
function viewItem(){
    const viewItemSelect = document.getElementById('view-item-num');
    const index = viewItemSelect.selectedIndex;

    if(index === 0){
        for(let i = 12; i > 11 && i < goodsItem.length; i++){
            goodsItem[i].style.display="none";
        }
    } else if(index === 1) {
        for(let i = 0; i < goodsItem.length; i++){
            goodsItem[i].style.display="block";
        }
    }

}