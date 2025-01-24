import { defineStore } from 'pinia';
import axios from 'axios'

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
        classes: [] as ClassItem[], // Armazena os dados
        students: [] as Students[],
        contents: [],
        user: [],
        dataStatus: []
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
                const { users, contents } = data.classDetails
                //this.alldata = data
                this.students = users.filter(user => user.permissionLevel === 'ALUNO')
                this.contents = contents.map( ({content}) => {return content})
                this.user = users.filter(user => 
                user.permissionLevel !== 'ALUNO' && user.permissionLevel !== 'PROFESSOR')

            } catch (error) {
                console.error("Erro ao obter dados da turma:", error)
            }
        },
        async changeClasses([data, id]:[ClassItem, number]) {
            this.classes[id] = data

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
        }
    },
});