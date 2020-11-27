<template>
    <v-data-table
      :headers= "headers"
      :items="cargoes"
      sort-by="weight"
      class="elevation-12"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Sus cargos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
            <v-spacer></v-spacer>
        <v-toolbar-items>
                    <v-select v-if="visible && roleUser==2" style="height: 10px;" 
                    dense  class="mt-5" v-model="select" :items="items" 
                    label="Filtrar por"
                    return-object @change="passSelection(select)"
                    ></v-select></v-toolbar-items>
            <v-dialog v-model="dialog" max-width="500px">
                <template>

                    <!--<v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>-->
                    
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                  <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="cargoInput.customerFirstName" label="Correo"></v-text-field>
                  </v-col>
                 
                  </v-row>
                </v-container>
              </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text>Cancel</v-btn>
                        <v-btn color="blue darken-1" text>Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn
            small
            class="success "
            left="left"
            @click="cargoManager(item)">
            <span class="mr-2">Confirmar</span>
            <v-icon> mdi-send </v-icon>
        </v-btn>
        <v-btn class="ml-5 error"
            small          
            @click="rejectItem(item)">
            <span class="mr-2">Descartar</span>
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>
    </v-data-table>
</template>

<script>
    import TsDataService from '@/services/TsDataService'
export default {
    data: () => ({
        visible: false,
        roleUser : '',
        currentCargo: null,
        dialog:false,
        valid:true,
        select: null,
        filterSelected : '',
        items: [
        'Todos',
        'Solicitados',
        'Confirmados',
        'Terminados',
        ],
        headers: [
        ],
        cargoes: [],
        currentIndex: -1,
        cargoInput :{
            serviceId: '',
            customerId: '',
            weight: '',
            description: '',
            servicePrice: '',
        },
        defaultCargo: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        selectDriver: {
            driverFirstName: '',
            driverLastName: ''
        }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      currentUser() {
        return this.$store.state.auth.user;
      },
    },

    watch:{
      dialog (val) {
            val || this.close()
      }
    },
    methods: {
        validate () {
            if(this.$ref.form.validate())
            {
                TsDataService.registerCargo(this.cargoInput);
            }
        },
        retrieveCargoes() {

          TsDataService.getAllCargoesByCustomerId(this.$store.state.auth.user.roleId)
          .then(response => {
            this.cargoes = response.data.resourceList;
            console.log(this.cargoes);
          })
        },


        retrieveRequestedCargoesByDriver() {
          TsDataService.getRequestedCargoesByDriverId(this.$store.state.auth.user.roleId)
                .then(response => {
                  this.cargoes = response.data.resourceList;
                  console.log(this.cargoes);
                })
        },
        retrieveConfirmedCargoesByDriver() {

           TsDataService.getConfirmedCargoesByDriverId(this.$store.state.auth.user.roleId)
                .then(response => {
                  this.cargoes = response.data.resourceList;
                  console.log(this.cargoes);
                })
        },
        retrieveFinishedCargoesByDriver() {
            TsDataService.getFinishedCargoesByDriverId(this.$store.state.auth.user.roleId)
                .then(response => {
                  this.cargoes = response.data.resourceList;
                  console.log(this.cargoes);
                })
        },
        setDynamicHeaders() {
            if(this.$store.state.auth.user.role==1)
            {
              this.headers = [
              { text: 'Conductor', value:'driver'},
              { text: 'Descripcion', value:'description'},
              { text: 'Estado', value:'cargoStatus'},
              { text: 'Peso', value:'weight'},
              { text: 'Precio', value:'servicePrice'},
              ]
            }
            else{
              this.headers = [
              { text: 'Cliente', value:'customer'},
              { text: 'Descripcion', value:'description'},
              { text: 'Estado', value:'cargoStatus'},
              { text: 'Peso', value:'weight'},
              { text: 'Precio', value:'servicePrice'},
              { text: 'Actions', value: 'actions', sorteable: false}
              ]  
            }
        },
        UserInfo(item) {
          this.selectDriver.driverFirstName = this.cargoes.indexOf(item).driverFirstName 
          this.selectDriver.driverLastName = this.cargoes.indexOf(item).driverLastName
          this.dialog = true
        },
        close () {
          this.dialog = false
        },
        driverProfile() {
          this.$router.push("Drivers")
        },
        passSelection(data) {
        this.filterSelected = data;
        this.cargoes = [];
      
        if(data == "Todos")
          this.retrieveCargoesByDriver();
        if(data == "Solicitados")
          this.retrieveRequestedCargoesByDriver();
        if(data == "Confirmados")
          this.retrieveConfirmedCargoesByDriver();
        if(data == "Terminados")
          this.retrieveFinishedCargoesByDriver();
        },
        rowClick: function (item, row) {  
            row.select(true);
            this.currentCargo = row.item;
        },
        cargoManager(data) {
          console.log("cargoManager : ",data);
          if(data.cargoStatus == "Awaiting")
          {
            console.log("setCargoCongirmation")
            TsDataService.setCargoConfirmation(data.id)
              .then(response => {
                this.retrieveCargoes();
                console.log("setCargoConfirmation response : ",response)
              })
          }
          if(data.cargoStatus == "In process")
          {
            console.log("setCargoDeliver")
            TsDataService.setCargoDeliver(data.id)
              .then(response => {
                this.retrieveCargoes();
                console.log("setCargoDeliver response : ",response)
              })
          }
        },
        rejectItem(data) {
          TsDataService.setCargoReject(data.id)
            .then(response => {
              this.retrieveCargoes();
              console.log("setCargoReject response : ",response)
            })
        },
        redirectManager(path) {
          this.$router.push(path).catch(()=>{});
        },  
    },
    mounted() {
      //console.log("cargo in cargoes store user : ",this.$store.state)
      if(this.$store.state.auth.user != undefined)
      {
        this.setDynamicHeaders()
        this.visible = true;
        this.retrieveCargoes();
      }
      else 
      {
        this.redirectManager("sign-in");
      }
    }
}
</script>