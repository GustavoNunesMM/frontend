<template>
    <div class="h-screen img flex items-center justify-center rounded-lg">
        <!-- Container principal -->
        <div class="relative w-full max-w-4xl h-full max-h-[28rem] flex">
            <!-- Div Overlay -->
            <div class="absolute inset-0 bg-cover bg-center bg-slate-50 opacity-20 z-0 rounded-lg"></div>
            <!-- Div de Login -->
            <div class="login-container just-center-flex transition-all duration-500 ease-in-out" :class="{
                'opacity-100 translate-x-0': showLogin,
                'opacity-0 -translate-x-full': !showLogin,
                }">
                <loginScreen
                @changeShowLogin="showLogin = !showLogin"
                @response="payload => response = payload"></loginScreen>
            </div>

            <!-- Div de Registro -->
            <div class="register-container flex-1 flex items-center justify-center transition-all duration-500 ease-in-out"
                :class="{
                    'opacity-100 translate-x-0': !showLogin,
                    'opacity-0 translate-x-full': showLogin,
                }">
                <registerScreen
                @changeShowLogin="showLogin = !showLogin"
                @response="payload => response = payload"></registerScreen>
            </div>
        </div>
        {{ response }}
        <router-view></router-view>
    </div>
</template>



<script lang="ts">
import registerScreen from "../components/registerScreen.vue"
import loginScreen from '../components/loginScreen.vue'

export default {
    components: {
        registerScreen,
        loginScreen
    },
    data() {
        return {
            response: "",
            showLogin: false,
        }
    },
    methods: {
    }
}
</script>