<template>
    <v-app-bar
        app
        dark
        flat
        color="secondary"
    >
        <v-toolbar-title>Google Books {{this.user?'-'+this.user:''}}</v-toolbar-title>

        <v-spacer />
        <v-toolbar-items v-if="$store.state.logged">
            <v-btn
                text
                @click="goToBookList"
            >
                Livros
            </v-btn>
            <v-btn
                v-if="$store.state.use"
                text
                @click="goToCollection"
            >
                Minha Coleção
            </v-btn>
            <v-btn
                    v-if="$store.state.use"
                    text
                    @click="goToTeste"
            >
                Teste
            </v-btn>
            <v-btn
                text
                @click="logout"
            >
                Sair
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
    import {userKey} from "../../global";

    export default {
        name: 'AppHeader',
        data() {
            return {
                user: '',
            };
        },
        created() {
            this.user = this.$store.state.usuario.name

        },
        methods: {
            goToBookList() {
                this.$router.push('/book');
            },
            goToCollection() {
                this.$router.push('/library');
            },
            goToTeste() {
                this.$router.push('/teste');
            },
            logout() {
                localStorage.clear();
                this.$store.state.logged = false;
                this.$store.state.use = false;
                this.$store.state.usuario = {};
                this.$router.push('/');
            },
        },
    };
</script>

<style scoped>

</style>
