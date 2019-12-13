<template>
    <v-app>
        <app-header />

        <v-content>
            <router-view />
        </v-content>

        <feedback />
    </v-app>
</template>

<script>
    import apiConfig from './components/api/apiConfig';
    import { userKey } from './global';
    import AppHeader from './components/header/AppHeader.vue';
    import Feedback from './components/feedback/Feedback.vue';

    export default {
        name: 'App',
        components: { AppHeader, Feedback },
        mixins: [apiConfig],
        created() {
            this.createInterceptors();
            const json = localStorage.getItem(userKey);
            const userData = JSON.parse(json);
            console.log('STORAGE', userData);
            if (userData) {
                this.$store.commit('addUser',userData);
                this.$store.commit('setUser', true);
                this.$store.commit('setLogged', true);
            } else {
                this.$router.push('/');
            }
        },
    };
</script>
