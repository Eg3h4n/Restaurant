/**
 * DOM SELECTORS
 */
const totalCustomersBadge = document.getElementById("totalCustomers");
const totalRevenueBadge = document.getElementById("totalRevenue");
const currentCustomersBadge = document.getElementById("currentCustomers");
const waitingListBadge = document.getElementById("waitingList");
const startStopBtn = document.getElementById("startStop");
const tables = document.querySelectorAll(".card");

/**
 * Variables
 */
// const maxCap = 90;
// const totalTables = 18;
var totalCustomers = 0;
var incoming = 0;
var seated = 0;
var waiting = 0;
var profit = 0;
var gameOn = false;
var incID;
var customersArr = [];
var x = 0;
var timeOutRand = 0;
/**
 *Listeners
 */
startStopBtn.addEventListener("click", function() {
  if (!gameOn) {
    incCustFun();
    gameOn = true;
    console.log(gameOn);
  } else {
    clearInterval(incID);
    gameOn = false;
    console.log(gameOn);
  }
});
tables.forEach(function(table) {
  var occupied = false;
  table.addEventListener("click", function() {
    if (waiting > 0) {
      if (!occupied) {
        seatCustFun();
        table.querySelector(".card-text").innerHTML = x;
        table.style.backgroundColor = "red";
        table.style.color = "white";
        occupied = true;
        timeOutRand = randomIntFromInterval(5000, 10000);
        setTimeout(() => {
          table.style.backgroundColor = "green";
        }, timeOutRand);
      } else {
        if (this.style.backgroundColor === "green") {
          checkOutFun(table);
          table.querySelector(".card-text").innerHTML = 0;
          table.style.backgroundColor = "";
          table.style.color = "";
          occupied = false;
        }
      }
    }
  });
});

/**
 * Functions
 */
function incCustFun() {
  incID = setInterval(() => {
    incoming = Math.ceil(Math.random() * 10);
    totalCustomers += incoming;
    customersArr.push(incoming);
    totalCustomersBadge.innerHTML = totalCustomers;
    waiting += incoming;
    waitingListBadge.innerHTML = waiting;
  }, 2000);
}
function seatCustFun() {
  seated += customersArr[0];
  waiting -= customersArr[0];
  currentCustomersBadge.innerHTML = seated;
  waitingListBadge.innerHTML = waiting;
  x = customersArr.shift();
}
function checkOutFun(table) {
  let y = table.querySelector(".card-text").innerHTML;
  seated -= y;
  profit += y * 10;
  currentCustomersBadge.innerHTML = seated;
  totalRevenueBadge.innerHTML = profit;
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
