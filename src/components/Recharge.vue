<template>
    <v-data-table
      :headers= "headers"
      :items= "paymentMethods"
      sort-by="weight"
      class="elevation-12"
      @click:row= "rowClick"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Sus tarjetas disponibles</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-label>Créditos disponibles : S/.{{ creditsMount }}</v-label>
            <v-spacer></v-spacer>

      <!-- 1er dialogo para el registro de metodos de pago  ===========================================================-->

            <v-dialog v-model="addPaymentMehtodDialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="skyblue" dark class="ma-2" v-on="on">Agregar +</v-btn>
                    <v-btn color="warning" dark class="ma-2" @click="returnProfile">Volver</v-btn>
                </template>
                <v-card style="border-radius:10px;max-height:100%;">
                    <v-toolbar dark color="skyblue" flat>
                        <v-toolbar-title>Registrar nuevo metodo de pago</v-toolbar-title>
                        <v-spacer></v-spacer>
                        
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-alert type="success" v-model="addPaymentSuccess" dismissible close-text="Close Alert">
                                    Se agrego un nuevo método de pago satisfactoriamente
                            </v-alert>
                            <v-alert type="error" v-model="addPaymentFailed" dismissible close-text="Close Alert">
                                    No se pudo realizar el registro del método de pago
                            </v-alert>
                            <v-select
                            v-model="select"
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            label="Tipo de usuario"
                            prepend-icon="mdi-glasses"
                            return-object @change="passSelection(select)"
                            required
                        ></v-select>
                        <v-text-field
                            v-model="rechargeInput.accountNumber"
                            :rules="[v => !!v || 'Numero de tarjeta es requerido',
                            v => (v && v.length == 16) || 'Número de tarjeta debe tener 16 dígitos']"
                            label="Numero de tarjeta"
                            name="number"
                            prepend-icon="mdi-lock"
                            type="number"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="rechargeInput.swiftCode"
                            :rules="[v => !!v || 'CVV de la tarjeta es requerido',
                            v => (v && v.length == 3) || 'cvv debe tener 3 digitos']"
                            label="cvv"
                            name="cvv"
                            prepend-icon="mdi-lock"
                            type="number"
                            required
                        ></v-text-field>
                        <v-text-field disabled prepend-icon="mdi-lock" v-model="exp"></v-text-field>
                            <v-row justify="center">
                            <v-date-picker color="skyblue" type="month" v-model="exp"></v-date-picker>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark large color="skyblue" @click="addPaymentMethod">Registrar tarjeta</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

      <!--2do Dialogo para agregar los listener de los objetos =========================================================================================-->

            <v-dialog v-model="rechargeCreditsdialog" max-width="500px">
                <v-card style="border-radius:10px;max-height:100%;">
                    <v-toolbar dark color="skyblue" flat>
                        <v-toolbar-title>Registrar nuevo metodo de pago</v-toolbar-title>
                        <v-spacer></v-spacer>
                        
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="formRecharge" v-model="validRecharge" lazy-validation>
                            <v-alert type="success" v-model="rechargeSuccess" dismissible close-text="Close Alert">
                                  Transaccion realizada satisfactoriamente
                            </v-alert>
                            <v-alert type="error" v-model="rechargeFailed" dismissible close-text="Close Alert">
                                  No se pudo realizar la transaccion                                    
                            </v-alert>                      
                        <v-text-field
                            v-model="mountCredits"
                            :rules="[v => !!v || 'Ingrese un monto para recargar']"
                            label="Monto a recargar"
                            name="amount"
                            prepend-icon="mdi-lock"
                            type="number"
                            required
                        ></v-text-field>
                    
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark large color="skyblue" @click="rechargeCredits">Recargar créditos</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
      <!-- =======================================================================================================================================================-->
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn
            small
            class="warning"
            fab
            left="left"
            @click= "editItem(item)">
            <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn class="ml-5 error"
            small
            fab
            @click= "deleteItem(item)">
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>
    </v-data-table>
</template>

<script>
import TsDataService from '@/services/TsDataService'
export default {
        data: () => ({
            paymentMethods: [],
            addPaymentMehtodDialog: false,
            rechargeCreditsdialog: false,
            creditsMount: '',
            formTitle: "Agregar nueva tarjeta",
            headers: [
              {text:'Banco', value:'bankName'},
              {text:'Numero de tarjeta', value:'accountNumber'},
              {text:'Swift code',value:'swiftCode'},
              {text:'cvv', value:'dni' },

            ],
              
            exp: '',
            select: '',
            mountCredits: '',
            valid : false,
            validRecharge: false,
            lazy: false,
            rechargeSuccess : false,
            rechargeFailed : false,
            addPaymentSuccess : false,
            addPaymentFailed : false,
            currentPaymentMethod: '',
            rechargeInput : {
                bankName : '',
                accountNumber : '',
                swiftCode : '',
                billingAdress : '',
            },
            items: [
                'Visa',
                'Master-Card',
                'Dinners Club',
            ],

        }),
        methods: {
            retrievePaymentMethodList () {
                TsDataService.getPaymentMethods(this.$store.state.auth.user.id)
                .then(response => {
                  if(response.data.success == true)
                  {
                    this.paymentMethods = response.data.resourceList; 
                    console.log("Payment method : ",response.data.resourceList);

                    TsDataService.getCustomerById(this.$store.state.auth.user.id)
                    .then(response => {
                        if(response.data.success == true)
                        {
                            this.creditsMount = response.data.resource.credits;
                        }
                    })
                  }
                })
            },
            rechargeCredits () {              
                if(this.$refs.formRecharge.validate())
                {

                    TsDataService.rechargeCredits(this.$store.state.auth.user.roleId, this.mountCredits)
                        .then(response => {
                            if(response.data.success==true)
                                {
                                    this.rechargeSuccess = true;
                                    this.retrievePaymentMethodList()
                                    console.log("auth.user :",response.data)
                                }
                            else
                                this.rechargeFailed = true;
                        })
                    
                }
                else
                {
                    console.log("Fallo");
                }
            },
            

            addPaymentMethod () {
                console.log("press ",this.rechargeInput);
                this.rechargeInput.billingAdress= "Av. Lost heroes 2212";
                
                    TsDataService.addPaymentMethod(this.$store.state.auth.user.id, this.rechargeInput)
                    .then(response => {
                         if(response.data.success==true)
                        {
                            this.addPaymentSuccess = true;
                            this.retrievePaymentMethodList();
                            
                        }
                        else
                            this.addPaymentFailed = true;
                    
                    })
                
            },
            editItem(data) {
                console.log(data);
            },

            deleteItem(data) {
                console.log(data);
            },

            passSelection(data) {
                this.rechargeInput.bankName = data
            },
            rowClick: function (item, row) {  
                row.select(true);
                this.currentPaymentMethod = row.item;
                this.rechargeCreditsdialog = true
            },
            returnProfile() {
              this.$router.push("/profile");
            },
            redirectManager(path) {
                this.$router.push(path).catch(()=>{});
            }, 
        },   
        mounted () {
            if(this.$store.state.auth.user != undefined)
            {
                this.retrievePaymentMethodList();
            }
            else
            {
                this.redirectManager("sign-in");
            }
        } 
      }

</script>

<style>
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}

</style>