import { Button, EventData, Label, Page } from '@nativescript/core'
import { GridLayout } from "@nativescript/core";
import { ListPicker } from "@nativescript/core";

var todayDate=new Date()

var today:number[] =[1,todayDate.getMonth()+1,todayDate.getFullYear()];

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  const years: string[] = [];
  const startYear = 2001;
  const endYear = 2030;
  var selectedperiod: number[] =[1,todayDate.getMonth()+1,todayDate.getFullYear()];
  
  
  for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
  }

  const months: string[] = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  const yearsPicker = <ListPicker>page.getViewById("yr");
  const monthsPicker = <ListPicker>page.getViewById("mnt");
  yearsPicker.items = years
  monthsPicker.items = months;
  monthsPicker.selectedIndex=selectedperiod[1]-1;
  yearsPicker.selectedIndex=selectedperiod[2]-2001
  yearsPicker.on('selectedIndexChange',function(){
    setTimeout(function() {
      displayCalendar(args,[1,monthsPicker.selectedIndex+1,yearsPicker.items[yearsPicker.selectedIndex]])
      }, 500);
  })
  monthsPicker.on('selectedIndexChange',function(){
    setTimeout(function() {
      displayCalendar(args,[1,monthsPicker.selectedIndex+1,yearsPicker.items[yearsPicker.selectedIndex]])
      }, 500);
  })
  var btn =<Button>page.getViewById("bck");
  btn.on("tap",function(){
    monthsPicker.selectedIndex=today[1]-1;
    yearsPicker.selectedIndex=today[2]-2001
    displayCalendar(args,today)
  })  
  displayCalendar(args,selectedperiod)


}

function displayCalendar(args: EventData, selectedperiod : number[]){
  const page = <Page>args.object
  var gridLayout = <GridLayout>page.getViewById("calend");
  var daysInMonth =getDaysInMonth(selectedperiod[2],selectedperiod[1])
  var date = new Date(selectedperiod[2],selectedperiod[1]-1,1)
  gridLayout.removeChildren();
  var lstmnt=selectedperiod[1]-1 == 0 ? 31 :getDaysInMonth(selectedperiod[2] ,selectedperiod[1]-1)//прош мес
  if ( selectedperiod[2] != today[2] || selectedperiod[1] != today[1])
  {
    var btn =<Button>page.getViewById("bck");
    btn.visibility="visible";
  }
  else{
    var btn =<Button>page.getViewById("bck");
    btn.visibility="collapsed";
  }
  var wd=date.getDay()-1
  wd = wd<0 ? 6 : wd;
  for (let i = wd-1; i >=0; i--) {
    var label = new Label();
    label.text=(lstmnt-i).toString();
    label.col=(wd-1)-i % 7;
    label.row=0;
    label.className=(i % 7)-5<0 ?"day notactive" : "day notactive holyday"
    gridLayout.addChild(label)
    
  }
  for (let i = wd; i < daysInMonth+wd; i++) {
    var label = new Label();
    label.text=(i-wd+1).toString();
    label.col=i % 7;
    label.row=i /7;
    label.className=(i % 7)-5<0 ? "day" : "day holyday"
    gridLayout.addChild(label)
  }

  for (let i = daysInMonth+wd; i < 42; i++) {
    var label = new Label();
    label.text=( i-(daysInMonth+wd)+1 ).toString();
    label.col=i % 7;
    label.row=i /7;
    label.className=(i % 7)-5<0 ?"day notactive" : "day notactive holyday"
    gridLayout.addChild(label)
    
  }
  
}



function getDaysInMonth(year: number, month: number): number {
  month--

  if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
      return 29;
  } else {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return daysInMonth[month];
  }
}



function getMonthName(m: number): string {
  const month: string[] = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
  ];
      return month[m - 1];
}