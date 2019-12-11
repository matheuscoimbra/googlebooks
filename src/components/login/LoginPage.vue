<template>
    <div >
    <div class="spacing-playground py-2"></div>
    <v-card
        class="mx-auto"
        style="max-width: 500px;"
    >

        <v-tabs
            fixed-tabs
            background-color="indigo"
            dark
        >
            <v-tab>Login</v-tab>
            <v-tab-item>
                <v-form
                        ref="form"
                        v-model="form"
                        class="pa-4 pt-6"
                >
                    <v-text-field
                            v-model="token"
                            :rules="[rules.email]"
                            filled
                            color="deep-purple"
                            label="Email address"
                            type="email"
                    />
                    <v-text-field
                            v-model="senha"
                            :rules="[rules.password, rules.length(6)]"
                            filled
                            color="deep-purple"
                            counter="6"
                            label="Password"
                            style="min-height: 96px"
                            type="password"
                    />

                </v-form>
                <v-divider />
                <v-card-actions>
                    <v-btn
                            text
                            @click="loginAsGuest"
                    >
                        Entrar Como Visitante
                    </v-btn>
                    <v-spacer />
                    <v-btn
                            @click="login"
                            :disabled="!form"
                            :loading="isLoading"
                            class="white--text"
                            color="deep-purple accent-4"
                            depressed
                    >
                        Login
                    </v-btn>
                </v-card-actions>
            </v-tab-item>
            <v-tab>Registrar</v-tab>

            <v-tab-item>
                <v-form
                    ref="form"
                    v-model="form"
                    class="pa-4 pt-6"
                    :lazy-validation="lazy"
                >
                    <v-text-field
                            v-model="email"
                            :rules="[rules.email]"
                            filled
                            color="deep-purple"
                            label="Email address"
                            type="email"
                    />

                    <v-text-field
                        v-model="phone"
                        filled
                        color="deep-purple"
                        label="Phone number"
                    />

                    <v-text-field
                            v-model="password"
                            :rules="[rules.password]"
                            filled
                            color="deep-purple"
                            counter="6"
                            label="Password"
                            style="min-height: 96px"
                            type="password"
                    />

                </v-form>
                <v-divider />
                <v-card-actions>
                    <v-btn
                        text
                        @click="$refs.form.reset()"
                    >
                        Limpar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        :disabled="!form"
                        :loading="isLoading"
                        class="white--text"
                        color="deep-purple accent-4"
                        @click="registrar"
                        depressed
                    >
                        Registrar
                    </v-btn>
                </v-card-actions>
            </v-tab-item>

        </v-tabs>
    </v-card>
    </div>
</template>

<script>
    export default {
        name: 'LoginPage',
        data() {
            return {
                userId: '',
                token: '',
                lazy: false,
                nome: '',
                senha: '',
                agreement: false,
                email: undefined,
                form: false,
                isLoading: false,
                password: undefined,
                phone: undefined,
                rules: {
                    email: v => (v || '').match(/@/) || 'Informe um email válido',
                    length: len => v => (v || '').length >= len || `Tamanho necessário incorreto ${len}`,
                    password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
                        || 'A senha deve conter uma letra maiúscula, um caractere numérico e um caractere especial',
                    required: v => !!v || 'This field is required',
                },
            };
        },
        methods: {
            registrar() {
                alert('registrar');
            },
            login() {
                if (this.senha && this.token) {
                    this.$store.commit('setAuthToken', this.senha);
                    this.$store.commit('setUserId', this.token);
                    this.$router.push('/book');
                } else {
                    this.$store.commit('showErrorMessage', 'Você deve informar um ID de Usuário e um Token');
                }
            },
            loginAsGuest() {
                this.$store.commit('setLogged', true);
                this.$router.push('/book');
            },
        },
    };
</script>

<style scoped>

</style>
