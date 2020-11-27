<template>
    <div id="app">
  <v-app id="inspire">
    <v-parallax src="https://www.xtrafondos.com/wallpapers/lienzo-azul-3424.jpg" height="100%" class="parallax">
    <v-container >
              <v-row align="center" justify="center">
                  <v-col cols="12" sm="8" md=4>
                      <v-card class="elevation-12">
                          <v-toolbar dark color="skyblue" flat>
                            <v-toolbar-title>Configuración</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-card-text>
                              
                              <v-form ref="form" v-model="valid" lazy-validation>
                                <v-alert type="success" v-model="updateConfigurationSuccess" dismissible close-text="Close Alert">
                                    Se actualizo la configuración y los datos satisfactoriamente
                                </v-alert>
                                <v-alert type="error" v-model="updateConfigurationFailed" dismissible close-text="Close Alert">
                                    No se pudo realizar la actualizacion de informacion
                                </v-alert>
                                <v-label>Configuracion del usuario</v-label>
                                <v-text-field label="Nombres" name="firstName" v-model="settingsInput.firstName" prepend-icon="mdi-message-cog" type="text" required></v-text-field>
                                <v-text-field label="Apellidos" name="lastName" v-model="settingsInput.lastName" prepend-icon="mdi-message-cog" type="text" required></v-text-field> 
                                <v-text-field label="Teléfono" name="mobilePhone" v-model="settingsInput.phone" prepend-icon="mdi-phone" type="text" required></v-text-field> 
                                <v-divider class="mx-4 my-5"></v-divider>
                                <v-label class="ma-4">Configuracion de la cuenta</v-label>
                                <v-text-field label="Lenguaje" name="language" v-model="settingsInput.language" prepend-icon="mdi-book-variant-multiple" type="text" required></v-text-field>
                                <v-text-field label="Tipo de moneda" name="paymentCurrency" v-model="settingsInput.paymentCurrency" prepend-icon="mdi-bitcoin" type="text" required></v-text-field> 
                              </v-form>
                          </v-card-text>
                        <v-divider class="mx-4"></v-divider>

                          <v-card-actions style="text-align: center;">
                              <v-container>
                                <v-container>
                                    <v-btn color="warning darken-1" text @click="returnBack">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="updateSettings">Actualizar</v-btn>
                                </v-container>      
                              </v-container>
                          </v-card-actions>
                      </v-card>
                  </v-col>
              </v-row>
          </v-container></v-parallax>
  </v-app>
</div>
</template>

<script>
import TsDataService from '@/services/TsDataService'
export default {
    data: () => ({
        valid:false,
        updateConfigurationSuccess: false,
        updateConfigurationFailed: false,
        settingsInput : {
            firstName: '',
            lastName: '',
            phone: '',
            language: '',
            paymentCurrency: ''
        },
        userInfoInput : {
            phone: '',
        },
        peopleInfoInput : {
            firstName: '',
            lastName: '',
        }

    }),
    methods: {
        retrieveSettings() {
            TsDataService.getConfiguration(this.$store.state.auth.user.id)
            .then(response => {
                this.settingsInput = response.data.resource;
            })
        },
        updateSettings() {
            if(this.$refs.form.validate())
            {
                TsDataService.updateConfiguration(this.$store.state.auth.user.id,this.settingsInput)
                .then(response => {
                    console.log(response);
                    TsDataService.update 
                    this.updateConfigurationSuccess = true;
                })
            }
            else{
                this.updateConfigurationFailed = true;
            }
        },
        returnBack() {
            this.$router.push('/profile')
        },
        redirectManager(path) {
          this.$router.push(path).catch(()=>{});
        }, 
    },
    mounted() {
        if(this.$store.state.auth.user != undefined)
        {
            this.retrieveSettings();
        }
        else
        {
            this.redirectManager("sign-in");
        }
    }
}
</script>
<style>
.parallax {
    width:100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    margin:0px;
 }
</style>