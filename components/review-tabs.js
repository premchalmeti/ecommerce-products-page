Vue.component('review-tabs', {
    props: ['product'],
    template: `
        <div>
            <ul class='nav nav-tabs'>
                <li class='nav-item' v-for='tab, index in tabs' :key='index'
                    @click='activeTab=tab'>
                    <a href='#' class='nav-link'
                        :class="{'active':activeTab===tab}">
                        {{tab}}
                    </a>
                </li>
            </ul>
            <div v-show='activeTab==="Reviews"' class='mt-2'>
                <span v-show='product.reviews.length==0'>
                    No reviews added
                </span>
                <ul v-show='product.reviews.length>0'>
                    <li v-for='review in product.reviews'>
                        {{review.review}} by {{review.name}}
                    </li>
                </ul>
            </div>
            <product-review v-show='activeTab==="Make a review"' class='mt-2'>
            </product-review>
        </div>
    `,
    data(){
        return {
            activeTab: 'Reviews',
            tabs: ['Reviews', 'Make a review']
        }
    }
})