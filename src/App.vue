<template>
    <v-app>
        <v-container>
            <login-page/>
        </v-container>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld';
    import LoginPage from './components/login/LoginPage';

    export default {
        name: 'App',

        components: {
            HelloWorld, LoginPage,
        },

        data: () => ({
            //
        }),
    };
</script>
