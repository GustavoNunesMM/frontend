import { defineStore } from 'pinia';
import axios from 'axios'
import { toRaw } from 'vue';
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Permite enviar cookies nas requisições
})

// Definindo o tipo para os itens da store
export interface ClassItem {
    id: number;
    serie: string;
    name: string;
    createdAt: string;
}

export interface Students {
    id: number;                // Identificador único do usuário
    username: string;          // Nome de usuário
    email: string;             // Email do usuário
    terms: string | null;      // Termos aceitos, caso existam
    permissionLevel: "ALUNO"; // Nível de permissão do usuário
    status: boolean;           // Status ativo ou inativo do usuário
}
export interface Status {
    status: string;
    id: number;
}
// Tipo para o getter
type AggregatedClasses = Record<string, ClassItem[]>;

export const useClassStore = defineStore('classStore', {
    state: () => ({
        classes: [] as ClassItem[], // todas as turmas
        students: [] as Students[], // estudantes
        thatClass: [], //dados da turma completos
        contents: [], //conteudos
        user: [], //usuarios
        dataStatus: [], // status da turma
        dataModified: [],
        previousData: []
    }),

    actions: {
        async getClasses() {
            const { data } = await axiosInstance.get("/class")

            this.classes = data.reduce((acc, item) => {
                if (!acc[item.serie]) acc[item.serie] = []

                acc[item.serie].push(item)
                return acc
            }, {})
        },
        async getThatClass(id: number) {
            try {
                const { data } = await axiosInstance.get(`/classData/${id}`)
                this.thatClass = data.classDetails
                const { users, contents } = data.classDetails
                //this.alldata = data
                this.students = users.filter(user => user.permissionLevel === 'ALUNO')
                this.previousData = structuredClone(toRaw(this.students))
                this.contents = contents.map( ({content}) => {return content})
                this.user = users.filter(user => 
                user.permissionLevel !== 'ALUNO' && user.permissionLevel !== 'PROFESSOR')
            } catch (error) {
                console.error("Erro ao obter dados da turma:", error)
            }
        },
        async changeUsers(newData: Students[]) {
            this.dataModified = newData
            if (this.dataModified.length === 0) {
                console.log("Nenhuma operação a ser realizada")
                return
            }
            console.log("Iniciando operações...")
            const requests = this.dataModified.map(user => {
                const userId = user.id;
                const changes = Object.entries(user).map(([key, value]) => ({ [key]: value }));
                const ObjectModifier = {
                    _id: userId,
                    changes,
                }
                return axiosInstance.put('/user', ObjectModifier)
            })
            try {
                const results = await Promise.all(requests)
                const successfulUpdates = results.filter(result => result.status === 200).length
                console.log(`${successfulUpdates} operações concluídas com sucesso.`)
            } catch (error) {
                console.error("Erro ao atualizar usuários:", error);
            }
        
            this.previousData = structuredClone(toRaw(this.students))
        }
    },
    getters: {
        agregateClass: (state): AggregatedClasses  => {
            // Retorna uma versão ordenada dos dados sem modificar o estado original
            const aggregated = {};
            for (const year of Object.keys(state.classes)) {
                aggregated[year] = [...state.classes[year]].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            }
            return aggregated;
        },
        translateStatus: (state):Status[] => {
            const acc = state.students.map(student => {
                const data = {
                    status: student.status === true? 'Ativo': 'Desativado',
                    id: student.id
                }
                return data 
            })
            return acc
        },
    },
});