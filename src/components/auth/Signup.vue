<template>
    <div class="Login">
        <transition name="fade">
            <div>
                <slot name="welcomeMessage">
                    <h2>¡Bienvenido!</h2>
                </slot>
                <input
                    type="email"
                    v-model="email"
                    placeholder="Email Address">
                <input
                    type="password"
                    v-model="password"
                    placeholder="Password">
                <input
                    type="password"
                    v-model="passwordConfirmation"
                    @keyup.enter="handleLogin()"
                    placeholder="Password">
                <button class="Home__button button"
                    @click="handleLogin()">
                    <slot>Ingresar</slot>
                </button>
                <h5>{{ server.auth.message }}</h5>
                <slot name="isRegistered">
                    <h4>No estás registrado?</h4>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { UPDATE_USER_PROPS } from '@/store/mutation-types'

export default {
    name: 'sign-up-app',
    data () {
        return {
            passwordConfirmation: '',
            passwordMatch: true
        }
    },
    computed: {
        ...mapState('users', [ 'user' ]),
        ...mapState([ 'server' ]),
        ...mapGetters('users', [ 'auth' ]),

        email: {
            get () {
                return this.user.email
            },
            set (email) {
                this.$store.commit(`users/${UPDATE_USER_PROPS}`, {
                    type: 'email',
                    value: email
                })
            }
        },

        password: {
            get () {
                return this.user.credentials.password
            },
            set (password) {
                this.$store.commit(`users/${UPDATE_USER_PROPS}`, {
                    type: 'password',
                    value: password
                })
            }
        }
    },
    methods: {
        ...mapActions('users', [ 'registerUser' ]),

        sendRegistrationRequest () {
            if (this.password !== this.passwordConfirmation) {
                this.passwordMatch = false
                return
            }
            this.passwordMatch = true
            this.registerUser()
                .then((res) => {
                })
                .catch((error) => console.error('ERROR handleLogin\n', error))
        },

        changeRegistrationStatus (goToRegister) {
            this.handleRegistration(goToRegister)
        }
    }
}
</script>
<style scoped>

.Signup {

}
</style>
