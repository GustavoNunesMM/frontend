<template>
    <div>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">ID</th>
                    <th class="p-2 text-left">Título</th>
                    <th class="p-2 text-left">Descrição</th>
                    <th class="p-2 text-left">Status</th>
                    <th class="p-2 text-left">Data de Criação</th>
                    <th class="p-2 text-left">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(content, index) in data" :key="content.id" :class="{ 'rowEdit': contentEdit === index, 'bg-slate-100': index % 2 && contentEdit !== index }">
                    <td class="p-2">{{ index + 1 }}</td>

                    <td class="p-2">
                        <input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': contentEdit === index }"
                            v-model="content.title">
                    </td>

                    <td class="p-2">
                        <textarea class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': contentEdit === index }"
                            v-model="content.description"></textarea>
                    </td>

                    <td class="p-2">
                        <select class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': contentEdit === index }"
                            v-model="content.status">
                            <option value="published">Publicado</option>
                            <option value="draft">Rascunho</option>
                        </select>
                    </td>

                    <td class="p-2">{{ formatDate(content.createdAt) }}</td>

                    <td class="px-2 flex flex-row rounded-md">
                        <button @click.prevent="deleteContent(index, content.id)" class="btn-danger">
                            <img src="../../assets/trash.png" alt="remover" class="btn-icon">
                            <p class="btn-text">Deletar</p>
                        </button>
                        <button @click.prevent="editContent(index)" class="btn-edit">
                            <img src="../../assets/edit.png" alt="editar" class="btn-icon">
                            <p class="btn-text">Editar</p>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal de Confirmação de Exclusão -->
        <confirmation-modal 
            v-if="isDeleting"
            :item-name="deletingItem.title"
            @confirm="confirmDelete"
            @cancel="isDeleting = false"
        />

        <div class="mt-4">
            <button @click="saveChanges(modifiedContents)" class="btn-primary">Salvar Alterações</button>
            <button @click="openCreateModal" class="btn-primary">Criar Novo Conteúdo</button>
        </div>

        <content-modal 
            v-if="isModalOpen"
            @close="isModalOpen = false"
            @created="refreshContents"
        />
    </div>
</template>

<script lang="ts">
// Lógica similar ao componente de estudantes, adaptada para conteúdos
</script>