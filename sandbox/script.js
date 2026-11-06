console.log('Hello World')

const roster = ["Heather", "Kaia", "Jesse",
    "Quinton", "Michael"
]

// let newRosterLen = roster.push('Steve')
// console.log(newRosterLen);

// console.log('The length of the array is ' + roster.length + ' on nov 4');

// console.log(`The length of the array is ${roster.length} on nov 4`);


for(let i = 0; i < roster.length; i++){
    console.log(`Member ${roster[i]} is number ${i+1}`);
}

// Dates
let currentDate = Date()
console.log(`The current date is ${currentDate.toString()}`);

const holiday = new Date(2026, 11, 25,0,30,0)
console.log(`The holiday is ${holiday.toString()}`);