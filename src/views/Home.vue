<template>
  <div>
    <v-layout>
       <v-flex>
        <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/bg-masthead.jpg"></v-img>
      </v-flex>
    </v-layout>

    <!--1-->
    <v-layout align-center justify-center row grid-list-md wrap>
      <v-card row wrap ms6 xs12 height="600" width="700" flat>
        <v-container bg fill-height grid-list-md text-xs-center>
          <v-layout row wrap align-center>
              <h2 style="text-align: center;" class="skyblue--text">Descubre un nuevo mercado para ofrecer tus servicios de transporte.
                &nbsp; Mantente conectado con tus clientes y encuentra muchos más.</h2>
          </v-layout>
        </v-container>
      </v-card>

      <v-card ms6 xs12 height="500" width="700" flat> 
        <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/design_head.png"></v-img>
      </v-card>
    </v-layout>
    <v-spacer></v-spacer>

    <!--Banner-->
    <section class="features-icons bg-light text-center">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                   <v-icon class="skyblue--text" size=100>fas fa-list-ol m-auto text-primary</v-icon>
            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">Catálogo amplio</h3>
            <p class="lead mb-0">Contrate un servicio de transporte rapidamente segun su necesidad.</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <v-icon class="skyblue--text" size=100>fas fa-truck-moving m-auto text-primary</v-icon>

            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">Genera ingresos</h3>
            <p class="lead mb-0">Obten ingresos monetarios consiguiendo contratos a traves de nuestra plataforma.</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                  <v-icon class="skyblue--text" size=100>far fa-address-card m-auto text-primary</v-icon>
            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">Seguridad</h3>
            <p class="lead mb-0">Todos nuestros usuarios son verificados y cada transaccion es segura en Trop Smart.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

    
    <!--2-->
    <v-layout align-center justify-center row grid-list-md wrap>

      <v-card row wrap ms6 xs12 height="500" width="700" flat>
        <v-container bg fill-height grid-list-md text-xs-center justify-center>
          <div class="col-lg-8">
            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">TropSmart</h3>
            <p class="lead mb-0">Somos un servicio cuyo objetivo principal es brindar una plataforma que ayuda a conductores a publicar su disponibilidad para brindar servicios de transporte determinado para rubros específicos, a su vez, la plataforma otorga a los clientes la capacidad de negociar el precio de cada servicio, establecer una ubicación de encuentro y de destino.</p>
        </div>
        </v-container>
      </v-card>
      <v-card ms6 xs12 height="500" width="700" flat> 
        <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/imagen_1.png"></v-img>
      </v-card>
    </v-layout>

  
    <v-spacer></v-spacer>


    <!--3-->
    <v-layout align-center justify-center row grid-list-md wrap>
      <v-card ms6 xs12 height="500" width="700" flat> 
        <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/imagen_2.png"></v-img>
      </v-card>
      
      <v-card row wrap ms6 xs12 height="500" width="700" flat>
        <v-container bg fill-height grid-list-md text-xs-center justify-center>
          <div class="col-lg-8">
            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">Beneficios</h3>
            <p class="lead mb-0">Con esta herramienta los transportistas podrán encontrar clientes casuales mas rapido, además de poder agendar reservas del servicio para dias posteriores.</p>
        </div>
        </v-container>
      </v-card>

    </v-layout>  
    <v-spacer></v-spacer>


    <!--4-->
    <v-layout align-center justify-center row grid-list-md wrap>

      <v-card row wrap ms6 xs12 height="500" width="700" flat>
        <v-container bg fill-height grid-list-md text-xs-center justify-center>
          <div class="col-lg-8">
            <h3 class="wow bounceInDown" data-wow-duration="0.7s" style="color: #007bff;">¡Únete a TropSmart!</h3>
            <p class="lead mb-0">Nuestros usuarios tienen un sistema de suscripcion mensual. Estamos comprometidos con ofrecer un servicio de calidad constante y siempre escuchar a nuestra comunidad ¿Qué esperas?.</p>
        </div>
        </v-container>
      </v-card>

      <v-card ms6 xs12 height="500" width="700" flat> 
        <v-img src="https://carlos18mz.github.io/TropSmartPatrones.github.io/img/imagen_3.png"></v-img>
      </v-card>

    </v-layout>
    <v-spacer></v-spacer>



  </div>
</template>


<script>

export default {
  name: 'Home',
  components: {
  },

      props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = false
    },
}
</script>
