Vue.component('product-review', {
    template: `
        <div class="jumbotron" style="max-width: 450px;">
            <div v-if='errors.length'>
                Please correct the following error(s)
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </div>
            <form @submit.prevent='onSubmit'>
                <div class="form-group">
                    <label for="name">Your name</label>
                    <input type="text" v-model='name'
                        class="form-control" id='name' name='name'>
                </div>
                <div class="form-group">
                    <label for="review">Type review</label>
                    <textarea type="text" class="form-control" id='review'
                        v-model='review'
                        name='review'>
                    </textarea>
                </div>
                <div class="form-group">
                    <select id='rating' name='rating' v-model.number='rating'
                        class='form-control'
                    >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>
    `,
    data() {
        return {
            errors: [],
            name: '',
            review: '',
            rating: ''
        }
    },
    methods: {
        onSubmit: function() {
            this.errors = [];
            if(!this.name) this.errors.push('Name is required');
            if(!this.review) this.errors.push('Review is required');
            if(!this.rating) this.errors.push('Rating is required');

            if(this.errors.length === 0) {
                eventBus.$emit('review-submitted', {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                })
                this.name = null;
                this.review = null;
                this.rating = null;
            }
        }
    }
})