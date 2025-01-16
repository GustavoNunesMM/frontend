<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Alunos</h2>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">id</th>
                    <th class="p-2 text-left">Nome</th>
                    <th class="p-2 text-left">Email</th>
                    <th class="p-2 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in data" :key="index">
                    <td class="p-2">{{ student.id }}</td>
                    <td class="p-2">{{ student.username }}</td>
                    <td class="p-2">{{ student.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
/*import type { PropType } from 'vue'

interface studentModel {
    email: String,
    id: Number,
    permissionLevel: String,
    terms?: any,
    username: String
    }
    studentsData: Object as PropType<studentModel> || null
*/

export default {
    props: {
        studentsData: Array
    },
    data() {
        return {
            data: []
        }
    },
    watch: {
        studentsData(newValue) {
            this.data = newValue
        }
    }
}
</script>