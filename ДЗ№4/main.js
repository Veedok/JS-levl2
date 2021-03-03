// btn.removeAttribute('disabled');
//     inpName.classList.add('green');

let ok = `<i class="far fa-check-circle"></i>`;
let reg3 = new RegExp(/[a-zа-яё]{3,20}/ig);

let inpName = document.querySelector('#name');
let phone = document.querySelector('#phone');
let mail = document.querySelector('#mail');
let btn = document.querySelector('#btn');
inpName.addEventListener('input',  function () {
    if (reg3.test(inpName.value)) {
        
        inpName.classList.add('green');
        inpName.classList.remove('red');
        document.querySelector('#sName').innerHTML = ok;
    } else {
        
        inpName.classList.add('red');
        inpName.classList.remove('green');
        document.querySelector('#sName').innerHTML = "Имя дожно состоять только из букв и иметь длину от 3 до 20 символов";
    }
    
})