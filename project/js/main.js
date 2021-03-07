const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
  constructor(url, wraper, list = listContext) {
    this.wraper = wraper;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = [];
    this._init();
  }
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }
  handleData(data) {
    this.goods = [...data];
    this.render();
  }
  calcSum() {
    return this.allProducts.reduce((accum, item) => accum + item.price, 0);
  }
  render() {
    const block = document.querySelector(this.wraper);
    for (let product of this.goods) {
      const productObj = new this.list[this.constructor.name](product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
  filter(value) {
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      if (!this.filtered.includes(el)) {
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }
  _init() {
    return false
  }
}
class Item{
  constructor(el, img = 'https://placehold.it/200x150'){
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render(){
    return ``;
  }
}
class ProductsList extends List{
  constructor(cart, container = '.products', url = "/catalogData.json"){
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  _init(){
    document.querySelector(this.wraper).addEventListener('click', e => {
      if(e.target.classList.contains('buy-btn')){
        this.cart.addProduct(e.target);
      }
    });
  }
}
class ProductItem extends Item{
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

class Cart extends List{
  constructor(container = ".cart-block", url = "/getBasket.json"){
    super(url, container);
    
  }

  /**
   * добавление товара
   * @param element
   */
  addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){
            find.quantity--;
            this._updateCart(find);
          } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }
  _init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.wraper).classList.toggle('invisible');
    });
    document.querySelector(this.wraper).addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')){
        this.removeProduct(e.target);
      }
    })
  }

}

class CartItem extends Item{
  constructor(el, img = 'https://placehold.it/50x100'){
    super(el, img);
    this.quantity = el.quantity;
  }
  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}

const listContext = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);














// class ProductList {
//   #goods;
//   #allProducts;

//   constructor(container = '.products') {
//     this.container = container;
//     this.#goods = [];
//     this.#allProducts = [];
//     this.#fetchGoods();
//   }

//   #fetchGoods() {
//     const prom = (url, fileName) => {
//       return new Promise ((resolve, reject) => {
//         if (url) resolve(url + fileName);
//         else reject('Ошибка!');
//       });
//   }
//   prom(API, "/catalogData.json").then((data) => {
//     let request = new XMLHttpRequest();
//     request.open('GET', data, true);
//     request.responseType = 'json';
//     request.send();
//     request.onload = () => {
//       let obj = request.response;      
//       this.#goods = obj;
//       this.#render(obj);
//           }
//   }).catch((err) => {
//     console.log(err)
//   });


//   }

//   #render(i) {
//     const block = document.querySelector(this.container);
//     this.#goods.forEach((product) => {
//       const productObject = new ProductItem(product);
//       this.#allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());     
//     });
//     block.addEventListener('click', function my(params) {
//      if(params.target.classList.contains('by-btn')){
//        const mybass = document.querySelector('.bass');
//        console.log(i)
//        let byProd = +params.target.parentNode.dataset['id'];
//        let objBas = i.find(i => i.id_product=== byProd)
//        let myProduct = new BasketListAdd(objBas);
//        mybass.insertAdjacentHTML('beforeend', myProduct.renderbasket());

//      };
//      const basketBlock = document.querySelector('.bass');
//      basketBlock.addEventListener('click', function dellbas(params) {
//       if(params.target.parentNode.classList.contains('del')) {
//         params.target.parentNode.parentNode.remove();
//       } else if (params.target.classList.contains('del')) {
//         params.target.parentNode.remove();
//       }
//      })

//     })
//   }

// }
// class ProductItem {
//   constructor(product, img='https://placehold.it/200x150') {
//     this.title = product.product_name;
//     this.price = product.price;
//     this.id = product.id_product;
//     this.img = img;
//   }

//   render() {
//     return `<div class="product-item" data-id="${this.id}">
//          <h3>${this.title}</h3>
//          <img src="${this.img}" alt="Some img">
//          <p>${this.price}</p>
//          <button class="by-btn">Добавить в корзину</button>
//        </div>`;
//   }
// }

// const productList = new ProductList();


// class BasketListAdd extends ProductItem {
//   constructor(product) {
//     super(product);
//   }
//   renderbasket() {
//    return `<div class="bas-item" data-id="${this.id}">         
//          <img src="${this.img}" alt="Some img">
//          <h3>${this.title}</h3>
//          <p>${this.price}</p>
//          <button class="del"><i class="fas fa-times-circle"></i></button>
//        </div>`;
//   }

// }
// class BasketListRem {

// }
// class BasketItem {

// }
// class BasketTotalPrise {

// }