<template>
  <v-data-table
    :headers = "headers"
    :items = "subscriptionDone"
    sort-by = "weight"
    class = "elevation-12"
    @click:row = "rowClick"
    >
    <template v-slot:top>
        <v-toolbar flat color = "white">
            <v-toolbar-title>Los planes de subscripcion disponibles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

        <!-- 1er dialogo: Agregar nueva subscripcion (De una lista de subscripciones)-->

            <v-dialog v-model="SelectNewSubscription" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="skyblue" dark class="ma-2" @click="getPlanList()" v-on="on">Agregar +</v-btn>
                    <v-btn color="warning" dark class="ma-2" @click="redirectManager('profile')">Volver</v-btn>
                </template>
                <v-card style="border-radius:10px; max-height: 100%;">
                    <v-toolbar dark color="skyblue" flat>
                        <v-toolbar-title>Elige el plan de suscripcion que deseas</v-toolbar-title>
                    </v-toolbar>
                    <template>
                        <v-data-table 
                        :headers = "headersPlan"
                        :items = "subscriptionPlans"
                        sort-by = "weight"
                        class = "elevation-12"
                        @click:row = "rowClick"
                        >
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn small class="warning" left="left" @click="selectPlan(item)">
                                    <span class="mr-2">Suscribirse</span>
                                    <v-icon> mdi-subdirectory-arrow-right </v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </template>
                </v-card>

            </v-dialog>
        </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn small class="warning" left="left" @click="activePlan(item)">
            <span class="mr-2"> Activar</span> <v-icon> mdi-check </v-icon>
        </v-btn>
    </template>
  </v-data-table> 
</template>

<script>
import TsDataService from '@/services/TsDataService'
export default {
    data: () => ({
        SelectNewSubscription: false,
        subscriptionPlans: [],
        subscriptionDone: [],
        headers:[
            { text: 'Nombre', value: 'plan'},
            { text: 'Precio (S/.)', value: 'price'},
            { text: 'Estado', value: 'state'},
            { text: 'Actions', value: 'actions', sorteable: false}
        ],
        headersPlan:[
            { text: 'Nombre', value: 'planName'},
            { text: 'Duracion (días)', value: 'durationDays'},
            { text: 'Precio', value: 'price'},
            { text: 'Actions', value: 'actions', sorteable: false}
        ]
    }),
    methods: {
        retrieveSubscriptionsDone() {
            TsDataService.getSubscriptionsDone(this.$store.state.auth.user.id)
            .then(response => {
                this.subscriptionDone = response.data.resourceList;
                console.log("response : ",response.data.resourceList)
            })
        },
        getPlanList() {
            TsDataService.getPlanList()
            .then(response => {
                console.log("subscriptionList : ", response);
                this.subscriptionPlans = response.data.resourceList;
            })
        },
        rowClick: function (item, row) {
            row.select(true);
        },
        selectPlan(item) {
            console.log("selected plan", item)
            TsDataService.subscribeByUserIdAndPlanId(this.$store.state.auth.user.id, item.id)
            .then(response => {
                if(response.data.success == true)
                {
                    
                    console.log("You has been subscribed successfully");
                    this.retrieveSubscriptionsDone();
                }
            })
        },
        activePlan(item) {
            console.log("activePlan : ", item);
            TsDataService.activeSomeSubscriptionByUserIdAndPlanId(item.id)
            .then(response => {
                if(response.data.success == true)
                {
                    console.log("You has actived some plan  successfully");
                    this.retrieveSubscriptionsDone();
                }
            })
        },
        redirectManager(path) {
            this.$router.push(path).catch(()=>{});
        }, 

    },
    mounted() {
        if(this.$store.state.auth.user != undefined)
        {
            this.retrieveSubscriptionsDone();
        }
        else
        {
            this.redirectManager("sign-in");
        }
    }
}
</script>

<style>

</style>