<template>
    <div class="flex flex-col w-full min-h-screen">
        <div class="flex flex-1">
            <aside class="w-1/8 bg-gray-100 p-4 border-r">
                <ul>
                    <li class="mb-2">
                        <button @click="activeTab = 'students'" class="btn-primary w-[90%]  mx-1">Alunos</button>
                    </li>
                    <li class="mb-2">
                        <button @click="activeTab = 'content'" class="btn-primary w-[90%]  mx-1">Conteúdos</button>
                    </li>
                    <li class="mb-2">
                        <button @click="activeTab = 'teachers'" class="btn-primary w-[90%]  mx-1">Professores</button>
                    </li>
                    <li class="mb-2">
                        <button @click="activeTab = 'users'" class="btn-primary w-[90%]  mx-1">Usuários</button>
                    </li>
                </ul>
            </aside>

            <!-- Main content area -->
            <main class="flex-1 p-6">
                <!-- Students Tab -->
                <div v-if="activeTab === 'students'">
                    <h2 class="text-2xl font-semibold mb-4">Alunos da Turma</h2>
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
                            <tr v-for="(student) in students" :key="student.id">
                                <td class="p-2">{{ student.id }}</td>
                                <td class="p-2">{{ student.username }}</td>
                                <td class="p-2">{{ student.email }}</td>
                                <td class="p-2">{{ student.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Content Tab -->
                <div v-if="activeTab === 'content'">
                    <h2 class="text-2xl font-semibold mb-4">Conteúdos Lecionados</h2>
                    <div v-for="(contents, subject) in classContents" :key="subject" class="mb-4">
                        <h3 class="font-semibold text-lg">{{ subject }}</h3>
                        <ul>
                            <li v-for="(content, index) in contents" :key="index">
                                <p>{{ content }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Teachers Tab -->
                <div v-if="activeTab === 'teachers'">
                    <h2 class="text-2xl font-semibold mb-4">Professores por Disciplina</h2>
                    <div v-for="(teachers, subject) in teachersBySubject" :key="subject" class="mb-4">
                        <h3 class="font-semibold text-lg">{{ subject }}</h3>
                        <ul>
                            <li v-for="teacher in teachers" :key="teacher.id">
                                <p>{{ teacher.name }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Users Tab -->
                <div v-if="activeTab === 'users'">
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
                            <tr v-for="user in users" :key="user.id">
                                <td class="p-2">{{ user.name }}</td>
                                <td class="p-2">{{ user.email }}</td>
                                <td class="p-2">{{ user.permissionLevel }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})
export default {
    data() {
        return {
            activeTab: "students", // Initial tab is "students"
            students: [],
            classContents: [],
            teachersBySubject: [],
            users: [],
            actualClass: 1
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
                console.log(data)
                // Filtrar alunos e professores
                this.students = users.filter(user => user.permissionLevel === 'ALUNO')
                const teachers = users.filter(user => user.permissionLevel === 'PROFESSOR')

                // Organizar conteúdos por professor
                this.classContents = contents.map(content => ({
                    ...content,
                    teacher: teachers.find(teacher => teacher.id === content.teacher?.id) || null,
                }))
            } catch (error) {
                console.error("Erro ao obter dados da turma:", error)
            }
        },
    },
}
</script>

<style scoped>
/* You can add custom styles here */
</style>