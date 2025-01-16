<template>
    <div class="flex flex-col w-full h-full">
        <div class="flex h-full">
            <asideTab @newTab="(newValue)=>activeTab=newValue"/>
            <main class="flex-1 p-[2px] transition-all">
                <transition-group name="fade">
                    <studentTab v-if="activeTab === 'students'" :studentsData="students"/>
                    <contentTab v-if="activeTab === 'content'" :contentData="classContents"></contentTab>
                    <usersTab   v-if="activeTab === 'users'" :userData="users"></usersTab>
                </transition-group >

                <dataInfo class="m-0 p-0"></dataInfo>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import contentTab from './adminPage/contentTab.vue'
import studentTab from './adminPage/studentTab.vue'
import usersTab from './adminPage/usersTab.vue'
import asideTab from './adminPage/asideTab.vue'
import dataInfo from './adminPage/showData.vue'

import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})

export default {
    components:{
        contentTab,
        studentTab,
        usersTab,
        asideTab,
        dataInfo
    },
    data() {
        return {
            activeTab: "students", // Initial tab is "students"
            students: [],
            classContents: [],
            teachersBySubject: [],
            users: [],
            actualClass: '1'
        };
    },
    props: ['selectClass'],
    watch: {
        selectClass(newClassId, oldClassId) {
            if (newClassId !== this.actualClass) {
                this.actualClass = newClassId
                this.getData(newClassId)
            }
        }

    },//falta integrar os dados, oferecer opções de modificação e conferir no store
    methods: {
        async getData(classId) {
            try {
                const { data } = await axiosInstance.get(`/classData/${classId}`)
                const { users, contents } = data.classDetails
                // Filtrar alunos e professores
                this.students = users.filter(user => user.permissionLevel === 'ALUNO')
                // Organizar conteúdos por professor
                this.classContents = contents.map( content => {
                    return content.user
                })
                this.users = users.filter(user => 
                user.permissionLevel !== 'ALUNO' && user.permissionLevel !== 'PROFESSOR')

            } catch (error) {
                console.error("Erro ao obter dados da turma:", error)
            }
        },
    },
}
</script>

<style>
.fade-enter-to {
    transition: opacity 0.1s;
    transition-delay: 0.4s; 
    transition-timing-function: linear;
}
.fade-leave-active {
    transition: opacity 0.1s linear;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>