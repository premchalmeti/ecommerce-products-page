Vue.component('navbar', {
    template: `
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container">
                <a href="#" class="navbar-brand">
                    <img src='./icons/favicon-white.ico' alt='Company logo' width='45px'
                        class='mr-3'
                    >
                    XYZ electronics
                </a>
                <button class='navbar-toggler' type='button' data-toggle='collapse'
                    data-target='#nav-controls'
                >
                    <span class="navbar-toggle-icon"></span>
                </button>
                <div id='collapse navbar-collapse'>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="nav-link text-white">Cart ({{cart.length}})</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
    data(){
        return {
            cart: []
        }
    },
    mounted(){
        eventBus.$on('add-to-cart', (productId) => {
            this.cart.push(productId);
        });
    }
})
