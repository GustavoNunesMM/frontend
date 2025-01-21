<template>
    <header>
        <ul class="flex flex-row h-full bottom-0">
            <li v-for="(tabs, index) in possibleTab" :key="index" class="bar-top" 
            :class="{'bar-top-d': activeTab !== tabs,'ml-0':index==0}" @click="trownNewTab( tabs )">
                <p class="text-top">{{ tabs }}</p>
            </li>
        </ul>
    </header>
</template>

<script lang="ts">
export default{
    data() {
        return {
            possibleTab: ['estudantes', 'conteudo', 'usuarios'],
            activeTab: "estudantes"
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