const API = 'https://raw.githubusercontent.com/Veedok/JS-levl2/Dev1/projectFinal/Shop';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

