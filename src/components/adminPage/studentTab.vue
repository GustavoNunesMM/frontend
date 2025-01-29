<template>
    <div>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">id</th>
                    <th class="p-2 text-left">Nome</th>
                    <th class="p-2 text-left">Email</th>
                    <th class="p-2 text-left">Status</th>
                    <th class="p-2 text-left">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in data" :key="student.id" :class="{ 'rowEdit': userEdit === index,'bg-slate-100': index % 2 && userEdit !== index }">
                    <td class="p-2">{{index+1}} </td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }" v-model="student.username"></td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }" v-model="student.email"></td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable cursor-pointer outline-none caret-transparent focus:bg-transparent': userEdit === index }"
                            @click.prevent="data[index].status = !data[index].status" v-model="correctStatus[index].status"></td>

                    <td class="px-2 flex flex-row rounded-md">
                        <button @click.prevent="remStudent(index, student.id)" class="h-8 w-auto my-1 px-2 rounded-md mx-2 bg-red-500 flex flex-row"><img src="../../assets/trash.png" alt="remover" class="w-4 invert m-auto"> <p class="text-white ml-1 m-auto">Deletar</p></button>
                        <button @click.prevent="editUser(index)" class="w-auto h-8 rounded-md my-1 px-2 mx-2 bg-slate-300 flex flex-row"><img src="../../assets/edit.png" alt="editar" class="w-4 invert m-auto"><p class="text-white ml-1 m-auto">Editar</p></button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50  " v-if="isDeletingUser">
            <div class="bg-white rounded-md m-auto">
                <p class=" font-bold  text-lg m-2">Atenção:</p>
                <p class="m-8 mt-4">Deseja realmente deletar o usuario: {{ data[deletingUser.index].username }}</p>
                
                <div class="flex flex-row place-content-evenly mb-5">
                    <button class="btn-red" @click.prevent="removeStudent()">Deletar</button>
                    <button class="btn-default bg-gray-400 hover:bg-gray-500 " @click="isDeletingUser = !isDeletingUser">Voltar</button>
                </div>
            </div>
        </div>

        <div>
            <button @click="sendChanges(modifiedData)" class="btn-default"> Salvar </button>
            <button @click="isModalOpen = !isModalOpen" class="btn-default"> Criar usuario</button>
        </div>

        <modal v-if="isModalOpen" @closeModal="isModalOpen = !isModalOpen"></modal>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { useClassStore, Students, Status } from '../../stores/adminStore'
import modal from '../modal.vue'
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})

export default {
    components: {
        modal
    },
    props: {
        studentsData: Array
    },
    data() {
        return {
            userEdit: undefined,
            isModalOpen: false,
            isDeletingUser: false,
            deletingUser: {
                index: '',
                id: ''
            }
        }
    },
    computed: {
        data(): Students[] {
            return useClassStore().students
        },
        correctStatus(): Status[] {
            return useClassStore().translateStatus
        },
        modifiedData() {
            const newData = this.data
            const oldData = useClassStore().previousData
            return newData.filter( (newItem, index) => {
                const oldItem = oldData[index]
                if(!oldItem) return false
                return Object.keys(newItem).some((key) => newItem[key] !== oldItem[key])
            })
        }
        
    },
    methods: {
        changeStatus(index: number, id: number) {
            useClassStore().students[index].status = !useClassStore().students[index].status
        },
        editUser(id: number) {
            if (this.userEdit == id) return this.userEdit = undefined //set userEdit como undefined
            this.userEdit = id //poe o usuario em estado de edição        
        },//corrigir daqui pra baixo
        sendChanges(data) {
            useClassStore().changeUsers(data)
        },
        remStudent(index: number, userId: number) {
            this.deletingUser = {index: index, id:userId}
            this.isDeletingUser = true
        },
        removeStudent() {
        try {
            const {id, index} = this.deletingUser
            axiosInstance.delete(`user/${id}`)
            console.log("usuario", this.data[index].username, "deletado com sucesso")
        } catch (error) {
            console.log(error)
        }
        }
    }
}
</script>