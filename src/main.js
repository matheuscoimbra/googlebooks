import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

const firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig);


new Vue({
    vuetify,
    store,
    router,
    render: h => h(App),
}).$mount('#app');
