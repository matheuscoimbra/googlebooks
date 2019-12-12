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
                            v-model="nome"
                            filled
                            :counter="10"
                            :rules="[rules.length]"
                            color="deep-purple"
                            label="Nome"
                    />

                    <v-text-field
                            v-model="email"
                            :rules="[rules.email]"
                            filled
                            color="deep-purple"
                            label="Email"
                            type="email"
                    />



                    <v-text-field
                        v-model="phone"
                        filled
                        color="deep-purple"
                        label="Teledone"
                    />

                    <v-text-field
                            v-model="password"
                            :rules="[rules.password, rules.length]"
                            filled
                            color="deep-purple"
                            :counter="10"
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
    import firebase from 'firebase'

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
                    length: v => (v && v.length <= 10) || 'Tamanho incorreto',
                    password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
                        || 'A senha deve conter uma letra maiúscula, um caractere numérico e um caractere especial',
                    required: v => !!v || 'This field is required',
                },
            };
        },
        methods: {
            registrar() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((created) => {
                        created.user.sendEmailVerification().then((user) => {
                            firebase.firestore().collection("user").doc(created.user.uid).set({
                                name: this.nome,
                                email: this.email,
                            }).then((res)=>{
                                console.log("cadastrando",created)
                                this.$store.commit('showSuccessMessage', 'Cadastro realizado com sucesso!');
                                this.$store.commit('setAuthToken', this.password);
                                this.$store.commit('setUserId', this.email);
                                this.$router.push('/book');

                            }).catch((err) => {
                                this.$store.commit('showErrorMessage', 'Erro ao cadastrar');
                            })
                        });
                    }).catch((error) => {
                    this.$store.commit('showErrorMessage', 'Erro ao cadastrar');
                });
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
