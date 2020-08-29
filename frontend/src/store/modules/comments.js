/* eslint-disable */
import axios from "axios"

export default {
    state: {
        comments: []
    },
    mutations: {
        SET_COMMENT_TO_STATE: (state, comments) => {
            state.comments = comments;
        }
    },
    actions: {
        GET_COMMENT_ITEMS_BY_ID_FROM_API(ctx, id) {
            return axios(`http://127.0.0.1:3000/comments/${id}`, {
                    method: "GET",
                })
                .then((comments) => {
                    ctx.commit('SET_COMMENT_TO_STATE', comments.data.comments);
                    return comments;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },

        CREATE_COMMENT_ITEM(ctx, data) {
            return axios('http://127.0.0.1:3000/comments/create', {
                    method: "POST",
                    data: {
                        'body': data.body,
                        'author_id': data.author_id,
                        'post_id': data.post_id,
                    }
                })
                .then((comments) => {
                    ctx.commit('SET_COMMENT_TO_STATE', comments.data);

                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
        ADD_LIKE_FOR_COMMENT_ITEM(ctx, data) {
            return axios('http://127.0.0.1:3000/comments/like', {
                    method: "PUT",
                    data: {
                        'comment_id': data.comment_id,
                        'user_id': data.user_id,
                    }
                })
                .then((comments) => {
                    ctx.commit('SET_COMMENT_TO_STATE', comments.data);

                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        },
    },
    getters: {
        COMMENTS(state) {
            return state.comments
        }
    },

}
