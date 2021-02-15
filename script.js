"use strict";

const greetingItem = document.querySelector('.greeting');
const signUp = document.querySelector('.sign_up');
const signIn = document.querySelector('.sign_in');
const usersList = document.querySelector('.users_list');
const defaultGreeting = 'Привет Аноним!';

let usersData = [];

const month = [
 'января',
 'февраля',
 'марта',
 'апреля',
 'мая',
 'июня',
 'июля',
 'августа',
 'сентября',
 'октября',
 'ноября',
 'декабря'
];

const uploadStorage = function(arr){
 const json = JSON.stringify(arr);
 localStorage.usersData = json;
};

const downloadStorage = function(){
 const arr = JSON.parse(localStorage.usersData);
 return arr;
};

const addZero = function (k) {
 if (k / 10 < 1) {
     return '0' + k;
 } else {
     return k;
 }
};

function checkStr(str){
 if (str === null) {
  return 1;
 } else {
  return (str === '' || str.indexOf(' ',str.indexOf(' ')+1) !== -1 || str.indexOf(' ') === -1);
 }
}




const render = function(){
 uploadStorage(usersData);
 if (usersData.length === 0){
  localStorage.removeItem('usersData');
 } else {
  uploadStorage(usersData);
 }

 usersList.textContent = '';

 usersData.forEach(function(elem){
  const li = document.createElement('li');
  const text = 'Имя: ' + elem.fullname.slice(0, elem.fullname.indexOf(' ')) + ', Фамилия: ' + elem.fullname.slice(elem.fullname.indexOf(' ')+1,elem.fullname.length) + ', зарегистрирован: ' + elem.monthDay + ' ' + month[elem.month] + ' ' + elem.year + ' г., ' + addZero(elem.hours) + ':' + addZero(elem.minutes) + ':' + addZero(elem.seconds);
  li.classList.add('user');
  li.innerHTML = '<span class="text-user">' + text + '</span>' +
    '<div class="user-buttons">' +
    '<button class="user-remove"></button>' +
    '</div>';
  usersList.append(li);
  
  const userRemove = li.querySelector('.user-remove');
  userRemove.addEventListener('click', function(){
   if (usersData[usersData.indexOf(elem)].autorized) {
    usersData[usersData.indexOf(elem)].autorized = false;
    greetingItem.textContent = defaultGreeting;
    localStorage.removeItem('greetingText');
   }
   usersData.splice(usersData.indexOf(elem),1);
    render();
  });
 });
};

signUp.addEventListener('click', function(){

 let fullName;
 let login;
 let password;
 do {
 fullName = prompt('Введите Имя и Фамилию пользователя через пробел.');
 if (fullName !== null) {
  fullName = fullName.trim();
 }
 } while (checkStr(fullName));
 do {
  login = prompt('Введите логин.');
 } while(login === '' || login === null);
 do {
  password = prompt('Введите пароль.');
 } while(password === '' || password === null);
 let date = new Date();
 const newUser = {
  fullname: fullName,
  login: login,
  password: password,
  monthDay: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
  autorized: false
 };
 usersData.push(newUser);
 
 render();
});

signIn.addEventListener('click', function(){
 let login;
 let password;
 do {
  login = prompt('Введите логин.');
 } while(login === '' || login === null);
 do {
  password = prompt('Введите пароль.');
 } while(password === '' || password === null);
 const user = usersData.find(function(element){return element.login === login;});
 if (user) {
  if (user.password === password) {
   user.autorized = true;
   greetingItem.textContent = `Привет ${user.fullname.slice(0, user.fullname.indexOf(' '))}!`;
   localStorage.greetingText = greetingItem.textContent;
  } else {
   alert('Неверный пароль!');
  }
 } else {
  alert('Пользователь не найден!');
 }
});

if (localStorage.getItem('greetingText')) {
 greetingItem.textContent = localStorage.greetingText;
}

if (localStorage.getItem('usersData') !== null) {
 usersData = usersData.concat(downloadStorage());
 render();
} else {
 render();
}