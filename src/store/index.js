import Vue from 'vue'
import Vuex from 'vuex'

import users from '@/auth/modules/users'
import server from '@/auth/modules/server'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        users,
        server
    }
})
