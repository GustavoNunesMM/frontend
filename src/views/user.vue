<template>
    <div>
        CHAPOLINHO
        user {{ id }}
        <button @click="logout()" class="btn-primary">Logout</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
    data() {
        return {
            
        }
    },
    props: ['id'],
    methods: {
        logout() {
            axios.get('http://localhost:3000/user/logout')
                .then(() => this.$router.push({ name: 'Home'}))
                .catch(e => console.log("Erro ao realizar logout"))
        }
    }
}
</script>
