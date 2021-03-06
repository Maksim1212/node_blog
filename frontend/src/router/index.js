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
        path: '/post/:id/edit',
        name: 'Edit',
        component: () =>
            import ('../components/EditPostItem.vue')

    },
    {
        path: '/create',
        name: 'Create',
        component: () =>
            import ('../components/CreatePostItem.vue'),
    },
    {
        path: '/posts/:id',
        name: 'Group',
        component: () =>
            import ('../components/GroupPosts.vue')

    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import ('../components/Account.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../components/Register.vue'),
    },
    {
        path: '/update/password',
        name: 'Settings',
        component: () =>
            import ('../components/Settings.vue'),
    },
    {
        path: '/post/:id/comment',
        name: 'Comment',
        component: () =>
            import ('../components/CreateComment.vue')

    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;