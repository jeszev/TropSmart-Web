import Vue from 'vue'
import App from './App.vue'
import UserList from './components/UserList.Content.vue'
import Cargoes from './components/Cargoes.vue'
import Favorites from './components/Favorites.vue'
import Blockeds from './components/Blockeds.vue'
import Reviews from './components/Reviews.vue'
import router from './router'
import store from './store'
import * as VeeValidate from 'vee-validate';
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps"
import VueGeolocation from "vue-browser-geolocation"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
    apiKey: "AIzaSyDIuoDQEzQnSjw2rVTaKDku7CqnwMB9u_Y",
    authDomain: "tropsmart-web.firebaseapp.com",
    databaseURL: "https://tropsmart-web.firebaseio.com",
    projectId: "tropsmart-web",
    storageBucket: "tropsmart-web.appspot.com",
    messagingSenderId: "444949515099",
    appId: "1:444949515099:web:393397d43c864a868f287e",
    measurementId: "G-9QXM46YP04"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = true

// alias
Vue.prototype.$analytics = firebase.analytics();

library.add(faSpinner)

Vue.use(VeeValidate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('UserList',UserList)
Vue.component('Cargoes',Cargoes)
Vue.component('Favorites',Favorites)
Vue.component('Blockeds',Blockeds)
Vue.component('Reviews',Reviews)

Vue.use(VueGeolocation)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBHCaJ3u8hCupAOseswZKBbanVyBZraJ1A'
  }
})


new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  render: h => h(App)
}).$mount('#app')
