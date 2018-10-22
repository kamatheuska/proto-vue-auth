import {
    UPDATE_USER_PROPS,
    SET_USER_TOKEN,
    SET_USER_AUTH,
    CHANGE_SERVER_AUTH_STATUS,
    REMOVE_USER_TOKEN,
    REMOVE_USER_AUTH,
    REMOVE_CREDENTIALS,
    // CHANGE_SERVER_REGISTER_STATUS,
    SET_SERVER_AUTH_MESSAGE,
    // SET_SERVER_REGISTER_MESSAGE,
    SET_USER_ERROR
} from '@/store/mutation-types'

const state = {
    user: {
        name: '',
        email: 'test3@example.com',
        credentials: {
            password: '123123123',
            token: ''
        },
        auth: {
            status: false,
            isAuthenticated: !!localStorage.getItem('user-token'),
            error: false
        },
        registration: {
            status: false,
            error: false
        }
    }
}

const getters = {
    getCredentials: ({ user }) => {
        return {
            email: user.email,
            password: user.credentials.password
        }
    },
    getUserToken: ({ user }) => user.credentials.token,
    isUserAuthenticated: ({ user }) => user.auth.isAuthenticated
/*     authStatus: state => state.status,
    getCurrentUser: state =>
        state.current.filter((user) => user.isAuthenticated),
    getUserModel: state => _.cloneDeep(state.userModel),
    registrationError: state => state.authErrors.registration,
    loginError: state => state.authErrors.login */
}

const mutations = {
    [UPDATE_USER_PROPS] ({ user }, payload) {
        switch (payload.type) {
            case 'email':
                user.email = payload.value
                break
            case 'password':
                user.credentials.password = payload.value
                break
        }
    },
    [SET_USER_TOKEN] ({ user }, response) {
        if (response) {
            let token = response.headers['x-auth']
            localStorage.setItem('user-token', token)
            user.credentials.token = token
        } else {
            user.credentials.token = localStorage.getItem('user-token')
        }
    },
    [REMOVE_USER_TOKEN]: ({ user }) => {
        localStorage.removeItem('user-token')
        user.credentials.token = null
    },
    [REMOVE_CREDENTIALS]: ({ user }) => {
        user.email = ''
        user.credentials.password = ''
    },
    [SET_USER_AUTH] ({ user }, status = 'success') {
        user.auth.status = status
        user.auth.isAuthenticated = true
        user.auth.error = false
    },
    [REMOVE_USER_AUTH] ({ user }, status = 'success') {
        user.auth.status = status
        user.auth.isAuthenticated = false
        user.auth.error = false
    },
    [SET_USER_ERROR] ({ user }, errorType = 'auth') {
        switch (errorType) {
            case 'auth':
                user.auth.status = 'error'
                user.auth.error = true
                break
            case 'registration':
                user.registration.status = 'error'
                user.registration.error = true
                break
        }
    }
}

const actions = {
    loginUser ({ getters, dispatch }) {
        if (getters.isUserAuthenticated) {
            console.log('LOGIN NOT FIRED\n')
            return
        }
        let credentials = getters.getCredentials
        let config = { service: 'login', payload: credentials }
        return new Promise((resolve, reject) =>
            dispatch('requestApi', config, { root: true })
                .then((response) => {
                    dispatch('handleLoginSucces', { response })
                    resolve(response)
                })
                .catch((error) => {
                    dispatch('handleLoginFailure')
                    reject(error)
                }))
    },

    logoutUser ({ dispatch, getters }) {
        let token = getters.getUserToken
        if (!token && !getters.isUserAuthenticated) {
            return
        } else if (!token) {
            dispatch('handleLogoutFailure')
            return
        }
        let config = { service: 'logout', payload: token }
        return new Promise((resolve, reject) => {
            dispatch('requestApi', config, { root: true })
                .then((response) => {
                    dispatch('handleLogoutSucces', { response })
                    resolve(response)
                })
                .catch((error) => {
                    dispatch('handleLogoutFailure')
                    reject(error)
                })
        })
    },

    handleLoginSucces ({ commit }, { response }) {
        commit(SET_USER_TOKEN, response)
        commit(SET_USER_AUTH)
        commit(CHANGE_SERVER_AUTH_STATUS,
            response.status, { root: true })
        commit(SET_SERVER_AUTH_MESSAGE,
            'Login succesful.', { root: true })
    },

    handleLoginFailure ({ commit }) {
        commit(SET_USER_ERROR)
        commit(CHANGE_SERVER_AUTH_STATUS,
            400, { root: true })
        commit(SET_SERVER_AUTH_MESSAGE,
            'Error on login.', { root: true })
    },

    handleLogoutSucces ({ commit }, { response }) {
        commit(REMOVE_USER_TOKEN)
        commit(REMOVE_USER_AUTH)
        commit(CHANGE_SERVER_AUTH_STATUS,
            response.status, { root: true })
        commit(SET_SERVER_AUTH_MESSAGE,
            'Logout succesful.', { root: true })
    },

    handleLogoutFailure ({ commit }) {
        commit(REMOVE_USER_TOKEN)
        commit(REMOVE_USER_AUTH)
        commit(SET_USER_ERROR)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
