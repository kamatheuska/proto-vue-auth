<template>
    <main class="Dashboard">
        <div class="Dashboard__controls">
            <h1>Vue Auth Components</h1><br>
            <div class="container__buttons">
                <button class="Auth__button" @click="toggleLogin">Login</button>
                <button class="Auth__button" @click="logoutUser">Logout</button>
                <button class="Auth__button" @click="toggleSignup">Signup</button>
            </div>
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
import Login from '@/auth/Login'
import Signup from '@/auth/Signup'

import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'

import {
    TOGGLE_LOGIN,
    TOGGLE_SIGNUP
} from '@/auth/mutation-types'

export default {
    name: 'app-dash',
    data () {
        return {}
    },
    components: { Login, Signup },
    computed: {
        ...mapState('server', ['server', 'showLogin', 'showSignup']),
        ...mapGetters('users', ['isUserAuthenticated'])
    },
    methods: {
        ...mapActions('users', ['logoutUser']),

        toggleLogin () {
            this.$store.commit(`server/${TOGGLE_LOGIN}`)
        },

        toggleSignup () {
            this.$store.commit(`server/${TOGGLE_SIGNUP}`)
        }
    }
}
</script>

<style scoped>
.Dashboard {
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.Dashboard__controls {
    width: 50%;
    min-width: 400px;
}
.Dashboard__controls h1 {
    text-align: center;
}
.Dashboard__status {
    color: #aaa
}
.Dashboard__status em {
    color:black;
    margin-left: 1rem;
}
.container__buttons {
    display: flex;
    justify-content: space-evenly;
}
</style>
