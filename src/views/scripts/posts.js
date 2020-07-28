/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
// Vue.config.errorHandler = function(err, vm, info) {
//     console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
    el: '#app',
    data() {
        return {
            userComponentKey: 1,
            counter: 0,
            body: '',
            title: '',
            postId: '',
            index: '',
            titles: [],
            bodies: [],
            resData: [],
            posts: [],
            dataMessage: '',
        };
    },
    methods: {
        async findAll() {
            const res = await axios.get('/posts/data', {});

            for (let i = 0; i <= res.data.length; i += 1) {
                this.titles.push(res.data[i].title);
                this.bodies.push(res.data[i].body);
                this.posts.push(res.data[i]);
            }
        },
        async addPost() {
            const res = await axios.post('/posts/', { body: `${this.body}`, title: `${this.title}` });
            if (res.status === 200) {
                this.dataMessage = 'user added successfully';
                this.posts = [];
                this.title = '';
                this.body = '';
                this.findAll();
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else {
                this.dataMessage = res.data.message[0].message;
            }

        },
        async updatePost() {
            const res = await axios.post('/posts?_method=PUT', { id: `${this.postId}`, title: `${this.title}`, body: `${this.body}` });
            if (res.status === 200) {
                this.posts = [];
                this.title = '';
                this.postId = '';
                this.findAll();
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else { this.dataMessage = res.data.message[0].message; }
        },
        async deletePost() {
            const res = await axios.post('/posts?_method=DELETE', { id: `${this.postId}` });
            if (res.status === 200) {
                this.posts = [];
                this.findAll();
                this.postId = '';
                this.title = '';
                this.dataMessage = res.data.message;
            } else if (res.status === 202) {
                this.dataMessage = res.data.message;
            } else {
                this.dataMessage = res.data.message[0].message;
            }
        },
    },
    async mounted() {
        const res = await axios.get('/posts/data', {});

        for (let i = 0; i <= res.data.length; i += 1) {
            this.titles.push(res.data[i].title);
            this.bodies.push(res.data[i].body);
            this.posts.push(res.data[i]);
        }
        this.$forceUpdate();
    },
});
