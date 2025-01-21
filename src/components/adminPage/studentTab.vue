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
                    <th class="p-2 text-left">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in data" :key="index" :class="{'bg-slate-100': index%2 }">
                    <td class="p-2">{{ student.id }}</td>
                    <td class="p-2">{{ student.username }}</td>
                    <td class="p-2">{{ student.email }}</td>
                    <td class="p-2">{{ student.status }}</td>
                    <td class="p-2">
                        <button @click.prevent="remStudent(index)">Remover</button>
                        <button @click.prevent="disStudent(index)">Desabilitar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        studentsData: Array
    },
    data() {
        return {
            data: [],
            modifiedData: []
        }
    },
    watch: {
        studentsData(newValue) {
            this.data = newValue
        }
    },
    methods:{
        remStudent(id: number) {
            const 
        },
        disStudent(id:number) {
            const data = !this.data[id].status
            const ObjectModifier = {
                "_id": id,
                "changes": [{"status": data}]
            }
            this.modifiedData.push(ObjectModifier)
        },
        sendChanges() {
            try {
                const data = this.modifiedData
                
            }
        }
    }
}
</script>