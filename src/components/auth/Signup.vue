<template>
    <div class="Login">
        <transition name="fade">
            <div>
                <slot name="welcomeMessage">
                    <h2>¡Bienvenido!</h2>
                    <h4>Regístrate:</h4>
                </slot>
                <input
                    type="email"
                    v-model="email"
                    placeholder="Email Address">
                <input
                    type="password"
                    :class="[passwordErrorClass, matchingPasswordsClass]"
                    v-model="password"
                    placeholder="Password">
                <input
                    type="password"
                    :class="[passwordErrorClass, matchingPasswordsClass]"
                    v-model="passwordCheck"
                    @keyup.enter="handleSignup()"
                    placeholder="Password">
                <transition name="fade">
                    <div>
                        <h6 v-if="passwordConfirmation.length > 4 && !passwordMatch">
                            Las contraseñas no coinciden
                        </h6>
                        <h6 v-if="passwordConfirmation.length > 4 && passwordMatch">
                            ¡Hurray! Las contraseñas coinciden!
                        </h6>
                    </div>
                </transition>
                <button class="button"
                    @click="handleSignup()">
                    <slot>Registrarse</slot>
                </button>
                <h5>{{ server.auth.message }}</h5>
                <slot name="isRegistered">
                    <h4>Ya tengo una cuenta...</h4>
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
            passwordMatch: true,
            passwordConfirmation: ''
        }
    },
    computed: {
        ...mapState('users', [ 'user' ]),
        ...mapState([ 'server' ]),
        ...mapGetters('users', [ 'auth' ]),

        passwordErrorClass () {
            if (this.passwordConfirmation.length > 4) {
                return {
                    'Login__input-error': !this.passwordMatch
                }
            }
        },

        matchingPasswordsClass () {
            if (this.passwordConfirmation.length > 4) {
                return {
                    'Login__input-success': this.passwordMatch
                }
            }
        },

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
        },

        passwordCheck: {
            get () {
                return this.passwordConfirmation
            },
            set (password) {
                this.passwordConfirmation = password
                this.confirmPassword(password)
            }
        }
    },
    methods: {
        ...mapActions('users', [ 'signupUser' ]),

        confirmPassword (password) {
            if (this.user.credentials.password !== password) {
                this.passwordMatch = false
                return
            }
            this.passwordMatch = true
        },

        handleSignup () {
            this.confirmPassword(this.passwordConfirmation)
            if (this.passwordMatch) {
                this.signupUser()
                    .then((res) => {
                    })
                    .catch((error) => console.error('ERROR handleSignup\n', error))
            }
        },

        changeRegistrationStatus (goToRegister) {
            this.handleRegistration(goToRegister)
        }
    }
}
</script>
<style scoped>

.Login {
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    max-width: 37rem;
}
.Login input {
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
}
.Login__input-error {
    color: #f59f9f;
    border: solid 2px #f59f9f;
    transition: all .3s ease;
}
.Login__input-success {
    color: #81c590;
    border: solid 2px #81c590;
    transition: all .3s ease;
}
.Login .button {
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    height: 4.6rem;
}
.Login p {
    cursor: pointer;
    z-index: 10000;
}

.Login p:hover {
    color: #de8162;
}
@media only screen and (min-width: 1000px) {
    .Home {
        padding-top: 8rem;
    }
    .Home__logo {
        width: 60rem;
    }
}
</style>
