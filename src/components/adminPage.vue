<template>
    <div class="m-2 parent w-full h-full p-4">
        <asideTab class="uperTab h-full" @newTab="(newValue)=>activeTab=newValue"/>
        <main class="p-[2px] pt-0 place-self-center m-0 w-full h-full bg-white restContent">
            <transition-group name="fade">
                <studentTab v-show="activeTab === 'estudantes'" 
                />
                <contentTab v-show="activeTab === 'conteudo'" 
                />
                <usersTab   v-show="activeTab === 'usuarios'" 
                />
            </transition-group >

            <dataInfo class="m-0 p-2"/>
        </main>
    </div>
</template>

<script lang="ts">
import contentTab from './adminPage/contentTab.vue'
import studentTab from './adminPage/studentTab.vue'
import usersTab from './adminPage/usersTab.vue'
import asideTab from './adminPage/upsideTab.vue'
import dataInfo from './adminPage/showData.vue'

export default {
    components:{
        contentTab,
        studentTab,
        usersTab,
        asideTab,
        dataInfo
    },
    data() {
        return {
            activeTab: "estudantes", // Initial tab is "students"
            actualClass: '1',
        };
    }
}
</script>

<style>
.fade-enter-to {
    transition: opacity 0.1s;
    transition-delay: 0.4s; 
    transition-timing-function: linear;
}
.fade-leave-active {
    transition: opacity 0.1s linear;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}

.parent {
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 0.1fr 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.uperTab { grid-area: 1 / 1 / 2 / 2; }
.restcontent { grid-area: 2 / 1 / 3 / 2; } 

</style>