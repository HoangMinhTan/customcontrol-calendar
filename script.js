const date = new Date();
const monthDays = document.querySelector(".days");  // ngay trong thang


let selectedDate = date.getDate();
let selectedMonth = date.getMonth()+1;
let selectedYear = date.getFullYear();


const renderCalendar = () => {
  date.setDate(1); // ngay 1 cua thang hien tai

  const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate(); // ngay cuoi cung cua thang

  const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate(); // ngay cuoi cung cua thang truoc

  const firstDayIndex = date.getDay(); // thu cua ngay 1 trong thang

  const lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1,0).getDay(); // thu cua ngay cuoi cung cua thang

  let nextDays = 6 - lastDayIndex; // 6 la thu 7

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();

  document.querySelector(".date p").innerHTML = new Date(selectedYear, selectedMonth -1 ,selectedDate).toDateString();

  let days = "";
  let count = 0;
  monthDays.innerHTML="";

  for (let x = firstDayIndex; x > 0; x--) {
   addDay('prev-date', prevLastDay - x + 1,date, 0);
   count++;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      addDay('today', i, date, 1);
    } else {
      addDay('normal', i, date, 1);
    }
    count++;
  }

  for (let j = 1; j <= nextDays; j++) {
    addDay('next-date', j,date, 2);
    count++;
  }

  while (count < 42) {
    addDay('next-date', ++nextDays, date, 2);
    count++;
  }

  const day_element = document.querySelector('.day').addEventListener("click", () =>{
    day_element.classList.add('today');
  });
};


//0: prev-mth
//1: mth
//2: next-mth
function addDay(classname, content, date, status){
  const day_element = document.createElement('div');
    day_element.classList.add('day');
    day_element.classList.add(classname);
    day_element.textContent = content;

    if (compareDate(content, date, status))
      day_element.classList.add('selected');


    day_element.addEventListener("click", function(){
      selectedDate = content;
      if (status == 0){
        if (date.getMonth() == 0)
        {
          selectedMonth = 12;
          selectedYear = date.getFullYear()-1;
        }
        else 
        {
          selectedMonth = date.getMonth();
          selectedYear = date.getFullYear();
        }
      }
      else if (status == 2){
        if (date.getMonth() == 11)
        {
          selectedMonth = 1;
          selectedYear = date.getFullYear()+1;
        }
        else 
        {
          selectedMonth = date.getMonth()+2;
          selectedYear = date.getFullYear();
        }
      }
      else {
        selectedMonth = date.getMonth()+1;
        selectedYear = date.getFullYear();
      }
      renderCalendar();
    });
    monthDays.appendChild(day_element);
}

function compareDate(content,date,status)
{
  if (selectedDate == content)
  {
    if (status == 0)
    {
      if ((selectedMonth == 12 && date.getMonth() == 0 && selectedYear == (date.getFullYear()-1) ) || ((selectedMonth == date.getMonth()) && selectedYear == date.getFullYear()) )
        return true;
    }
    else if (status == 1)
    {
      if (selectedMonth == date.getMonth()+1 && selectedYear == date.getFullYear())
        return true;
    }
    else
    {
      if ((selectedMonth == 0 && date.getMonth ==11 && selectedYear == (date.getFullYear()+1)) || ((selectedMonth == date.getMonth()+2) && selectedYear == date.getFullYear()))
        return true;
    }
    return false;
  }
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
