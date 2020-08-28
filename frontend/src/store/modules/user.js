/* eslint-disable */
import axios from "axios"

export default {
    state: {
        user: []
    },
    mutations: {
        SET_USER_TO_STATE: (state, user) => {
            state.user = user;
        }
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
    },
    getters: {
        USER(state) {
            return state.user
        }
    },

}
