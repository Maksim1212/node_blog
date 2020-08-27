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
            times: [],
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
                s
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
        const res = await axios.get('/posts/', {});
        console.log(query);
        let creationDates = [];
        let creationTimes = [];
        // console.log(this.times);
        console.log(this.posts);
        for (let i = 0; i <= res.data.length; i += 1) {
            this.titles.push(res.data[i].title);
            this.bodies.push(res.data[i].body);
            creationDates.push(res.data[i].creation_time.split('T')[0]);
            creationTimes.push(res.data[i].creation_time.split('T')[1].split('.')[0]);
            this.times.push(res.data[i].creation_time);
            this.posts.push({
                body: res.data[i].body,
                creation_date: creationDates[i],
                title: res.data[i].title,
                _id: res.data[i]._id,
                creation_time: creationTimes[i],


            });
        }
        let timm = this.times.map(time => { return time })
        console.log(timm);
        this.$forceUpdate();
    },
});
