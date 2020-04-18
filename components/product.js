eventBus = new Vue();

Vue.component('product', {
    template: `
        <div class="container product"
            :key='product.id'>
            <div class="row">
                <div class="product-img col-md-6">
                    <img :src="image"
                        class="img-thumbnail m-2 p-3"
                        alt="Oneplus handset">
                </div>
                <div class="product-description col-md-6 float-left p-5">
                    <div>
                        <span class="h3">
                            {{title}}
                        </span>
                    </div>
                    <div class="mt-2">
                        <span class="text-muted h4" v-if='variantQuantity > 10'>
                            In Stock
                        </span>
                        <span class="text-muted h4"
                            v-else-if='variantQuantity <= 10 && variantQuantity > 0'>
                            Almost sold
                        </span>
                        <span class="text-muted h4" v-else>
                            Out Of Stock
                        </span>
                    </div>
                    <div class='mt-3'>
                        <b>Shipping:</b> <span>{{shipping}}</span>
                    </div>
                    <div class="mt-4">
                        <ul v-for='detail in product.details' :key='detail'>
                            <li>{{detail}}</li>
                        </ul>
                    </div>
                    <div v-for='(variant, index) in product.variants' :key='variant.id'
                        class="m-2 d-inline-block product-variant"
                        @click='updateProduct(index)'
                        :style="{backgroundColor: variant.color}">
                    </div>
                    <div class='ml-2'>
                        <button @click='addToCart(product)'
                            class="btn"
                            :class='{"disabled-btn": variantQuantity===0,
                                "btn-outline-success": variantQuantity>0}'
                            :disabled='variantQuantity===0'
                        >
                            Add to cart
                        </button>
                    </div>
                    <hr/>
                    <div class='m-2'>
                        <review-tabs :product='product'></review-tabs>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: {
        'premium': {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            selectedVariant: 0,
            product: {
                'id': '1234',
                reviews: [],
                'name': '8 handset',
                'brand': 'Oneplus',
                'details': ['Snapdragon 865', '8GB RAM', '20MP Camera & 5MP Front-camera'],
                'variants': [{
                    'id': 203,
                    'quantity': 10,
                    'color': 'blue',
                    'image': './assets/oneplus_blue.jpg'
                }, {
                    'id': 223,
                    'quantity': 0,
                    'color': 'grey',
                    'image': './assets/oneplus_grey.jpg'
                }]
            }
        }
    },
    mounted(){
        eventBus.$on('review-submitted', this.onReviewSubmitted);
    },
    methods: {
        'addToCart': function(product) {
            eventBus.$emit('add-to-cart', product.id);
        },
        'updateProduct': function(variantIndex) {
            this.selectedVariant = variantIndex;
        },
        'onReviewSubmitted': function(review){
            this.product.reviews.push(review);
        }
    },
    computed: {
        title(){
            return this.product.brand+ ' ' + this.product.name;
        },
        image(){
            return this.product.variants[this.selectedVariant].image;
        },
        variantQuantity(){
            return this.product.variants[this.selectedVariant].quantity;
        },
        shipping(){
            return this.premium?'Free':'$2.99';
        }
    }
})