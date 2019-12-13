<template>
    <div>
        <div class="spacing-playground py-2" />
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
                            :rules="[rules.length]"
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
                            @click="loginAsGuest"
                        >
                            Entrar Como Visitante
                        </v-btn>
                        <v-spacer />
                        <v-btn
                            :disabled="!form"
                            :loading="isLoading"
                            class="white--text"
                            color="deep-purple accent-4"
                            depressed
                            @click="login"
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
                            :counter="45"
                            :rules="[rules.lenName]"
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
                            label="Telefone"
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
                            depressed
                            @click="registrar"
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
    import firebase from 'firebase';

    export default {
        name: 'LoginPage',
        data() {
            return {
                userId: '',
                token: '',
                lazy: false,
                nome: '',
                senha: '',
                user: {},
                agreement: false,
                email: undefined,
                form: false,
                isLoading: false,
                password: undefined,
                phone: undefined,
                rules: {
                    email: v => (v || '').match(/@/) || 'Informe um email válido',
                    length: v => (v && v.length <= 10) || 'Tamanho incorreto',
                    lenName: v => (v && v.length >= 10) || 'Tamanho incorreto',
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
                            firebase.firestore().collection('user').doc(created.user.uid).set({
                                name: this.nome,
                                email: this.email,
                            })
                                .then((res) => {
                                    console.log('cadastrando', created);
                                    this.$store.commit('addUser', created);
                                    this.$store.commit('showSuccessMessage', 'Cadastro realizado com sucesso!');
                                    this.$router.push('/book');
                                })
                                .catch((err) => {
                                    this.$store.commit('showErrorMessage', 'Erro ao cadastrar');
                                });
                        });
                    }).catch((error) => {
                        this.$store.commit('showErrorMessage', 'Erro ao cadastrar');
                    });
            },
            login() {
                if (this.senha && this.token) {
                    this.user.email = this.token;
                    this.user.senha = this.senha;
                    console.log(this.user)
                    this.user = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithEmailAndPassword(this.token, this.senha)
                        .then((user) => {
                            this.$store.commit('addUser', user);
                            this.$store.commit('showSuccessMessage', 'Login realizado com sucesso!');
                            this.$router.push('/book');
                        }).catch((e) => {
                            console.log(e)
                            this.$store.commit('showErrorMessage', (e.message == 'The password is invalid or the user does not have a password.') ? 'Usuário ou senhas inválidos' : 'não foi possível realizar logon, tente novamente mais tarde...');
                        });
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
