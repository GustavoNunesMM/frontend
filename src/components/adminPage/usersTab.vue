<template>
    <div>
        <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">ID</th>
                    <th class="p-2 text-left">Nome</th>
                    <th class="p-2 text-left">Email</th>
                    <th class="p-2 text-left">Permissão</th>
                    <th class="p-2 text-left">Status</th>
                    <th class="p-2 text-left">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id" :class="{ 'rowEdit': userEdit === index, 'bg-slate-100': index % 2 && userEdit !== index }">
                    <td class="p-2">{{ index + 1 }}</td>

                    <td class="p-2">
                        <input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }"
                            v-model="user.username">
                    </td>

                    <td class="p-2">
                        <input class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }"
                            v-model="user.email">
                    </td>

                    <td class="p-2">
                        <select class="inputInfoTableDisable"
                            :class="{ 'inputInfoTableEnable': userEdit === index }"
                            v-model="user.permissionLevel">
                            <option value="ADMIN">Administrador</option>
                            <option value="PROFESSOR">Professor</option>
                            <option value="ALUNO">Aluno</option>
                        </select>
                    </td>

                    <td class="p-2">
                        <toggle-status 
                            :status="user.status"
                            @toggle="toggleUserStatus(index)"
                            :editable="userEdit === index"
                        />
                    </td>

                    <td class="px-2 flex flex-row rounded-md">
                        <button @click.prevent="initDelete(index)" class="btn-danger">
                            <img src="../../assets/trash.png" alt="remover" class="btn-icon">
                            <p class="btn-text">Deletar</p>
                        </button>
                        <button @click.prevent="toggleEdit(index)" class="btn-edit">
                            <img src="../../assets/edit.png" alt="editar" class="btn-icon">
                            <p class="btn-text">{{ userEdit === index ? 'Salvar' : 'Editar' }}</p>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modals e controles similares -->
    </div>
</template>