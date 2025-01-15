<template>
    <main class="flex-1 p-4">
        <h2 class="text-2xl font-bold mb-4">
            {{ selectClass ? selectClass.nome : "Selecione uma turma" }}
        </h2>
        <p v-if="!selectClass" class="text-gray-600">
            Clique em uma turma à esquerda para visualizar os detalhes.
        </p>
        <div v-else>
            <!-- Conteúdo da turma -->
            <p>Aqui você verá os detalhes da turma: {{ selectClass.id }}</p>
        </div>
        {{ selectClass }}
    </main>
</template>


<script lang="ts">
export default {
    props: {
        selectClass: Object,
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>