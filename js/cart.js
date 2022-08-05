let basket = {
    totalCount: 0, 
    totalPrice: 0,
    //체크한 상품 지우기
    delCheckedItem: function(){
        document.querySelectorAll("input[name=buy]:checked").forEach(function (item) {
            item.parentElement.parentElement.parentElement.remove();
        });
        
        this.itemCheck();
        this.reCalc();
        this.updateUI();
        this.reTotal();
        this.updateTotal();
    },
    //장바구니 전체 비우기
    delAllItem: function(){
        document.querySelector('.coupon-use').remove();
        document.querySelector('.delivery-plus').innerHTML = `
            <p>배송비<br>
            <input type="hidden" name="delivery_p" class="delivery_p" value="0">
            <span class="delivery_price">0</span>원</p>
        `;
        
        document.querySelectorAll('.row.data').forEach(function (item) {
            item.parentElement.classList.add('empty');
            item.remove();
        });

        this.totalCount = 0;
        this.totalPrice = 0;
        this.reCalc();
        this.updateUI();
        this.updateTotal();
    },
    //재계산
    reCalc: function(){
        this.totalCount = 0;
        this.totalPrice = 0;
        document.querySelectorAll(".p_num").forEach(function (item) {
            if(item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.checked == true){
                const count = parseInt(item.innerText);
                this.totalCount += count;

                const price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
                this.totalPrice += count * price;
            }
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //합계금액
    reTotal: function(){
        if(document.querySelector('.coupon_p')){
            //쿠폰할인이 있는경우 사용
            const coupon = parseInt(document.querySelector('.coupon_p').getAttribute('value'));
            this.totalPrice -= coupon;
        }

        const delivery = parseInt(document.querySelector('.delivery_p').getAttribute('value'));
        this.totalPrice += delivery;
    },
    //상품 - 화면업데이트
    updateUI: function () {
        if(!document.querySelector('.data .item')){
            //선택상품이 남아있지않은경우 = 모두삭제한 경우와 같은 화면
            document.querySelector('.coupon-use').remove();
            document.querySelector('.delivery-plus').innerHTML = `
                <p>배송비<br>
                <input type="hidden" name="delivery_p" class="delivery_p" value="0">
                <span class="delivery_price">0</span>원</p>
            `;
            
            document.querySelectorAll('.row.data').forEach(function (item) {
                item.parentElement.classList.add('empty');
                item.remove();
            });
            
        }else {
            document.querySelector('.sum_p_price').innerHTML = `상품금액<br><span>${this.totalPrice.formatNumber()}</span>원`;
        }
    },
    //상품 + 배송비 - 화면업데이트
    updateTotal: function (){
        document.querySelector('.price-last p').innerHTML = `합계금액<br><span>${this.totalPrice.formatNumber()}</span>`
    },
    checkItem: function () {
        this.reCalc();
        this.updateUI();
        this.reTotal();
        this.updateTotal();
    },
    //나머지 아이템:checked
    itemCheck: function(){
        document.querySelectorAll("input[name=buy]").forEach(function (item) {
            item.checked = "checked";
        });
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