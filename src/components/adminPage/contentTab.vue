<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Conteúdos Lecionados</h2>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">id</th>
                    <th class="p-2 text-left">Nome</th>
                    <th class="p-2 text-left">professor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contents, index) in data" :key="index">
                    <td class="p-2">{{ contents.id }}</td>
                    <td class="p-2">{{ contents.name }}</td>
                    <td class="p-2">{{ contents.teacher.username }}</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        contentData: Array
    },
    data() {
        return {
            data: []
        }
    },
    watch: {
        contentData(newValue) {
            this.data = newValue
        }
    }
}
</script>