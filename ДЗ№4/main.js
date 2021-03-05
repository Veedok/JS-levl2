function q1() {
    let text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`
    let newText = text.replaceAll('\'', '\"');
    console.log(newText);
}

function q2() {
    let text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`
    let reg = new RegExp(/\'\B/g);
    let reg2 = new RegExp(/\B\'/g);
    let newText = text.replaceAll(reg, '"');
    newText = newText.replaceAll(reg2, '"');
    console.log(newText);
}

// Задание с формой
class Myclass  {
    constructor(param){
        this.neme = param.target.id;
        this.str = param.target.value;
        this.class = param.target.classList;
        this.ok = `<i class="far fa-check-circle"></i>`;
        this.expAll = {
            name: new RegExp(/^[a-zа-яё]{3,20}$/i),
            phone: new RegExp (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/),
            mail: new RegExp (/^\S+@mail.ru$/i)
        }   
        this.err = {
            name: "Имя дожно состоять только из букв и иметь длину от 3 до 20 символов",
            phone: "Тедлефон должен быть введен в формате '80000000000'",
            mail: 'Эмейл должен быть с окончанием "@mail.ru"'
        }

    }
    chek(reg,string, err) {
        string.replace('[-()]', '')
        if (reg.test(string)) {
            reg.lastIndex = 0;
            this.class.add('green');
            this.class.remove('red');
            document.querySelector(`#s${this.neme}`).innerHTML = this.ok;
        } else {
            reg.lastIndex = 0;
            this.class.add('red');
            this.class.remove('green');
            document.querySelector(`#s${this.neme}`).innerHTML = err;

        }
    }
}

let form = document.querySelector('form');

form.addEventListener('input', function (inputsub) {
   let myObj = new Myclass(inputsub);
   console.log(myObj.expAll[myObj.neme]);
    myObj.chek(myObj.expAll[myObj.neme], myObj.str, myObj.err[myObj.neme])

})
