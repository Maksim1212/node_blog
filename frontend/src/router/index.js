/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/post/:id',
        name: 'Read',
        component: () =>
            import ('../components/Post.vue'),
    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import ('../components/Account.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
