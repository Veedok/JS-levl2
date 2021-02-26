const products = [{
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

// const renderProduct = (title = 'not in stock', price = 'N/A', img) => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <img class="productIMG" src=${img} alt="">
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// }

// const renderProducts = (list) => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price, item.img);
//     });

//     console.log(productList);
//     document.querySelector('.products').innerHTML = productList;
// }

// renderProducts(products);

products.forEach(function (elem) {
    if (elem.title == undefined || elem.price == undefined || elem.img == undefined) {
        return true;
    } else {
        let newProduct = `<div class="product-item">
    <h3>${elem.title}</h3>
    <p>${elem.price}</p>
    <img class="productIMG" src=${elem.img} alt="imgProduct">
    <button class="by-btn">Добавить в корзину</button>
  </div>`;
        document.querySelector('.products').insertAdjacentHTML('beforeend', newProduct);
    }
});