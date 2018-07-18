let app = new Vue({
    el: '#app',
    data: {
        certList: []
    },
    methods: {
        get: function () {
            this.$http.get('/getCertList')
                .then(function (res) {
                    console.log(res.data);
                    this.certList = res.data;
                }, function (err) {
                    console.log(err.status)
                });
        }
    },
    mounted() {
        this.get();
    }
})
