/* mypage - 전화상담예약 */

//step1 - 1: 상담 날짜
//calendar
let date = new Date();

function renderCalendar(){
    const viewYear = date.getFullYear(),
        viewMonth = date.getMonth();

    //year-month
    const yearMonth = document.querySelector('.year-month');
    yearMonth.textContent = `${viewYear}년 ${viewMonth + 1}월`;

    //지난 달 마지막 date, 이번 달 마지막 date
    const prevLast = new Date(viewYear, viewMonth, 0),
            thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate(),
            PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate(),
            TLDay = thisLast.getDay();

    //dates 기본 배열
    const prevDates = [],
            thisDates = [...Array(TLDate + 1).keys()].slice(1),
            nextDates = [];

    //prevDates
    if(PLDay != 6){
        for(let i = 0; i < PLDay + 1; i++){
            prevDates.unshift(PLDate - i);
        }
    };
    //nextDates
    for(let i = 1; i < 7 - TLDay; i++){
        nextDates.push(i);
    };

    //Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    //Dates 정리
    const firstDateIndex = dates.indexOf(1),
            lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';

        dates[i] = `<button type="button" class="date ${condition}">${date}</button>`;
    });

    //dates 그리기
    document.querySelector('.calendar-cont .dates').innerHTML = dates.join('');

    //오늘 날짜
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
    // 오늘보다 과거인 날짜
    if (viewYear <= today.getFullYear() && viewMonth < 12) {
        
        for (let date of document.querySelectorAll('.this')) {
            date.classList.remove('this');
            date.classList.add('other');
            if (viewYear === today.getFullYear() && viewMonth >= today.getMonth()) {
                date.classList.add('this');
                date.classList.remove('other');
                if (viewMonth === today.getMonth() && +date.innerText < today.getDate()) {
                    date.classList.add('other');
                    date.classList.remove('this');
                }
            }
        }
        
    }
    // 주말(토,일) 의 this 제거, other 추가
    let newThisDate = document.querySelectorAll('.date');
    for (let i = 0; i < newThisDate.length; i++) {
        if(i % 7 === 6 || i % 7 === 0){
            newThisDate[i].classList.remove('this');
            newThisDate[i].classList.add('other');
        }
    } 

    let dateThis = document.querySelectorAll('.calendar-cont .this');
    for (let i = 0; i < dateThis.length; i++) {
        dateThis[i].onclick = function () {
            const viewDate = dateThis[i].innerText;
            const reserveDate = document.querySelector('.reserve-date p');
            reserveDate.classList.add('active');
            reserveDate.innerText = `${viewYear}.${viewMonth + 1}.${viewDate}`;
            //탭한 달력의 날짜를 reserve-date p에 추가
            let j = 0;
            while (j < dateThis.length) {
                dateThis[j++].classList.remove('active');
            }
            dateThis[i].classList.add('active');
            //탭한 달력의 날짜 css수정
        }
    }
    
};
renderCalendar();

function prevMonth(){
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};
function nextMonth(){
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};
const goToday = () => {
    date = new Date();
    renderCalendar();
};


//step1 - 2: 상담 시간
const dateText = document.querySelector('.reserve-date p');
const timeList = document.querySelector('.reserve-time-list');
function timeListToggle() {
    if (dateText.classList.contains('active')) {
        timeList.classList.toggle('active');
    } else {
        alert('상담 날짜를 먼저 선택해 주세요.');
    }
}
const timeBtnList = document.querySelectorAll('.time-list');
const timeText = document.querySelector('.reserve-time p');
const nextBtn = document.querySelector(".reservation .next-btn");
for(let i = 0; i < timeBtnList.length; i++){
    let timeBtn = timeBtnList[i].querySelectorAll('button.active');
    for(let j = 0; j < timeBtn.length; j++){
        let timeValue = timeBtn[j].value;
        timeBtn[j].addEventListener("click", ()=>{
            timeText.classList.add('active');
            timeText.innerHTML = `${timeValue} <span>(+30분 이내)</span><i class="fas fa-chevron-down"></i>`;
            timeList.classList.remove('active');
            nextBtn.classList.add('on');
        })
    }
}

const prevStepCont = document.querySelector('.step1'),
    nextStepCont = document.querySelector('.step2'),
    lastStepCont = document.querySelector('.step3');

function nextStep(){
    if (dateText.classList.contains('active') && timeText.classList.contains('active')) {
        prevStepCont.style.display = "none";
        nextStepCont.style.display = "block";
    } else {
        return false;
    }
    //reserve-date 와 time의 p 가 모두 active여야 step 2로 넘어감
}

//step2
//뒤로 버튼
function prevStep(){
    if(confirm("진행중인 예약건이 취소됩니다.") == true){
        location.reload();
    }else{
        return false;
    }
}

//전화상담 신청 버튼
const nameInput = document.querySelector(".form-customer .name input");
const numberInput = document.querySelector(".form-customer .number input");
function submitStep(event) {
    if (nameInput.value !== "" && numberInput.value !== "") {
        event.preventDefault()
        nextStepCont.style.display = "none";
        lastStepCont.style.display = "flex";

    } else {
        alert('상담요청자란과 연락처란을 확인해 주세요.');
    }
}