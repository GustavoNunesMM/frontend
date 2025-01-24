import { defineStore } from 'pinia';

interface User {
    id: number;
    username: string;
    email: string;
    permissionLevel: string;
}

export const useUserStore = defineStore('userStore', {
    state: () => ({
      user: null, // Dados do usuário logado
    }),
    getters: {
        isAuthenticated: (state) => state.user, // Retorna true se o usuário estiver logado
        userPermissionLevel: (state) => state.user?.permissionLevel || null, // Retorna o nível de permissão do usuário
    },
    actions: {
        setUser(user: User) {
            this.user = user; // Define os dados do usuário logado
        },
        clearUser() {
            this.user = null; // Remove os dados do usuário (logout)
        },
        
    },
})
