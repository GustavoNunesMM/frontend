<template>
    <div class="w-80 bg-white shadow-lg p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form>
            <input type="text" placeholder="Usuário" class="input-default" v-model="userLogin.user" />
            <input type="password" placeholder="Senha" class="input-default" v-model="userLogin.pass" />
            <div class="flex flex-row justify-center p-0">
                <button class="btn-primary" @click.prevent="login">Entrar</button>
                <button class="btn-primary" @click.prevent="$emit('changeShowLogin')">
                    Registrar
                </button>
            </div>
        </form>
        
    </div>
</template>


<script lang="ts">
import axios from "axios"
import { responseValidation } from "../middleware/tokenValidation"
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
});

export default {
    props: {
        showLogin: false
    },
    emits: ['changeShowLogin'],
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