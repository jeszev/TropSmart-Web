<template>
    <v-data-table
        :headers= "headers"
        :items= "reviews"
        sort-by= "weight"
        class="elevation-12"
    >
    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Sus reviews</v-toolbar-title>
            <v-divider class="mx-4" inset vertical ></v-divider>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-select v-if="visible && roleUser==2" style="height: 10px;" 
                dense class="mt-5" v-model="select" :items="items"
                label="Filtrar por"
                return-object @change="passSelection(select)"
                ></v-select></v-toolbar-items>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
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
    

    </v-data-table>
</template>

<script>
    import TsDataService from '@/services/TsDataService'
export default {
        data: () => ({
            visible: false,
            roleUser : '',
            formTitle: 'Reseñas',
            currentCargo: null,
            dialog: false,
            valid: true,
            select: null,
            filterSelected : '',
            headers:[
                { text: 'Cliente', value: 'customer'},
                { text: 'Cargo', value: 'cargo'},
                { text: 'Comentario', value: 'commentary'},
                { text: 'Puntaje', value: 'calification'}
            ],
                
            reviews:[],
        }),
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        watch:{
            dialog (val) {
                val || this.close()
            }
        },
        methods: {
            retrieveReviewsByCustomer() {
                TsDataService.getReviewsByCustomerId(this.$store.state.auth.user.id)
                .then(response => {
                    console.log("retreieveReviewsByCustomer : ", response);
                    this.reviews = response.data.resourceList;
                })
            },
            retrieveReviewsByDriver() {
                TsDataService.getReviewsByDriverId(this.$store.state.auth.user.id)
                .then(response => {
                    console.log("retrieveReviewsByDriver : ",response);
                    this.reviews = response.data.resourceList;
                })
            }
        },
        mounted() {
            if(this.$store.state.auth.user != undefined)
            {
                if(this.$store.state.auth.user.role == 1)
                {
                    this.retrieveReviewsByCustomer();
                }
                if(this.$store.state.auth.user.role == 2)
                {
                    this.retrieveReviewsByDriver();
                }
            }
        },
    
}
</script>

<style>

</style>