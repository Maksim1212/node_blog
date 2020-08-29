/* eslint-disable */
import axios from "axios"

export default {
    state: {
        user: [],
        name: [],
    },
    mutations: {
        SET_USER_TO_STATE: (state, user) => {
            state.user = user;
        },
        SET_USER_NAME_TO_STATE: (state, name) => {
            state.name = name;
        },
    },
    actions: {
        LOGIN_USER(ctx, data) {
            return axios('http://127.0.0.1:3000/v1/auth/login', {
                    method: "POST",
                    data: {
                        'email': data.email,
                        'password': data.password,
                    },
                })
                .then((user) => {
                    ctx.commit('SET_USER_TO_STATE', user);
                    return user.data;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        REGISTER_USER(ctx, data) {
            return axios('http://127.0.0.1:3000/v1/auth/createUser', {
                    method: "POST",
                    data: {
                        'email': data.email,
                        'password': data.password,
                        'name': data.name,
                    },
                })
                .then((user) => {
                    ctx.commit('SET_USER_TO_STATE', user);
                    return user.data;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        FIND_USER(ctx, id) {
            return axios(`http://127.0.0.1:3000/v1/auth/user/${id}`, {
                    method: "GET",
                })
                .then((name) => {
                    ctx.commit('SET_USER_NAME_TO_STATE', name.data.name);
                    return name;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
    },
    getters: {
        USER(state) {
            return state.user
        },
        NAME(state) {
            return state.name
        },
    },

}
