Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(name){
            let regexp = new RegExp(name, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products product_catalog">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `


            <a href="#">
                        <div class="catalog_card">
                            <div class="item_mask item_mask_product">
                                    <div class="buy_item"><img src="img/cart.png" alt=""><span>Add to Cart</span></div>
                                </div>
                            <img src="img/Product/image_placeholder_1657.jpg" alt="">
                            <p class="catalog_text">{{product.product_name}}</p>
                            <p class="catalog_price">{{product.price}}</p>
                        </div>
                    </a>
    `
});
