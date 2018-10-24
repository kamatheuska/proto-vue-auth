<template>
    <main class="Dashboard container__main">
        <div>
            <h1>Hello</h1><br>
            <button class="button" @click="toggleLogin">Login</button>
            <button class="button" @click="logoutUser">Logout</button>
            <button class="button" @click="toggleSignup">Signup</button>
            <br>
            <br>
            <hr>
            <h4 class="Dashboard__status"><strong>AUTH STATUS: </strong>
                <em>{{ server.auth.message }}</em>
            </h4>
            <h4 class="Dashboard__status"><strong>SIGNUP STATUS:</strong>
                <em>{{ server.register.message }}</em>
            </h4>
            <h4 class="Dashboard__status"><strong>IS AUTHENTICATED? :</strong>
                <em>{{ isUserAuthenticated }}</em>
            </h4>
        </div>
        <Login v-if="!isUserAuthenticated && showLogin" />
        <Signup v-if="!isUserAuthenticated && showSignup" />
    </main>
</template>

<script>
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'

import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'app-dash',
    data () {
        return {
            showLogin: false,
            showSignup: false
        }
    },
    components: {
        Login,
        Signup
    },
    computed: {
        ...mapState(['server']),
        ...mapGetters('users', ['isUserAuthenticated'])
    },
    methods: {
        ...mapActions('users', ['logoutUser']),

        toggleLogin () {
            this.showSignup = false
            this.showLogin = !this.showLogin
        },

        toggleSignup () {
            this.showLogin = false
            this.showSignup = !this.showSignup
        }
    }
}
</script>

<style scoped>
.Dashboard__status {
    color: #aaa
}
.Dashboard__status em {
    color:black;
    margin-left: 1rem;
}
</style>
