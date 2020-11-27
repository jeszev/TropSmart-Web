<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/bg-masthead.jpg"></v-img>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
//import axios from "axios"
export default {
    name: "SideMenu",
    props: {
        apikey:String,
        drawer: Boolean
    },
    data : ()=> ({
        sources: [],
        errors: []
    }),
  

}
</script>

<style scoped>
    #style-1::-webkit-scrollbar{
        width: 6px;
        background-color: #F5F5F5;
    }

    #style-2::-webkit-scrollbar-thumb{
        background-color:#F90;
        background-image: -webkit-linear-gradient(90deg, rga(255,255,255,.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255,255,255,.2) 50%,
            rgba(255,255,255,.2) 75%,
            transparent 75%,
            transparent);
    }

    #style-3::-webkit-scrollbar-track {
        -webkit-box-shadow: inser 0 0 6px rgba(0,0,0,.3);
        background-color: #F5F5F5;
    }

    .drawer-style {
        background-color: #2196F3;
        border-color: #2195F3;
    }
</style>