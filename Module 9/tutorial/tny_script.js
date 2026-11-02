"use strict";
/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Tutorial Case

   Countdown Clock
   Author: Michael McCrea
   Date:   11/1/2026

*/

// Function to create and run th countdown clock
runClock();
setInterval("runClock()", 1000);

function runClock() {

   var currentDay = new Date();
   var dateStr = currentDay.toLocaleDateString();
   var timeStr = currentDay.toLocaleTimeString();

   /* Display the current date and time */
   document.getElementById("dateNow").innerHTML=
   dateStr + "<br />" + timeStr;

   // Calculate the days until Janurary 1st
   var newYear = new Date("Janurary 1, 2018");
   var nextYear = currentDay.getFullYear() + 1;
   newYear.setFullYear(nextYear);
   var daysLeft = (newYear - currentDay)/(1000*60*60*24);

   // Calculate the hours left in the current day
   var hrsLeft = (daysLeft - Math.floor(daysLeft))*24;

   // Calculate the minutes and seconds left in the current hour
   var minsLeft = (hrsLeft - Math.floor(hrsLeft))*60;
   var secsLeft = (minsLeft - Math.floor(minsLeft))*60;

   // Display the time left until New Year's eve
   document.getElementById("days").textContent =Math.floor(daysLeft);
   document.getElementById("hrs").textContent = Math.floor(hrsLeft);
   document.getElementById("mins").textContent = Math.floor(minsLeft);
   document.getElementById("secs").textContent = Math.floor(secsLeft);
}



// window.alert("Welcome to Tulsa");