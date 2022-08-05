/* mypage 주문/배송조회 */

// 배송조회 영역 - input[type="text"] 기본세팅: 일주일 전 ~ 현재날짜
function lastweek(){
    let date = new Date();
    let dayOfMonth = date.getDate();
    date.setDate(dayOfMonth - 7);

    const LAST_WEEK = document.querySelector('.history .lastweek');
    LAST_WEEK.value = date.toISOString().slice(0, 10);
}; //지난 주
lastweek();

function today(){
    let today = new Date().toISOString().slice(0, 10);
    const TODAY = document.querySelector('.history .today');
    TODAY.value = today;
}; //오늘 날짜
today();


// 주문목록 리스트
function orderList(){
    const orderItem = document.querySelectorAll('.form-body .order-item');
    for(let i = 0; i < orderItem.length; i++){
        const itemInfo = orderItem[i].querySelectorAll('.item-info');
        itemInfo[0].insertAdjacentHTML("beforebegin", `<div id="checkAll"><input type="checkbox"><span>이 주문번호 전체선택</span></div>`);
        //주문목록 - 하나의 주문건에 제일 첫번째 상품 위에 '이 주문번호 전체선택' 문구 생성

        const itemInfoNum = itemInfo.length;
        const itemDate = orderItem[i].querySelector('.item-date');
        itemDate.style.gridRow = `span ${itemInfoNum + 1}`;
        //주문번호에 있는 아이템 수를 세고 +1 해서 주문번호에 grid-row css적용

        const checkAllBtn = orderItem[i].querySelector('#checkAll input');
        checkAllBtn.addEventListener("change", (event)=>{
            const checkAll = event.currentTarget.parentNode.parentNode;
            const itemInfoActive = checkAll.querySelectorAll('.item-info');
            for(let j = 0; j < itemInfoActive.length; j++){
                const inputCheck = itemInfoActive[j].querySelector('input');
                if(inputCheck.checked === false){
                    inputCheck.checked = true;
                } else{
                    inputCheck.checked = false;
                }
            }
        });
        //주문건 전체선택
    }

    //총 주문건
    const orderItemLength = document.querySelector('.details-title span');
    orderItemLength.innerHTML = `${orderItem.length}`;
}
orderList();
 