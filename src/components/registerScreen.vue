<template>
    <div v-if="!registerFirstPage" class="w-80 bg-white shadow-lg p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Registrar</h2>
        <form>
            <input type="text" placeholder="Email" class="input-default" v-model="regUser.email" />
            <input type="text" placeholder="Nome" class="input-default" v-model="regUser.username" />
            <input type="password" placeholder="Senha" class="input-default" v-model="regUser.password" />
            <input type="password" placeholder="Confirme a senha" class="input-default"
                v-model="regUser.passwordConfirm" />
            <div class="flex flex-row">
                <button 
                @click.prevent="sendNextRegisterPage"
                class="btn-secondary">
                    Proximo
                </button>
                <button class="btn-secondary" @click.prevent="$emit('changeShowLogin')">
                    Voltar
                </button>
            </div>
        </form>
    </div>

    <div v-else class="w-[26rem] bg-white shadow-lg p-6 rounded-lg">
        <form>
            <h2 class="text-2xl font-bold mb-4">Endereço e contato</h2>
            <input type="text" placeholder="Endereço" class="input-default" v-model="regUser.adress.street" />
            <div class="flex flex-row gap-4">
                <input type="number" placeholder="Numero" inputmode="numeric" v-model="regUser.adress.number"
                    pattern="[0-9]" class="input-default no-counter" />
                <input type="text" placeholder="Complemento" class="input-default"
                    v-model="regUser.adress.complements" />
            </div>
            <input type="text" placeholder="Bairro" class="input-default" v-model="regUser.adress.neighborhood" />
            <input type="text" placeholder="Cidade" class="input-default" v-model="regUser.adress.city" />
            <div class="flex flex-row">
                <input type="text" placeholder="Cep" v-model="regUser.adress.cep" class="input-default" />
                <button @click.prevent="cepValidation()" class="btn-inside">
                    buscar
                </button>
            </div>
            <input type="text" placeholder="Contato" inputmode="numeric" v-model="regUser.contact"
                class="input-default no-counter" />

            <div class="flex flex-row">
                <button @click.prevent="sendRegister()" :disabled="!formErrors.isValid || !regUser.username || !regUser.password || !regUser.email"  class="btn-secondary">
                    Registrar
                </button>
                <button class="btn-secondary" @click.prevent="registerFirstPage = !registerFirstPage">
                    Voltar
                </button>
            </div>
        </form>
    </div>
</template>


<script lang="ts">
import axios from "axios"
import { storeSetUser } from '../services/setUser'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
});
export default {
    props: {
        showLogin: Boolean
    },
    emits: ['changeShowLogin'],
    data() {
        return {
            regUser: {
                username: "",
                password: "",
                passwordConfirm: "",
                email: "",
                adress: {
                    street: "",
                    number: "",
                    complements: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                    cep: ""
                },
                contact: ""
            },
            response: "",
            registerFirstPage: false,
            formErrors: {
                email: false,
                username: false,
                password: false,
                passwordConfirm: false,
                isValid: false
            }
        }
    },
    methods: {
        async get() {
            const { data } = await axiosInstance.get("/user");
            console.log(data);
        },
        validateForm() {
            const { email, username, password, passwordConfirm } = this.regUser;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const usernameMinLength = 3;
            const usernameMaxLength = 20;
            const passwordMinLength = 6;
            const passwordMaxLength = 20;
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;

            this.formErrors.email = !emailRegex.test(email)
            this.formErrors.username = username.length < usernameMinLength || username.length > usernameMaxLength
            this.formErrors.password = !passwordRegex.test(password) || password.length < passwordMinLength || password.length > passwordMaxLength
            this.formErrors.passwordConfirm = password !== passwordConfirm
            
            this.formErrors.isValid = !Object.values(this.formErrors).includes(true)
        },

        async cepValidation() {
            const cep = this.regUser.adress.cep
            if (cep === "") return { success: false, message: "Cep vazio" }
            const validacep = /^[0-9]{8}$/
            if (!validacep.test(cep)) return { success: false, message: "Cep incorreto" }

            const script = `https://viacep.com.br/ws/${cep}/json/`
            const { data } = await axios.get(script, { withCredentials: false })

            const newAdress = {
                ...this.regUser.adress,
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }

            this.regUser.adress = newAdress
        },
        sendNextRegisterPage() {
            this.validateForm();
            if (!this.formErrors.isValid) {
                this.response = "Por favor, corrija os erros no formulário."
                return
            }
            return this.registerFirstPage = !this.registerFirstPage
        },
        async sendRegister() {

            try {
                
                const data = this.regUser;
                const newData = this.treatData(data)
            
                const res = await axiosInstance.post("/register/user", newData);
                console.log('Resposta do servidor:', res);
                this.regUser = {
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    email: "",
                    adress: {
                        street: "",
                        number: "",
                        complements: "",
                        neighborhood: "",
                        city: "",
                        state: "",
                        cep: ""
                    },
                    contact: ""
                }
                if(!storeSetUser(res)) return console.log("Não foi possivel cadastrar usuario na sessão")
                this.$router.push({ path: `/user/${res.data.userData.id}` })
                this.response = "Usuário registrado com sucesso"
                
                return  
            } catch (error) {
                console.error('Erro na requisição:', error.response?.data || error.message);
                if (error.message.err.meta.modelName) this.response = error.err.meta.modelName
                return "Erro ao registrar usuário";
            }
        },
        treatData(data) {
            const entries = Object.entries(data.adress);
            const newAdress = entries.map(([key, value]) => `${key}: ${value}`).join(', ');
            const { contact, username, password, email } = data;
            const newData = {
                endereco: newAdress,
                contato: contact,
                username: username,
                password: password,
                email: email,
                permissionLevel: 'ADMINISTRACAO',
            }
            return newData
        }
    }
    
}
//password hidden btn 

</script>