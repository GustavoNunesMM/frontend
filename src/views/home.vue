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
                <div class="w-80 bg-white shadow-lg p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-4">Login</h2>
                    <form>
                        <input type="text" placeholder="Usuário" class="input-default" v-model="userLogin.user" />
                        <input type="password" placeholder="Senha" class="input-default" v-model="userLogin.pass" />
                        <div class="flex flex-row justify-center p-0">
                            <button class="btn-primary" @click.prevent="login">Entrar</button>
                            <button class="btn-primary" @click.prevent="showLogin = !showLogin">
                                Registrar
                            </button>
                        </div>
                    </form>
                    {{ response }}
                </div>
            </div>

            <!-- Div de Registro -->
            <div class="register-container flex-1 flex items-center justify-center transition-all duration-500 ease-in-out"
                :class="{
                    'opacity-100 translate-x-0': !showLogin,
                    'opacity-0 translate-x-full': showLogin,
                }">
                <registerScreen
                @changeShowLogin="showLogin = !showLogin"></registerScreen>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>



<script lang="ts">
import registerScreen from "../components/registerScreen.vue"
import axios from "axios"
import { responseValidation } from "../middleware/tokenValidation"
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
});

export default {
    components: {
        registerScreen
    },
    data() {
        return {
            userLogin: {
                user: "",
                pass: "",
            },
            id: "",
            response: "",
            showLogin: false,
        }
    },
    methods: {
        async login() {
            const data = {
                username: this.userLogin.user,
                password: this.userLogin.pass,
            };

            try {
                //caso usuario já esteja logado, nem chega aqui
                const response = await axiosInstance.post("/login", data) //recebo a reposta e deve incluir o id
                const validation = await responseValidation(response)
                if (validation.sucess)
                    this.$router.push({ path: `/user/${validation.id}` })
            } catch (error) {
                console.log(
                    "Erro no login:",
                    error.response ? error.response.data : error
                );
            }
        },

    }
}
</script>