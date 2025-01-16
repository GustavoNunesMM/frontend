<template>
    <aside class="w-1/6 bg-gray-100 py-4 border-r">
        <ul >
            <li class="mb-2">
                <button @click="trownNewTab('students')" class="btn-full">Alunos</button>
            </li>
            <li class="mb-2">
                <button @click="trownNewTab('content')" class="btn-full">Conteúdos</button>
            </li>
            <li class="mb-2">
                <button @click="trownNewTab('users')" class="btn-full ">Usuários</button>
            </li>
        </ul>
    </aside>
</template>

<script lang="ts">
export default{
    data() {
        return {
            activeTab: "students"
        }
    },
    methods: {
        trownNewTab(newValue:string) {
            if (this.activeTab !== newValue) {
                this.activeTab = newValue
                this.$emit('newTab', newValue)
            }
        }
    }
}
</script>