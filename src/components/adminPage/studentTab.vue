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
                <tr v-for="(student, index) in data" :key="student.id" :class="{ 'bg-slate-100': index % 2 }">
                    <td class="p-2"><input class="inputInfoTableDisable" v-model="data[index].id" readonly></td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }" v-model="student.username"></td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }" v-model="student.email"></td>

                    <td class="p-2"><input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable cursor-pointer outline-none caret-transparent focus:bg-transparent': userEdit === index }"
                            @click.prevent="changeStatus(index, student.id)" v-model="correctStatus[index].status"></td>

                    <td class="p-2">
                        <button @click.prevent="remStudent(index, student.id)">Remover</button>
                        <button @click.prevent="editUser(index)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        {{ modifiedData }}
        <button @click="sendChanges(modifiedData)"> save</button>
        <button @click="createUser()"> create user</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { useClassStore, Students, Status } from '../../stores/adminStore'
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})

export default {
    props: {
        studentsData: Array
    },
    data() {
        return {
            userEdit: undefined,
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
        disStudent(id: number, userId: number) {
            const data = !this.data[id].status
            console.log(data)
            const ObjectModifier = {
                "_id": userId,
                "changes": [{ "status": data }]
            }
            this.modifiedData.push(ObjectModifier)
        },
        sendChanges(data) {
            useClassStore().changeUsers(data)
        },
        remStudent(id: number, userId: number) {
            try {
                axiosInstance.delete(`user/${userId}`)
                console.log("usuario", this.data[id].username, "deletado com sucesso")
            } catch (e) {
                console.log(e)
            }
        },
        createUser() {

        },
    }
}
</script>