<template>
  <v-app id="inspire" style="background-color:#1565C0">
    <v-content>
      <v-container class ="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm=8 md=4>
            <v-card class="elevation-12">
              <v-toolbar dark color="skyblue" flat>
                <v-toolbar-title>Registrarse</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert type="success" v-model="registerlabelSuccess" dismissible close-text="Close Alert">
                  Se registro al usuario satisfactoriamente
                </v-alert>
                <v-alert type="error" v-model="registerlabelFailed" dismissible close-text="Close Alert">
                  No se pudo registrar al usuario
                </v-alert>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Nombre"
                    name="firstName"
                    v-model="signUpInput.firstName"
                    prepend-icon="mdi-account-plus-outline"
                    type="text"
                    :rules="nameRulesFN"
                    required
                    ></v-text-field>

                  <v-text-field
                    label="Apellidos"
                    name="lastName"
                    v-model="signUpInput.lastName"
                    :rules="nameRulesLN"
                    prepend-icon="mdi-account-plus-outline"
                    type="text"
                    required
                    ></v-text-field>
                  <v-text-field
                    label="Correo"
                    name="email"
                    v-model="signUpInput.email"
                    :rules="emailRules"
                    prepend-icon="mdi-email-check-outline"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Contraseña"
                    name="password"
                    v-model="signUpInput.password"
                    :rules="passwordRules"
                    prepend-icon="mdi-form-textbox-password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    lavel="Teléfono"
                    name="phone"
                    v-model="signUpInput.phone"
                    :rules="phoneRules"
                    prepend-icon="mdi-phone"
                    type="number"
                    required
                    ></v-text-field>
                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Tipo de usuario"
                    prepend-icon="mdi-glasses"
                    return-object @change="passSelection(select)"
                    required
                  ></v-select>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Aceptas los terminos y condiciones"
                    required
                ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  dark large color="skyblue" @click="validate">Registrarse</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import TsDataService from '@/services/TsDataService'
  export default {
    
    data: () => ({
      roleSelected :"",
      registerSuccess: '',
      valid: false,
      validFirstName: true,
      registerlabelSuccess: false,
      registerlabelFailed: false,
      nameRulesFN: [
        v => !!v || 'Nombre es requerido',
        v => (v && v.length <= 20) || 'Nombre debe contener no mas de 10 caracteres',
      ],
      validLastName: true,
      nameRulesLN: [
        v => !!v || 'Apellido es requerido',
        v => (v && v.length <= 20) || 'Apellidos debe contener no mas de 10 caracteres',
      ],
      emailRules: [
        v => !!v || 'Correo es requerido',
        v => /.+@.+\..+/.test(v) || 'Correo must be valid',
      ],
      password: '',
      passwordRules: [
         v => (v && v.length <= 16 && v.length >= 6) || 'La contraseña debe tener entre 6 y 16',
      ],
      select: null,
      phoneRules: [
        v => !!v || 'Teléfono teléfonico es requerido',
        v => (v && v.length == 9) || 'Debe ser un número valido',
      ],
      items: [
        'Cliente',
        'Driver',
      ],
      checkbox: false,
      lazy: false,
      signUpInput : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        discriminator: 0
      }
    }),
    methods: {
      validate () {
        if (this.$refs.form.validate())
        {
          if(this.roleSelected == "Cliente")
            this.signUpInput.discriminator = 1
          else
            this.signUpInput.discriminator = 2

          console.log("signUpInput : ",this.signUpInput)
          TsDataService.register(this.signUpInput)
          .then(response => {
            console.log("response : ",response);
            if(response.data.success == true)
              this.registerlabelSuccess = true;
            else
              this.registerlabelFailed = true;
          })
    
        }
        else
          this.roleSelected = "Falta validar"
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      passSelection(data) {
        this.roleSelected = data
      }
    },
  }
</script>