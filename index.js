const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function to add days
function initCalendar() {
    // to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // update date on top of calendar
    date.innerHTML = months[month] + " " + year;

    // adding days on dom
    let days = "";

    // prev month days
    for(let x=day; x>0; x--){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // current month days
    for(let i=1; i<=lastDate; i++){
        // if day is today add class today
        if(i === new Date().getDate() && 
           year === new Date().getFullYear() && 
           month === new Date().getMonth()){
            days += `<div class="day today">${i}</div>`;
        } // add remaining as it is
        else {
            days += `<div class="day">${i}</div>`;
        }
    }

    // next month days
    for(let j=1; j<=nextDays; j++){
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
}

initCalendar();

// prev month
function prevMonth() {
    month--;
    if(month < 0){
        month = 11;
        year--;
    }

    initCalendar();
}

// next month
function nextMonth() {
    month++;
    if(month > 11){
        month = 0;
        year++;
    }

    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    // allow only members, remove everything else
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    const monthPart = inputValue.substring(0, 2);
    const yearPart = inputValue.substring(2, 6);

    let formattedValue = "";

    // If a valid month is entered, format the date
    if (monthPart) {
        formattedValue += monthPart;

        // If a valid year is entered, append the year
        if (yearPart) {
            formattedValue += "/" + yearPart;
        }
    }

    e.target.value = formattedValue;
});

gotoBtn.addEventListener("click", gotoDate);

// function to move to date entered
function gotoDate() {
    const dateArr = dateInput.value.split("/");

    // some date validation
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = parseInt(dateArr[1], 10); // or Number(dateArr[1])

            initCalendar();
            return;
        }
    }

    // if invalid date
    alert("Invalid Date Entered!");
}