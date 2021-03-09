const myVeu = new Vue({
    el: '#myVue',
    data: {
        title: 'Hellow World',
        products: [],
        inpserch: '',
        serchProduct: [],
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        mounted() {
            this.getJson(`${API + this.cartUrl}`)
                .then(data => {
                    for (let el of data.contents) {
                        this.cartItems.push(el);
                    }
                });
            this.getJson(`${API + this.catalogUrl}`)
                .then(data => {
                    for (let el of data) {
                        this.products.push(el);
                        this.filtered.push(el);
                    }
                });
        },
        test() {
            let regexp = new RegExp(this.inpserch, 'i');
            this.serchProduct = this.products.filter(el => regexp.test(el.product_name));
        }
    }

});