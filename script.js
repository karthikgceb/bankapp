'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'karthik Raja',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ramachandran Periyakaruppan',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ajith kumar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};


const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//display the current balance
const displaybalance = function(acc){
  acc.balance = acc.movements.reduce((acc,cur) => acc+cur,0);
  //acc.balance=balance;
  labelBalance.textContent=`Rs.${acc.balance}`;
}
//displaybalance(account1);

//display total in amount 
const displaySummary = function(acc){
  const income = acc.movements.filter((mov) => mov > 0).reduce((acc,mov)=>acc+mov,0)
  labelSumIn.textContent = `Rs.${income}`;
  const spend= Math.abs(acc.movements.filter((mov) => mov < 0).reduce((cur,mov)=>cur+mov))
  labelSumOut.textContent = `Rs.${Math.abs(spend)}`;
  const sumInterest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit* acc.interestRate/100)).reduce((acc,int)=>acc+int,0);
  labelSumInterest.textContent = `Rs.${(sumInterest).toFixed(2)}`;
}






//display the movements what are the action tone
const displayMovements = function (acc) {
  
  containerMovements.innerHTML = '';
  
  acc.movements.forEach(function(mov,i)
  {
    let  type = mov > 0 ? 'deposit':'withdrawal';
    const  html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">
  ${i+1} ${type}</div>
    <div class="movements__value">Rs.${mov}</div>
    </div> `;
    containerMovements.insertAdjacentHTML('afterbegin',html);   
  
  //console.log(mov,i) ;
});
};

//function of display the movements

const uiMovements = function (account) {
displaybalance(account);
displaySummary(account);
displayMovements(account);
}

//create a user name
const accountUsername = (accs) =>{
  accs.forEach(function(acc){
    acc.username=acc.owner.toLowerCase().split(' ') .map (name => name[0] ).join('');
  });

};
accountUsername(accounts);
//console.log(accounts);

//implementing login event handler
let currentAccount;
btnLogin.addEventListener('click',function(e){
e.preventDefault();
currentAccount=accounts.find(acc => acc.username === inputLoginUsername.value);

//console.log(currentAccount);

if (currentAccount?.pin === Number(inputLoginPin.value))
{
  //console.log('click');
  labelWelcome.textContent=`Welcome Back ${currentAccount.owner.split(' ')[0]}`
  uiMovements(currentAccount);
  containerApp.style.opacity=100;
  inputLoginUsername.value=inputLoginPin.value='';
}

//display UI movments
else{
containerApp.style.opacity=0;
// clear input fields
inputLoginUsername.value=inputLoginPin.value='';
labelWelcome.textContent='WRONG LOGIN & TRY AGAIN';
}
inputLoginUsername.blur();
inputLoginPin.blur();
});

//FAKE LOGIN
/*
currentAccount=account1;
containerApp.style.opacity=100;
uiMovements(currentAccount);
*/
//IMPLEMETING DATE FUNCTION



//implementing a transfer money
btnTransfer.addEventListener('click',function(e){

e.preventDefault();
console.log('click');
let amount=Number(inputTransferAmount.value);
let reciverAcc=accounts.find(acc => acc.username === inputTransferTo.value);

inputTransferTo.value=inputTransferAmount.value=' ';

if(amount >0 && reciverAcc && currentAccount.balance >= amount && reciverAcc?.username !== currentAccount.username)
currentAccount.movements.push(-amount);
reciverAcc.movements.push(amount);
uiMovements(currentAccount);
});

//implementing loan 
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  let amount= Number(inputLoanAmount.value);
  if(amount >0 &&  currentAccount.movements.some(mov => mov>=amount*0.1)){

    currentAccount.movements.push(amount);
    console.log(currentAccount.movements);
    uiMovements(currentAccount);
  }
});



//implementing a close account

btnClose.addEventListener('click',function(e){
e.preventDefault();

if(currentAccount.username === inputCloseUsername.value && 
currentAccount.pin === Number(inputClosePin.value)){
const index=accounts.findIndex(acc => acc.username === currentAccount.username);
accounts.splice(index);
containerApp.style.opacity=0;
inputCloseUsername.value=inputClosePin.value=' ';
labelWelcome.textContent='YOUR ACCOUNT CLOSED SUCCESSFULLY';
}

});

const now = new Date();
console.log(now);
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();
const hour = now.getHours();
const minutes=now.getHours(); 

//FIX THE DISPLAY TIME

labelDate.textContent=`${date}/${month+1}/${year} Login On: ${hour}:${minutes}`;