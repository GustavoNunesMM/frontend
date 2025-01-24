<template>
    <div class="h-screen flex flex-col bg-gray-100">
        <div class="flex flex-1">
            <div class="flex">
                <div class="w-64 h-screen bg-blueTons-light">
                    <div class="text-white mb-6 flex flex-col place-items-center">
                        <h1 class="text-2xl font-semibold">{{username}}</h1>
                        <img src="../assets/background.jpg" alt="Ilustração" class="w-24 h-24 mt-2 rounded-full"/>
                    </div>

                    <div class="space-y-4">
                        <div v-for="(item, index) in listOfButton" :key="index">
                            <button @click="loadInfo(index)" class="btn-dropdown" 
                            :class="{'btn-dropdown-active': isExpanded === index}">
                                {{ item }}
                            </button>
                            <div v-if="isExpanded === index && isExpanded === 0" class="shadow-inner w-full shadow-black py-2 bg-blueTons-Default">
                                <div v-for="(year, index_y) in listOfClass" :key="index_y">
                                    <div v-for="(classer, index_c) in year" :key="index_c" class="dropdown-menu">
                                        <button class="btn-aside hover:shadow-button-active" @click="selectTurma(classer.id)">
                                            {{ classer.serie }} - {{classer.name}}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="isExpanded === index && isExpanded !== 0" class="shadow-inner w-full shadow-black py-2 bg-blueTons-Default">
                                <div v-for="(button, index_btn) in listOfSubButtons[index]" :key=index_btn 
                                class="dropdown-menu">
                                    <button class="btn-aside hover:shadow-button-active">
                                        {{ button }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <mainContent :selectClass="selectedClass"></mainContent>


            <!-- Main Content -->
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import mainContent from '../components/adminPage.vue'
import { useUserStore } from '../stores/user'
import { useClassStore } from '../stores/adminStore'


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
            myClasses: false,
            isExpanded:0,
            listOfButton: ['Turmas', 'Permissões', 'Configurações'],
            listOfSubButtons: [
                ['exibir conteudo', 'selecionar escola'],
                ['logout', 'configurações', 'segurança']],
            debug: ''
        }
    },
    computed: {
    listOfClass() {
        return useClassStore().agregateClass;
        }
    },
    mounted() {
        useUserStore().user ? this.username = useUserStore().user.username : this.username = "Usuario"
        useClassStore().getClasses()
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
        async selectTurma(classId:number) {
            useClassStore().getThatClass(classId)
            console.log("Turma selecionada:", classId)

        },
        loadInfo(id:number) {
            this.isExpanded === id?this.isExpanded = -1: this.isExpanded = id
            this.selectedClass
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