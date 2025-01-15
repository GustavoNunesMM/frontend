<template>
    <div class="h-screen flex flex-col bg-gray-100">
        <!-- Header -->
        <header class="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 class="text-lg font-bold">Bem-vindo, {{ username }}</h1>
            <div class="relative">
                <button class="btn-primary my-0"
                    @click="toggleDropdown">
                    Menu
                </button>
                <div v-if="dropdownVisible" class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" @click="goToSettings">
                        Configurações
                    </button>
                    <button class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" @click="logout">
                        Logout
                    </button>
                </div>
            </div>
        </header>

        <!-- Content -->
        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
                <h2 class="text-xl font-semibold mb-4">Minhas Turmas</h2>
                <ul>
                    <li v-for="turma in classes" :key="turma.id" class="p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
                        @click="selectTurma(turma)">
                        {{ turma.nome }}
                    </li>
                </ul>
            </aside>

            <!-- Main Content -->
            <mainContent
            :selectClass="selectedClass"></mainContent>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import mainContent from '../components/mainContent.vue'
export default {
    components: {
            mainContent
        },
    data() {
        return {
            username: "Usuário", // Nome do usuário
            classes: [
                { id: 1, nome: "Turma A" },
                { id: 2, nome: "Turma B" },
                { id: 3, nome: "Turma C" },
            ], // Lista de turmas
            selectedClass: null, // Turma selecionada
            dropdownVisible: false, // Controle do menu suspenso
        }
    },
    props: ['id'],
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible
        },
        logout() {
            axios.get('http://localhost:3000/user/logout')
                .then(() => this.$router.push({ name: 'Home' }))
                .catch(e => console.log("Erro ao realizar logout"))
        },
        goToSettings() {
            console.log("Indo para configurações...");
            // Adicione a lógica para navegação para configurações aqui
        },
        selectTurma(turma) {
            this.selectedClass = turma
            console.log("Turma selecionada:", turma)
            // Adicione a lógica para carregar os detalhes da turma
        },
    }
}
</script>
<style scoped>
header {
    position: sticky;
    top: 0;
    z-index: 50;
}
</style>