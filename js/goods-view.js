/* 이미지 탭 */
function imgView(){
    const tabBtn = document.querySelectorAll('.img-another button');
    const mainImg = document.querySelector('.img-main');

    for(let i = 0; i < tabBtn.length; i++){
        tabBtn[i].addEventListener("click", ()=>{
            let j = 0;
            while(j < tabBtn.length){
                tabBtn[j++].classList.remove('active');
            }
            tabBtn[i].classList.add('active');

            const tabImg = tabBtn[i].innerHTML;
            mainImg.innerHTML = tabImg;
        })
    }

    const firstImg = tabBtn[0].innerHTML;
    mainImg.innerHTML = firstImg; //첫이미지 세팅
};
imgView();


// 추천상품 더보기
const recomList = document.querySelector('.recommend-list');
function moreItem(event){
    recomList.classList.toggle('show6');
    const btn = event.currentTarget;
    if(btn.style.transform !== "rotate(180deg)"){
        btn.style.transform = "rotate(180deg)";
    }else {
        btn.style.transform = "rotate(360deg)";
    }
}

// info-tab 버튼 클릭이벤트
const infoTab = document.querySelectorAll('.info-tab a');
for(let i = 0; i < infoTab.length; i++){
    infoTab[i].addEventListener('click', ()=>{
        let j = 0;
        while(j < infoTab.length){
            infoTab[j++].classList.remove('active');
        }
        infoTab[i].classList.add('active');
    })
}

// 장바구니 담기 -> 장바구니 이동
function checkCart(){
    if(confirm('상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?')){
        location.href="../../cart.html";
    }
}

// 상단고정 탭 > 해당 탭 이동
function itemTotalScroll(){
    const itemSection = document.getElementById('item-section'),
          itemInfo = document.querySelector('.goods-view .item-info'),
          mainTab = document.querySelector('.goods-view .main-tab');

    const header = document.querySelector('header'),
          location = document.querySelector('.location'),
          goodsINFO = document.querySelector('.section-info'),
          view = document.querySelector('#item-section'),
          review = document.querySelector('#item-review'),
          qna = document.querySelector('#item-qna');

    TAP_1 = header.clientHeight + location.clientHeight + goodsINFO.clientHeight;
    TAP_2 = TAP_1 + view.clientHeight;
    TAP_3 = TAP_2 + review.clientHeight;
    TAP_4 = TAP_3 + qna.clientHeight;

    if(window.innerWidth >= 769){
        if(scrollY >= 1578){
            itemInfo.classList.add('active');
            mainTab.classList.add('active');
            
            const mainTabItem = mainTab.querySelectorAll('.tab-wrap a');
            for(let i = 0; i < mainTabItem.length; i++){
                let j = 0;
                while(j < mainTabItem.length){
                    mainTabItem[j++].classList.remove('active');
                }

                if(scrollY >= TAP_2 && scrollY < TAP_3){
                    mainTabItem[1].classList.add('active');
                }else if(scrollY >= TAP_3 && scrollY < TAP_4){
                    mainTabItem[2].classList.add('active');
                }else if(scrollY >= TAP_4){
                    mainTabItem[3].classList.add('active');
                }else {
                    mainTabItem[0].classList.add('active');
                }
            }
            
            // console.log(window.scrollY);
            
            itemSection.style.marginTop = '180px';
        } else {
            itemInfo.classList.remove("active");
            mainTab.classList.remove("active");
            itemSection.style.marginTop = '0';
        }
    } else {
      if(itemInfo.classList.contains('active') == true){
        itemInfo.classList.remove('active');
      }  
    }
}

document.addEventListener('scroll', itemTotalScroll);
document.addEventListener('resize', itemTotalScroll);




/* 총 합계금액 - s */

const totalItemList = document.querySelector('.total-item');

let calc = {
    totalPrice : 0,
    /* 개별 수량 변경 */
    changePNum: function () {
        const item = document.querySelector('input[name=item_num]');
        const item_num = parseInt(item.getAttribute('value'));
        const newval = event.target.classList.contains('up') ? item_num+1 : event.target.classList.contains('down') ? item_num-1 : event.target.value;
        
        if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }

        item.setAttribute('value', newval);
        item.value = newval;

        const price = document.querySelector('.info-table .p_price').getAttribute('value');
        item.parentElement.nextElementSibling.lastElementChild.innerHTML = `<b>${(newval * price).formatNumber()}</b>원`;

        //전송 처리 결과가 성공이면    
        this.reCalc();
        this.updateUI();
    },
    /* 추가상품 목록 아이템 추가 */
    addItem : function(){
        const addItemSelect = document.getElementById('add-select');
        const selectText = addItemSelect.options[addItemSelect.selectedIndex].text;
        const addItem = document.createElement("div");

        addItem.className = "selected-item item-additem";
        addItem.innerHTML = `
            <span class="name">${selectText}</span>
            <span class="price">
                <input type="hidden" class="item_p" value="2600">
                <b>2,600</b>원
            </span>
            <button type="button" class="remove-btn" onclick="javascript:calc.deleteItem(event)"><i class="fas fa-times"></i></button>
        `;
        totalItemList.appendChild(addItem);
        
        this.reCalc();
        this.updateUI();
    },
    /* 추가상품 아이템 삭제 */
    deleteItem : function(event){
        const item = event.currentTarget.parentElement;
        item.remove();
        
        this.reCalc();
        this.updateUI();
    },
    reCalc: function(){
        this.totalPrice = 0;
        document.querySelectorAll(".item_num").forEach(function (item) {
            const count = parseInt(item.getAttribute('value'));
            const price = parseInt(document.querySelector('.info-table .p_price').getAttribute('value'));
            if(document.querySelector('.item-additem')){
                const addItem = document.querySelectorAll('.item-additem');
                for(let i = 0; i < addItem.length; i++){
                    const addPrice = parseInt(addItem[i].querySelector('.item_p').getAttribute('value'));
                    this.totalPrice += addPrice;
                }
                this.totalPrice += count * price;
            }else {
                this.totalPrice += count * price;
            }
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //화면 업데이트
    updateUI: function () {
        document.querySelector('#total-price').innerHTML = `총 합계금액
        <span><b>${this.totalPrice.formatNumber()}</b>원</span>`;
    }
}
// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};

/* 총 합계금액 - e */