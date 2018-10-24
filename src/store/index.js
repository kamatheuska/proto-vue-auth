import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
    CHANGE_SERVER_AUTH_STATUS,
    SET_SERVER_AUTH_MESSAGE,
    CHANGE_SERVER_REGISTRATION_STATUS,
    SET_SERVER_REGISTRATION_MESSAGE
} from '@/store/mutation-types'

import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        server: {
            auth: {
                status: 0,
                message: ''
            },
            register: {
                status: 0,
                message: ''
            }
        }
    },
    getters: {

    },
    mutations: {
        [CHANGE_SERVER_AUTH_STATUS] ({ server }, status) {
            server.auth.status = status
        },
        [SET_SERVER_AUTH_MESSAGE] ({ server }, message) {
            server.auth.message = message
        },
        [CHANGE_SERVER_REGISTRATION_STATUS] ({ server }, status) {
            server.register = status
        },
        [SET_SERVER_REGISTRATION_MESSAGE] ({ server }, message) {
            server.register.message = message
        }
    },
    actions: {
        requestApi (state, { service, payload }) {
            axios.defaults.headers.common['x-auth'] =
                localStorage.getItem('user-token')
            switch (service) {
                case 'login':
                    return axios.create()
                        .post('/users/login', payload)

                case 'signup':
                    return axios.create()
                        .post('/users', payload)

                case 'logout':
                    return axios.create()
                        .delete('/users/me/token', {
                            headers: {
                                'x-auth': payload
                            }
                        })

                case 'userData':
                    return axios.create()
                        .get('/users/me', {
                            headers: {
                                'x-auth': payload
                            }
                        })
            }
        }
    },
    modules: {
        users
    }
})
