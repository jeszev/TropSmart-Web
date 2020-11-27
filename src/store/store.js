import Vue from "vue";
import Vuex from "vues";
import http from "../http-common";

import User from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        filter: 'all',
        todos: []
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        retrieveToken(state, token) {
            state.token = token

        }
    },
    actions: {
        retrieveToken(context, credentials) {
            http.post(`/api/authentication/sign-in/`, {
                username: credentials.email,
                password: credentials.password
            })
            .then(response => {
                const token = response.resource.token
                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    modules: {
        user: User
    }
});