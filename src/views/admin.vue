<template>
    <div class="h-screen flex flex-col bg-gray-100">
        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="w-1/8 bg-white shadow-md p-4 overflow-y-auto">
                <h2 class="text-xl font-semibold mb-4">Minhas Turmas</h2>
                <ul >
                    <li v-for="(classesByYear, year) in classes" :key="year" class="hover:bg-gray-100 p-2 rounded-lg">
                        <h3 class="font-semibold">{{ year }}</h3>
                        <ul >
                            <li v-for="Class in classesByYear" :key="Class.id" class="hover:bg-gray-200 cursor-pointer rounded-lg p-2" @click.prevent="selectTurma(Class.id)">
                                {{ Class.name }}
                            </li>
                        </ul>
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
import mainContent from '../components/adminPage.vue'
import { useUserStore } from '../stores/user'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})

export default {
    components: {
        mainContent
    },
    data() {
        return {
            username: "", // Nome do usuário
            classes: [], // Lista de turmas
            selectedClass: null, // Turma selecionada
            dropdownVisible: false, // Controle do menu suspenso
        }
    },
    mounted() {
        const userStore = useUserStore()
        userStore.user ? this.username = userStore.user.username : this.username = "Usuario"
        this.getClasses()
    },
    props: {
        id: Number,

    },
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
        },
        async selectTurma(classId) {
            this.selectedClass = classId
            console.log("Turma selecionada:", classId)

        },
        async getClasses() {
            const { data } = await axiosInstance.get("/class")

            const aggregatedBySerie = data.reduce((acc, item) => {
                if (!acc[item.serie]) {
                    acc[item.serie] = []
                }
                acc[item.serie].push(item)
                return acc;
            }, {});
            Object.keys(aggregatedBySerie).forEach(year => {
                aggregatedBySerie[year].sort((a, b) => a.name.localeCompare(b.name))  // Ordena as turmas pelo nome
            });

            this.classes = aggregatedBySerie
        }
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