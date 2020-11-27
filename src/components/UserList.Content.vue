<template>
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
     @click:row="rowClick">
                <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-overlay>
    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Transportistas disponibles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
               

    <!-- DIALOG FOR INFORMATION FOR DRIVERS IN ANOTHER COMPONENT ===========================================================================================-->
            
            <v-dialog v-model="dialog" max-width="500px">
             
                <v-card style="border-radius:10px;">
                    <v-card style="border-radius:10px;">
                        <v-img height="250" src="https://besthqwallpapers.com/Uploads/10-11-2019/110694/thumb2-blue-stone-background-stone-texture-grunge-blue-background-creative-blue-texture.jpg">
                            <v-row justify="space-around">
                                <v-avatar size="150" class="ma-10">
                                    <v-img height="150" src="https://thispersondoesnotexist.com/image"></v-img>
                                </v-avatar>
                            </v-row>
                        </v-img>
                    </v-card>
             
                    <v-card-title align="center" style="text-align: center; display:block">
                        <div class="text-xs-center"> {{ formTitle }}</div>
                    </v-card-title>
                    <v-container align="center" style="padding: 5px; text-align: center;">
                        <v-card-text style="padding: 7px;"><div>Correo : {{ currentDriver.email }}</div></v-card-text>
                        <v-card-text style="padding: 7px;"><div>Nombres : {{ currentDriver.firstName }}</div></v-card-text>
                        <v-card-text style="padding: 7px;"><div>Apellidos : {{ currentDriver.lastName }}</div></v-card-text>
                        <v-card-text style="padding: 7px;">
                            <div v-if = "currentDriver.role==1" >Rol : Cliente</div>
                            <div v-else>Rol : Conductor</div>
                        </v-card-text>
                    </v-container>
                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions style="text-align: center;">
                        <v-container>
                            <v-btn color="blue darken-1" text @click="AddFavorites">Agregar a Favoritos</v-btn>
                            <v-btn color="blue darken-1" text @click="close">Volver</v-btn>
                        </v-container>
                        <v-container>
                            <v-btn color="blue darken-1" text @click="AddBlockeds">Bloquear</v-btn>
                            <v-btn color="blue darken-1" text @click="addNewCargo">Solcitar cargo</v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-dialog>
<!-- -->
    <!--DIALOG 2 FOR ADD CARGO =================================================================================================== -->

            <v-dialog v-model="dialogCargo" max-width="500px">
    
                <v-card style="border-radius:10px;">
                        <v-alert type="success" v-model="rechargeSuccess" dismissible close-text="Close Alert">
                            Solicitud de cargo enviada exitosamente
                        </v-alert>
                        <v-alert type="warning" v-model="noMoney" dismissible close-text="Close Alert">
                            No tienes saldo suficiente para solicitar el servicio
                        </v-alert>
                    <v-card style="border-radius:10px">
                    </v-card>
                    <v-card-title align="center" style="test-align: center; display:block">
                        <div class="text-xs-center">Nuevo cargo</div>
                    </v-card-title>
                    <v-container align="center" style="padding: 5px; text-align: center;">
                        <v-col><v-text-field v-model="cargoInput.description" label="Descripcion"></v-text-field></v-col> 
                        <v-col><v-text-field type="number" v-model="cargoInput.servicePrice" label="Precio"></v-text-field></v-col> 
                        <v-col><v-text-field type="number" v-model="cargoInput.weight" label="Peso"></v-text-field></v-col> 
                    </v-container>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title align="center" style="test-align: center; display:block">
                        <div class="text-xs-center">Destino de la carga</div>
                    </v-card-title>
                     <v-card-subtitle align="center" style="test-align: center; display:block">
                        <div class="text-xs-center">Ingrese la ubicación de destino de la carga</div>
                     </v-card-subtitle>
                    <v-divider class="mx-4"></v-divider>

                         <gmap-map
                            :center="myCoordinates"
                            :zoom="zoom"
                            style="width: 100%; height: 500px"
                            ref="mapRef"
                            >
                            <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :title="m.title"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                            ></gmap-marker>
                        </gmap-map>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions style="text-align: center;">
                        <v-container>
                            <v-btn color="blue darken-1" text @click="requestCargoService">Solicitar Servicio</v-btn>
                            <v-btn color="blue darken-1" text @click="close">Volver</v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-dialog>

    <!--=================================================================================================================================== -->       
        </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn small class="warning" fab left="left" @click="editItem(item)">
            <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn class="ml-5 error" small fab @click="deleteItem(item)">
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>
    </v-data-table>

