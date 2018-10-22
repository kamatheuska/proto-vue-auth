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
                    @keyup.enter="handleLogin()"
                    placeholder="Password">
                <button class="button"
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
    name: 'login-app',
    data () {
        return {
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
        ...mapActions('users', [ 'loginUser' ]),

        handleLogin () {
            this.loginUser()
                .then((res) => {
                    // this.$router.push('')
                })
                .catch(console.error)
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
