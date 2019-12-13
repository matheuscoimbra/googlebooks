import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import {userKey} from "./global";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authToken: '',
        userId: '',
        logged: false,
        message: {
            text: '',
            type: '',
        },
        textSearch: '',
        use: false,
        usuario: {},
    },
    mutations: {
        addUser(state, usuario) {
            console.log('LOGIN', usuario);
            if (usuario) {
                console.log(usuario.user);
                firebase.firestore().collection('user').doc(usuario.user.uid).get()
                    .then((res) => {
                        console.log('res store', res.data());
                        state.logged = true;
                        state.usuario = res.data();
                        state.use = true;
                        localStorage.setItem(userKey, JSON.stringify(usuario));
                    })
                    .catch((err) => {
                        console.log('erro ao adc');
                    });
            } else {
                state.isMenuVisible = false;
            }
        },
        setUser(state, payload) {
            state.use = payload;
        },
        setTextSearch(state, payload) {
            state.textSearch = payload;
        },
        setAuthToken(state, payload) {
            window.localStorage.authToken = payload;
            state.authToken = payload;
            state.logged = Boolean(state.authToken);
        },
        setUserId(state, payload) {
            window.localStorage.userId = payload;
            state.userId = payload;
        },
        setLogged(state, payload) {
            state.logged = payload;
        },
        showErrorMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'ERROR',
            };
        },
        showSuccessMessage(state, payload) {
            state.message = {
                text: payload,
                type: 'SUCCESS',
            };
        },
    },
    getters: {
        getAuthToken(state) {
            return state.authToken;
        },
        getLogged(state) {
            return state.logged;
        },
        getSearch(state) {
            return state.textSearch;
        },
    },
});