</template>

<script>
import TsDataService from '@/services/TsDataService'
export default {
    name: 'UsersList',
    data: ()=>({
        dialog: false,
        dialogCargo: false,
        rechargeSuccess: false,
        noMoney: false,
         overlay: false,
        headers: [
            { text: 'FirstName', value: 'firstName' },
            { text: 'LastName', value: 'lastName' },
            { text: 'Email', value: 'email' },
            { text: 'Role', value: 'role'},
            { text: 'Actions', value: 'actions', sorteable: false}
        ],
        users: [],
        currentDriver: {
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            id: ''
        },
        cargoInput : {
            weight: '',
            description: '',
            servicePrice: '',
            serviceId: '',
        },
        currentIndex: -1,
        map: null,
        myCoordinates: {
            lat: 0,
            lng:0
        },
        zoom: 16,
        markers: [{
          position: {lat: 0, lng: 0},
          title: 'googleMapsAPI'}]
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Informacion de conductor'
        },
        mapCoordinates() {
            if(!this.map) {
                return {
                    lat:0,
                    lng:0
                };
            }
            return {
                lat: this.map.getCenter().lat().toFixed(4),
                lng: this.map.getCenter().lng().toFixed(4)
            }
        }
    },

    watch: {
        dialog (val) {
            console.log(val)
            val || this.close()
        },
        dialogCargo (val) {
              val || this.close()
        }
    },

    methods: {
        retrieveDrivers() {
            TsDataService.getAllDrivers()
                .then(response => {
                    this.users = response.data.resourceList;
                    console.log(this.users);
                })
                .catch(e => {
                    console.log(e);
                });
        },
 
        refreshList() {
                this.retrieveDrivers();
                this.currentDriver = null;
                this.currentIndex = -1;
        },
        requestCargoService() {
            TsDataService.getSomeService(this.currentDriver.roleId)
                        .then(response => {
                            console.log("getService : ", response);
                            this.cargoInput.serviceId = response.data.resource.id;
                            console.log("cargoInput : ", this.cargoInput);
                            TsDataService.setRequestCargo(this.$store.state.auth.user.roleId ,this.cargoInput)
                                    .then(response => {
                                    if(response.data.success == true)
                                    {
                                        console.log("set Request Cargo", response);
                                        this.rechargeSuccess = true; 
                                        console.log("cargo delivered");
                                    }
                                    else
                                    {
                                        this.noMoney = true;
                                    }
                                })
                        
                        })
        },
        rowClick: function (item, row) {  
            row.select(true);
            this.currentDriver = row.item;
            this.dialog = true
            console.log("currentDriver",this.currentDriver);
        },
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this item?'+item)
        },
        addNewCargo () {
            this.dialog = false;
            this.dialogCargo = true;
        },
        AddFavorites () {
            TsDataService.setFavorite(this.$store.state.auth.user.id,this.currentDriver.id)
                .then( response => {
                    console.log("response", response);
                    console.log("Add favorites success");
                })
        },
        AddBlockeds () {
            TsDataService.setBlocked(this.$store.state.auth.user.id,this.currentDriver.id)
                .then(() => {
                    console.log("Add BlockList success");
                })
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedIndex = -1
            })
        },
        save () { 
        },
        redirectManager(path) {
          this.$router.push(path).catch(()=>{});
        },
        handleDrag() {
            let center = {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            }
            let zoom = this.map.getZoom();
            localStorage.center = JSON.stringify(center)
            localStorage.zoom = zoom
            this.map.markers[0].position = center
        }
    },
    mounted() {
        if(this.$store.state.auth.user != undefined)
        {
            this.retrieveDrivers();
        }
        else
        {
            this.redirectManager("sign-in");
        }
    },
    created() {

        if(localStorage.center) {
            this.myCoordinates = JSON.parse(localStorage.center);
        } else {
            this.$getLocation({}).
                then(coordinates =>{
                    this.myCoordinates = coordinates,
                    this.markers.forEach(element => {
                        element.position = coordinates 
                    });
                })
        .catch(error => alert(error));

        if(localStorage.zoom) {
            this.zoom = localStorage.zoom;
        }

        }
    }
}
</script>


<style scoped>
  tr.v-data-table__selected {
    background: #3450dd !important;
  }
</style>