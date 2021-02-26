class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];
    this.#fetchGoods();
    this.#render();
    this.mydias();
  }

  #fetchGoods() {
    this.#goods = [{
        id: 1,
        title: 'Notebook',
        price: 20000,
        img: 'https://placeimg.com/1000/1000/animals'
      },
      {
        id: 2,
        title: 'Mouse',
        price: 1500,
        img: 'https://placeimg.com/1000/1000/arch'
      },
      {
        id: 3,
        title: 'Keyboard',
        price: 5000,
        img: 'https://placeimg.com/1000/1000/nature'
      },
      {
        id: 4,
        title: 'Gamepad',
        price: 4500,
        img: 'https://placeimg.com/1000/1000/tech'
      },
      {
        id: 5,
        title: 'Monitor',
        price: 15000,
        img: 'https://placeimg.com/1000/1000/people'
      },
      {
        id: 6,
        title: 'Speakers',
        price: 5000,
        img: 'https://placeimg.com/1000/1000/grayscale'
      },
      {
        id: 7,
        title: 'Headphones',
        price: 2000,
        img: 'https://placeimg.com/1000/1000/sepia'
      },
      {
        id: 8,
        title: 'Microphone',
        price: 500,
        img: 'https://placeimg.com/1000/1000/tech'
      },
    ];
  }

  #render() {
    const block = document.querySelector(this.container);
    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());      
    });
  }
  #totalPrice(priseObj) {
    let sum = 0;
    priseObj.forEach((del) => {
      sum += del.price;
    })
    return sum;
  }
  #getTotalWithDiscount(discount, totalPriseObj) {
    return this.#totalPrice(totalPriseObj) * discount;
  }
  mydias() {
    console.log(this.#getTotalWithDiscount(0.1, this.#goods));
  }
}
class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
         <h3>${this.title}</h3>
         <p>${this.price}</p>
         <img class="productIMG" src=${this.img} alt="imgProduct">
         <button class="by-btn">Добавить в корзину</button>
       </div>`;
  }
}

const productList = new ProductList();


class BasketListAdd {

}
class BasketListRem {

}
class BasketItem {

}
class BasketTotalPrise {

}