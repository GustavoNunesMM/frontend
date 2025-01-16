<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Dados dos Usuários</h2>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">Nome</th>
                    <th class="p-2 text-left">Email</th>
                    <th class="p-2 text-left">Permissão</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in data" :key="index">
                    <td class="p-2">{{ user.name }}</td>
                    <td class="p-2">{{ user.email }}</td>
                    <td class="p-2">{{ user.permissionLevel }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
export default{
    props: {
        userData: Array
    },
    data() {
        return {
            data: []
        }
    },
    watch: {
        userData(newValue) {
            this.data = newValue
        }
    }
}
</script>