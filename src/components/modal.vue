<template>
<div>
    <!-- Modal -->
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-semibold mb-4">Criar Novo Usuário</h2>

            <form @submit.prevent="saveUser">
            <div class="mb-3">
                <label class="block text-sm font-medium">Username</label>
                <input
                v-model="user.username"
                type="text"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium">Endereço</label>
                <input
                v-model="user.endereco"
                type="text"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium">Contato</label>
                <input
                v-model="user.contato"
                type="text"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium">Email</label>
                <input
                v-model="user.email"
                type="email"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium">Class</label>
                <input
                v-model.number="user.class"
                type="number"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3">
                <label class="block text-sm font-medium">Nível de Permissão</label>
                <input
                v-model="user.permissionLevel"
                type="text"
                class="w-full border rounded p-2"
                />
            </div>

            <div class="mb-3 flex items-center">
                <label class="block text-sm font-medium mr-2">Status</label>
                <input v-model="user.status" type="checkbox" />
            </div>

            <div class="flex justify-end mt-4">
                <button
                @click.prevent="$emit('closeModal')"
                type="button"
                class="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                Cancelar
                </button>
                <button
                type="submit"
                class="bg-green-500 text-white px-4 py-2 rounded"
                >
                Salvar
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        endereco: "",
        contato: "",
        email: "",
        class: null,
        permissionLevel: "",
        status: false,
      },
    };
  },
  methods: {
    createUser() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    saveUser() {
      console.log("Usuário salvo:", this.user);
      this.closeModal();
    },
  },
};
</script>
