<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-semibold mb-4">Criar Novo Usuário</h2>
      <input type="text" placeholder="Email" class="input-default" v-model="user.email" />
      <input type="text" placeholder="Nome" class="input-default" v-model="user.username" />
      <input type="password" placeholder="Senha" class="input-default" v-model="user.password" />
      <input type="text" placeholder="Endereço" class="input-default" v-model="user.adress.street" />
      <div class="flex flex-row gap-4">
          <input type="number" placeholder="Numero" inputmode="numeric" v-model="user.adress.number" pattern="[0-9]" class="input-default no-counter" />
          <input type="text" placeholder="Complemento" class="input-default" v-model="user.adress.complements" />
      </div>
      <input type="text" placeholder="Bairro" class="input-default" v-model="user.adress.neighborhood" />
      <input type="text" placeholder="Cidade" class="input-default" v-model="user.adress.city" />

      <div class="flex flex-row">
          <input type="text" placeholder="Cep" v-model="user.adress.cep" class="input-default" />
          <button @click.prevent="cepValidation()" class="btn-green m-auto mt-0 ml-2">buscar</button>
      </div>
      <input type="text" placeholder="Contato" inputmode="numeric" v-model="user.contact" class="input-default no-counter" />
      <div class="flex flex-row place-content-evenly">
        <button @click.prevent="sendRegister()" class="btn-green">Registrar</button>
        <button class="btn-green" @click.prevent="$emit('CloseModal')">Voltar</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})
import { useClassStore } from '../stores/adminStore'
import {validateForm, validateCep, treatData} from '../middleware/regUserValidation'
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        contact: "",
        status: true,
        adress: {
            street: "",
            number: "",
            complements: "",
            neighborhood: "",
            city: "",
            state: "",
            cep: ""
        }
      },
      isValid: false
    }
  },
  methods: {
    async sendRegister() {
      this.isValid = validateForm(this.user, false).isValid
      if(!this.isValid) return
      let data = await treatData(this.user, 'ALUNO')
      data.classId = useClassStore().thatClass.id
      console.log(data)
      await axiosInstance.post("/register/user", data)
      this.createUser()
    },
    createUser(){
      
    },
    saveUser() {
      console.log("Usuário salvo:", this.user);
      this.closeModal();
    },
    async cepValidation() {
      this.user.adress = await validateCep(this.user.adress.cep, this.user.adress)
    },
  },
};
</script>
