/* eslint-disable */
import axios from "axios"

export default {
    state: {
        posts: []
    },
    mutations: {
        SET_POSTS_TO_STATE: (state, posts) => {
            state.posts = posts;
        }
    },
    actions: {
        GET_POSTS_FROM_API({ commit }) {
            return axios('http://127.0.0.1:3000/posts', {
                    method: "GET"
                })
                .then((posts) => {
                    commit('SET_POSTS_TO_STATE', posts.data);
                    return posts;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        GET_POST_ITEM_BY_ID_FROM_API(ctx, id) {
            return axios(`http://127.0.0.1:3000/posts/${id}`, {
                    method: "GET",
                })
                .then((post) => {
                    ctx.commit('SET_POSTS_TO_STATE', post.data.post);
                    return post;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        GET_POSTS_BY_USER_ID(ctx, id) {
            return axios(`http://127.0.0.1:3000/posts/user/${id}`, {
                    method: "GET",
                })
                .then((posts) => {
                    ctx.commit('SET_POSTS_TO_STATE', posts.data.data);
                    return posts;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },

        CREATE_POST_ITEM(ctx, data) {
            return axios('http://127.0.0.1:3000/posts/create', {
                    method: "POST",
                    // headers: {
                    //     'x-access-token': data.token,
                    // },
                    data: {
                        'title': data.title,
                        'body': data.body,
                        'author_id': data.author_id,
                        'author_name': data.author_name,
                    }
                })
                .then((posts) => {
                    ctx.commit('SET_POSTS_TO_STATE', posts.data);

                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        UPDATE_POST_ITEM_BY_ID_FROM_API(ctx, data) {
            return axios('http://127.0.0.1:3000/posts/update', {
                    method: "PUT",
                    // headers: {
                    //     'x-access-token': data.token,
                    // },
                    data: {
                        'title': data.title,
                        'body': data.body,
                        'id': data.id,
                    },
                })
                .then((post) => {
                    ctx.commit('SET_POSTS_TO_STATE', post.data);
                    return post;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        ADD_LIKE_FOR_POST_ITEM(ctx, data) {
            return axios('http://127.0.0.1:3000/posts/like', {
                    method: "PUT",
                    // headers: {
                    //     'x-access-token': data.token,
                    // },
                    data: {
                        'post_id': data.post_id,
                        'user_id': data.user_id,
                    }
                })
                .then((posts) => {
                    ctx.commit('SET_POSTS_TO_STATE', posts.data);

                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
    },
    getters: {
        POSTS(state) {
            return state.posts
        }
    },

}