"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Review Assignment

   Author: Michael McCrea
   Date:   11/8/2026

	
*/

let thisDay = new Date("August 30, 2018");

let tableHTML = "<table id='eventTable'> <caption>Upcoming Events</caption> <tr><th>Date</th><th>Event</th><th>Price</th></tr>";

let endDate = new Date(thisDay.getTime() + 14*24*60*60*1000);

for (var i = 0; i < eventDates.length; i++) {
   let eventDate = new Date(eventDates[i]);
   let eventDay = eventDate.toDateString();
   let eventTime = eventDate.toLocaleTimeString();

   if (thisDay <= eventDate && eventDate <= endDate) {
      tableHTML += `<tr><td>${eventDay} @ ${eventTime}</td><td>${eventDescriptions[i]}</td><td>${eventPrices[i]}</td></tr>`;
   }
}

tableHTML += "</table>";

document.getElementById("eventList").innerHTML = tableHTML;