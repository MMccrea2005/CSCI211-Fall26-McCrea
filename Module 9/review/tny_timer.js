"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Review Assignment

   Event Timer
   Author: Michael McCrea
   Date:   11/1/2026

*/
showClock();
setInterval("showClock()", 1000);

function showClock() {
   var thisDay = new Date();
   var localDate = thisDay.toLocaleDateString();
   var localTime = thisDay.toLocaleTimeString();

   document.getElementById("currentTime").innerHTML = 
   localDate + "<br />" + localTime;

   var j4Date = nextJuly4(thisDay);

   setHours(j4Date);

   var days = (j4Date - thisDay)/(1000*60*60*24);

   // Calculate the hours left in the current day
   var hrs = (days - Math.floor(daysLeft))*24;

   // Calculate the minutes and seconds left in the current hour
   var mins = (hrs - Math.floor(hrsLeft))*60;
   var secs = (mins - Math.floor(minsLeft))*60;

   document.getElementById("dLeft").textContent =Math.floor(days);
   document.getElementById("hLeft").textContent = Math.floor(hrs);
   document.getElementById("mLeft").textContent = Math.floor(mins);
   document.getElementById("sLeft").textContent = Math.floor(secs);
}

function nextJuly4(currentDate) {
   var cYear = currentDate.getFullYear();
   var jDate = new Date("July 4, 2018");
   jDate.setFullYear(cYear);
   if ((jDate - currentDate) < 0) jDate.setFullYear(cYear + 1);
   return jDate;
}