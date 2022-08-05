//주문상품 리스트 펼침/닫힘
function listToggle(event){
    const btn = event.currentTarget;
    btn.classList.toggle('active');

    const basket = document.querySelector(".basket");
    const item = document.querySelectorAll('.basket .data .item');
    const firstItemName = item[0].querySelector('.item:first-child .p_name span').innerText;
    basket.classList.toggle('invisible');

    const orderName = document.querySelector('.order-name');
    if(orderName.innerHTML == ""){
        orderName.innerHTML = `<b>${firstItemName}</b> 외 <b>${item.length}건</b>의 상품을 주문합니다.`;
    }else{
        orderName.innerHTML = "";
    }
}


//배송방법 선택에 따른 배송문구 변경
const deliveryRadio = document.querySelectorAll('.delivery input[type="radio"]');
const deliverySpan = document.querySelector('.delivery td span');
for(let i = 0; i < deliveryRadio.length; i++){
    deliveryRadio[i].addEventListener("change",()=>{
        if(i === 0){
            deliverySpan.innerHTML = `※ 금일 오전 10시전 주문시 당일발송, 오후 수령`;
        }else if(i === 1){
            deliverySpan.innerHTML = `※ 금일 오후 5시까지 주문시 당일발송`;
        }
    })
}


//마일리지, 예치금 사용
function inputNumMileage(obj){
    obj.value = comma(uncomma(obj.value));
    const mileageAll = document.querySelector('.mileage .spendAll b').innerText;
    const objNum = obj.value;
    if(parseInt(objNum.replace(",","")) > parseInt(mileageAll.replace(",",""))){
        alert('사용가능한 마일리지 금액을 초과하였습니다.')
        obj.value = "";
    }
}
function inputNumDeposit(obj){
    obj.value = comma(uncomma(obj.value));
    const depositAll = document.querySelector('.deposit .spendAll b').innerText;
    const objNum = obj.value;
    if(parseInt(objNum.replace(",","")) > parseInt(depositAll.replace(",",""))){
        alert('사용가능한 예치금 금액을 초과하였습니다.')
        obj.value = "";
    }
}
function comma(str){
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// 모두사용 버튼
const spendAllTd = document.querySelectorAll('.spend-all-possible');
for(let i = 0; i < spendAllTd.length; i++){
    const spendAllBtn = spendAllTd[i].querySelector('.useall-btn');
    const spendAllNum = spendAllTd[i].querySelector('.spendAll b').innerText;
    const spendInput = spendAllTd[i].querySelector('input');
    
    spendAllBtn.addEventListener('click', ()=>{
        spendInput.value = spendAllNum;
    }); 
}

//결제수단 선택에 따른 결제수단 문구 변경
const paymentType = document.querySelectorAll('.payment-type');
const paymentTab = document.querySelector('.payment-tab');

const tbody = document.querySelector('.payment tbody');
const cashHtml = `<div class="cash-receipts-result">
<div>
    <div><input type="radio" name="receiptsType" checked id="income">
    <label for="income">소득공제용</label></div>
    <div><input type="radio" name="receiptsType" id="expenditure">
    <label for="expenditure">지출증빙용</label></div>
</div>
<div>
    <label for="number">휴대폰번호</label>
    <input id="number" type="number" placeholder="숫자를 입력해 주세요.">
</div>
</div>`;
const taxHtml = `<div class="tax-bills-result">
<p>세금계산서 발급 및 신청은 결제일로부터 익월 10일까지 가능합니다.</p>
<ul>
    <li>
        <label for="businessNum">사업자번호</label>
        <input type="number" required id="businessNum">
    </li>
    <li>
        <label for="companyName">회사명</label>
        <input type="text" required id="companyName">
    </li>
    <li>
        <label for="CeoName">대표자명</label>
        <input type="text" required id="CeoName">
    </li>
    <li>
        <label for="statusName">업태</label>
        <input type="text" required id="statusName">
    </li>
    <li>
        <label for="typeName">종목</label>
        <input type="text" required id="typeName">
    </li>
    <li>
        <label for="companyAddress">사업장주소</label>
        <input type="number" required id="companyAddress" placeholder="우편번호">
        <button type="button">우편번호검색</button>
        <input type="text" required id="companyAddress" placeholder="주소를 입력해주세요">
        <input type="text" required id="companyAddress" placeholder="상세주소를 입력해주세요">
    </li>
</ul>
</div>`;


for(let i = 0; i < paymentType.length; i++){
    const paymentInput = paymentType[i].querySelector('input');
    paymentInput.addEventListener('change', ()=>{
        if(i === 0){
            paymentTab.style.display = "block";
            paymentTab.innerHTML = `<p>(간편결제로 결제 할 카드를 미리 등록해 놓으면 주문을 빠르게 할 수 있습니다.)</p><div><button type="button">+ 신용/체크 카드 등록</button></div>`; //간편결제
            if(tbody.querySelector('.receipt')){
                tbody.querySelector('.receipt').remove();
            }
            if(document.querySelector('.receipt-result')){
                document.querySelector('.receipt-result').remove();
            }
        }else if(i === 1){
            paymentTab.style.display = "block";
            paymentTab.innerHTML = `<p>(무통장 입금의 경우, 입금확인 후 부터 배송단계가 진행됩니다.)</p><div><label for="depositName">입금자명</label><input id="depositName" required type="text"><br><label for="depositBank">입금은행</label><select id="depositBank" required><option>선택해 주세요</option><option>농협 367-07-048922 (주)세이지그린</option><option>우리 850-149301-13-101 (주)세이지그린</option><option>국민 816901-04-139520 (주)세이지그린</option><option>하나 777-910013-89904 (주)세이지그린</option><option>신한 140-008-288663 (주)세이지그린</option></select></div>`; //무통장입금내용

            const receiptTr = document.createElement('tr');
            receiptTr.className = 'receipt';
            receiptTr.innerHTML = `<th scope="row">현금영수증/계산서 발행</th><td><div><input type="radio" name="cash" id="noReceipts" checked><label for="noReceipts">신청안함</label></div><div><input type="radio" name="cash" id="cashReceipts"><label for="cashReceipts">현금영수증</label></div><div><input type="radio" name="cash" id="taxBills"><label for="taxBills">세금계산서</label></div></td>`; //현금영수증 발행관련
            tbody.appendChild(receiptTr);
            const receiptInput = receiptTr.querySelectorAll('input');
            const receiptResult = document.createElement('div');
            receiptResult.className = 'receipt-result';
            for(let j = 0; j < receiptInput.length; j++){
                document.querySelector('.payment .cont-form').appendChild(receiptResult);
                receiptInput[j].addEventListener('change', ()=>{
                    if(j === 1){
                        receiptResult.innerHTML = cashHtml; //현금영수증

                        const cashInput = receiptResult.querySelectorAll('.cash-receipts-result input');
                        for(let k = 0; k < cashInput.length; k++){
                            cashInput[k].addEventListener('change', ()=>{
                                if(k === 0){
                                    document.querySelector('.cash-receipts-result > div:last-child label').innerText = '휴대폰번호';
                                }else {
                                    document.querySelector('.cash-receipts-result > div:last-child label').innerText = '사업자번호';
                                }
                            })
                        }
                    }else if(j === 2){
                        receiptResult.innerHTML = taxHtml; //세금계산서
                    }else {
                        receiptResult.innerHTML = ``; //신청x
                    }
                })
            }
        }else if(i === 5){
            paymentTab.style.display = "block";
            paymentTab.innerHTML = `<p>· 주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다.<br>· 네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버페이 비밀번호로<br>&nbsp결제할 수 있는 간편결제 서비스입니다.<br><b>· 결제 가능한 신용카드:</b> 신한, 삼성, 현대, BC, 국민, 하나, 롯데, NH농협, 씨티, 카카오뱅크<br><b>· 결제 가능한 은행:</b> NH농협, 국민, 신한, 우리, 기업, SC제일, 부산, 경남, 수협, 우체국, 미래에셋대우<br><span style="margin-left:98px;">광주, 대구, 전북, 새마을금고, 제주은행, 신협, 하나은행, 케이뱅크, 카카오뱅크, 삼성증권</span><br>·네이버페이 카드 간편결제는 네이버페이에서 제공하는 카드사별 무이자, 청구할인 혜택을 받을 수 있습니다.</p>`; //네이버페이
            if(tbody.querySelector('.receipt')){
                tbody.querySelector('.receipt').remove();
            }
            if(document.querySelector('.receipt-result')){
                document.querySelector('.receipt-result').remove();
            }
        }else { //etc
            paymentTab.style.display = "none";
            paymentTab.innerHTML = "";
            if(tbody.querySelector('.receipt')){
                tbody.querySelector('.receipt').remove();
            }
            if(document.querySelector('.receipt-result')){
                document.querySelector('.receipt-result').remove();
            }
        }
    })
}

//최종결제금액 탭
const totalDetails = document.querySelector('.price-details');
const totalBtn = document.querySelector('.total-price > p i');
totalBtn.addEventListener('click', ()=>{
    totalBtn.classList.toggle('click');
    totalDetails.classList.toggle('visible');
})

//최종결제금액 계산 = 상품 총 합 - 마일리지 - 쿠폰 + 배송비
let totalPrice = 0;
const totalP = document.querySelector(".total-price p strong");
function totalCalc(){
    const value = document.querySelectorAll(".basket .sum_price");
    for(let i = 0; i < value.length; i++){
        const sum = parseInt(value[i].getAttribute('value'));
        totalPrice += sum;
    }
    const itemTotal = document.querySelector('.item-all-price span b');
    itemTotal.innerText = Number(totalPrice).toLocaleString();//상품합계
    const point = parseInt(document.querySelector('.point_p').getAttribute('value'));
    const coupon = parseInt(document.querySelector('.coupon_p').getAttribute('value'));
    const delivery = parseInt(document.querySelector('.delivery_p').getAttribute('value'));
    totalPrice -= point; // - 마일리지,예치금
    totalPrice -= coupon; // - 쿠폰
    totalPrice += delivery; // + 배송비
    totalP.innerText = Number(totalPrice).toLocaleString();
}
totalCalc();
