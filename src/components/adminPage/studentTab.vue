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
                <tr v-for="(student, index) in data" :key="index" :class="{'bg-slate-100': index%2 }">
                    <td class="p-2"><input class="inputInfoTableDisable"  v-model="data[index].id" ></td>

                    <td class="p-2"><input class="inputInfoTableDisable" 
                        :class="{'inputInfoTableEnable': userEdit === index}" v-model="student.username" ></td>

                    <td class="p-2"><input class="inputInfoTableDisable" 
                        :class="{'inputInfoTableEnable': userEdit === index}" v-model="student.email"></td>

                    <td class="p-2"><input class="inputInfoTableDisable" 
                        :class="{'inputInfoTableEnable cursor-pointer outline-none caret-transparent focus:bg-transparent': userEdit === index}"
                        @click.prevent="changeStatus(index, student.id)" v-model="correctStatus[index].status"></td>

                    <td class="p-2">
                        <button @click.prevent="remStudent(index, student.id)">Remover</button>
                        <button @click.prevent="editUser(index)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="sendChanges()"> save</button>
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
            modifiedData: [],
            userEdit: -1,
            userWasEdited: []
        }
    },
    computed:{ 
        data():Students[]  {
            return useClassStore().students
        },
        correctStatus():Status[] {
            return useClassStore().translateStatus
        }
    },
    watch: {
        data: {
            handler(newValue) {
                this.userWasEdited = newValue
            },deep: true
        }
    },
    methods:{
        remStudent(id:number, userId:number) {
            try {
                axiosInstance.delete(`user/${userId}`)
                console.log("usuario", this.data[id].username, "deletado com sucesso")
            } catch(e) {
                console.log(e)
            }
        },
        changeStatus(index:number, id:number) {
            useClassStore().students[index].status = !useClassStore().students[index].status
        },
        editUser(id:number) {
            if (this.userEdit == id) { //verifica se o usuario já estava em edição

                this.userEdit = undefined //set userEdit como undefined
                if (this.userWasEdited[id] !== this.data[id]) {
                    this.useClassStore().changeClasses([this.data[id], id])
                    console.log("usuario atualizado")
                }
                console.log("edição para o usuario", id, "desativada")
                return
            }  
            this.userEdit = id //poe o usuario em estado de edição
            console.log("edição para o usuario", id, "ativada")
            
        },
        disStudent(id:number, userId:number) {
            const data = !this.data[id].status
            console.log(data)
            const ObjectModifier = {
                "_id": userId,
                "changes": [{"status": data}]
            }
            this.modifiedData.push(ObjectModifier)
        },
        sendChanges() {
            const data = this.modifiedData
            data.forEach(change => {
                axiosInstance.put('/user', change).then(() => useClassStore().getClasses()).catch(e => console.log("Erro ao atualizar usuario", e))
            })
        }
    }
}
</script>