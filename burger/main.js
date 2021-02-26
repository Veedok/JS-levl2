function burger() {
    let burger = new MyBurger('size', 'additive', 'add');
            console.log(burger);
            burger.showSum('#price', '#cal');
}
class BurgerP {
    constructor(elem) {
        this.price = +elem.dataset['p'];
        this.call = +elem.dataset['ccal'];
    }
}
class MyBurger {
    constructor(size, additive, add) {
        this.size = new BurgerP(this._select(size));
        this.additive = new BurgerP(this._select(additive));
        this.add = this._getToppings(add);
    }
    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => result.push(new BurgerP(el)));
        return result;
    }

    _selectAll(name) {
        return document.querySelectorAll(`input[name="${name}"]:checked`);
    }

    _sumPrice() {
        let result = this.size.price + this.additive.price;
        this.add.forEach(topping => result += topping.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.call + this.additive.call;
        this.add.forEach(topping => result += topping.call);
        return result;
    }

    showSum(price, cal){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(cal).textContent = this._sumCalories();
    }
}