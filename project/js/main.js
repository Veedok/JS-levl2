const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];
    this.#fetchGoods();
  }

  #fetchGoods() {
    const prom = (url, fileName) => {
      return new Promise ((resolve, reject) => {
        if (url) resolve(url + fileName);
        else reject('Ошибка!');
      });
  }
  prom(API, "/catalogData.json").then((data) => {
    let request = new XMLHttpRequest();
    request.open('GET', data, true);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      let obj = request.response;      
      this.#goods = obj;
      this.#render(obj);
          }
  }).catch((err) => {
    console.log(err)
  });


  }

  #render(i) {
    const block = document.querySelector(this.container);
    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());     
    });
    block.addEventListener('click', function my(params) {
     if(params.target.classList.contains('by-btn')){
       const mybass = document.querySelector('.bass');
       console.log(i)
       let byProd = +params.target.parentNode.dataset['id'];
       let objBas = i.find(i => i.id_product=== byProd)
       let myProduct = new BasketListAdd(objBas);
       mybass.insertAdjacentHTML('beforeend', myProduct.renderbasket());

     };
     const basketBlock = document.querySelector('.bass');
     basketBlock.addEventListener('click', function dellbas(params) {
      if(params.target.parentNode.classList.contains('del')) {
        params.target.parentNode.parentNode.remove();
      } else if (params.target.classList.contains('del')) {
        params.target.parentNode.remove();
      }
     })
      
    })
  }
 
}
class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
         <h3>${this.title}</h3>
         <img src="${this.img}" alt="Some img">
         <p>${this.price}</p>
         <button class="by-btn">Добавить в корзину</button>
       </div>`;
  }
}

const productList = new ProductList();


class BasketListAdd extends ProductItem {
  constructor(product) {
    super(product);
  }
  renderbasket() {
   return `<div class="bas-item" data-id="${this.id}">         
         <img src="${this.img}" alt="Some img">
         <h3>${this.title}</h3>
         <p>${this.price}</p>
         <button class="del"><i class="fas fa-times-circle"></i></button>
       </div>`;
  }

}
class BasketListRem {

}
class BasketItem {

}
class BasketTotalPrise {

}