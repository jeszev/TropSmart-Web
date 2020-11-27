
<!--Aplication main view-->
<template>
  <v-app id="inspire">
  
    <v-navigation-drawer v-model="drawer" app clipped :src="bg">
        <v-list dense nav class="py-0" v-if= "this.$store.state.auth.user" >
          <v-list-item >
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ this.$store.state.auth.user.firstName }}</v-list-item-title>
              <v-list-item-subtitle v-if="this.$store.state.auth.user.role == 1">Cliente</v-list-item-subtitle>
              <v-list-item-subtitle v-else >Conductor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title e @click= "redirectManager(item.route)">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
           <div class="ma-5" style="text-align:center; justify:center;" v-else>
        <h3>Inicia sesion para ver funcionalidades</h3>
      </div>
      </v-navigation-drawer>
 
        <v-content>
        <router-view/>
      </v-content>

    <div class="v-content" fluid data-booted="true" style="padding: 56px 0xp 36px;">
    <v-app-bar app clipped-left >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="secondary--text" style="text-style:bold"></v-toolbar-title>
        <a class="navbar-brand">TropSmart</a> 
      <v-spacer></v-spacer>
      <v-btn class="ml-5" dark large color="#007BFF" :to="{name: 'SignUp'}" v-if="!this.currentUser()">
        <span class="mr-2" >Registrar</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn  class="ml-5" dark large color="#007BFF" ref="signInButtonRef" @click="signManager">
        <span class="mr-2" v-if= "this.$store.state.auth.user">Cerrar Sesión</span>
        <span class="mr-2" v-else>Ingresar</span>
      <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    </div>


    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
//import { EventBus } from '../services/event-bus.js';
  export default {
    name: 'App',
    components: {},
    computed: {

      bg () {
        return this.background ? 'https://image.freepik.com/vector-gratis/tecnologia-interfaz-fondo-abstracto_5205-97.jpg' : undefined
      },
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      signInState: "Ingresar",
      payToUse: 'a',
      items: [],
      items1: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' , route: '/profile'},
          { title: 'Landing Page', icon: 'mdi-view-dashboard', route: '/'},
          { title: 'Mi cuenta', icon: 'mdi-image', route: '/profile' },
          { title: 'Recargar créditos' , icon: 'mdi-currency-usd-circle', route: '/recharge'},
          { title: 'Configuración', icon: 'mdi-help-box', route: '/settings' },
      ],
      items2: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' , route: '/profile'},
          { title: 'Landing Page', icon: 'mdi-view-dashboard', route: '/'},
          { title: 'Mi cuenta', icon: 'mdi-image', route: '/profile' },
          { title: 'Administrar subscripciones' , icon: 'mdi-currency-usd-circle', route: '/subscriptions'},
          { title: 'Configuración', icon: 'mdi-help-box', route: '/settings' },
          { title: 'Notificación', icon: 'mdi-check-all', route: '/notification' },
      ],
      color: 'primary',
      colors: [ 'primary', 'blue', 'success', 'red', 'teal', ],

    }),
    created () {
      console.log("created")
      console.log("this.current user : ", this.$store.state.auth.user)
      this.$vuetify.theme.light = true
      this.currentUser? this.signInState = "Cerrar sesión": this.signInState = "Ingresar";

    },
    //try to get difente behaviour from the same this
    mounted(){
      console.log("status : ",this.$store.state.status);
      if(this.$store.state.auth.user != undefined)
      {
        if(this.$store.state.auth.user.role == 1)
          this.items = this.items1;
        else
          this.items = this.items2;
        this.redirectManager("profile");
      }
    },
    methods:{
        logout() {
          this.$store.dispatch('auth/logout');
          this.$router.push('/login');
        },
        currentUser() {
          console.log("currentUser : ", this.$store.state.auth.user)
        return this.$store.state.auth.user;
        },
        signManager() {
          if(this.currentUser){
            console.log("signManager : ", this.$store.state.auth.user);
            this.logout();
          }
          //enabled this  fofor shouting enviroment can increse the status fromr this enviroment development ulsnfa_
          //setting this across platform guarantize the entire desemvolpment for run queries and 
          //enusfa_eoaplf enalibnf form shout formartan dn next is transform this user into multiple instances from the same user 
          //this.$router.push("/sign-in")
          //shouting and develop for some reasons are quite disapointer because 
            this.$router.push("/sign-in")
            this.$refs.signInButtonRef.innerText = this.currentUser? this.signInState = "Cerrar sesión": this.signInState = "Ingresar";
            console.log("signInState : ",this.signInState)
        },
        refreshParent(variable) {
          console.log(variable)
            this.$refs.signInButtonRef.innerText = this.currentUser? this.signInState = "Cerrar sesión": this.signInState = "Ingresar";
        },
        redirectManager(path) {
            this.$router.push(path).catch(()=>{});
        },  
    },
    
  }
</script>


