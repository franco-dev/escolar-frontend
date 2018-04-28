<template>
  <div id="app">
    <v-app>
     <!--  <nav-bar></nav-bar> -->
      <barra-nav v-if="this.$route.fullPath != '/login'"></barra-nav>
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
      </div> -->
     <!--  <v-content>
        <v-container fluid grid-list-lg>
          
        </v-container>
      </v-content> -->
      
        <v-layout row justify-center>
          <v-flex v-if="this.$route.fullPath != '/login'" xs11>
            <v-card>
              <router-view/>
            </v-card>
          </v-flex>
          <v-flex v-else>
            <v-app>
              <router-view/>  
            </v-app>
          </v-flex>
        </v-layout>
        
      <!-- <pie-pagina></pie-pagina> -->
      
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import BarraNav from '@/components/BarraNav'
import PiePagina from '@/components/PiePagina';
import resource from "@/util/api-resource";
import store from '@/store/store';
  export default {
    components: {
      NavBar,
      PiePagina,
      BarraNav
    },
    data() {
      return {
        nav: null,
      }
    },

    mounted() {
      if (resource.auth.checkAuth()) {
        store.commit("setMaterias", resource.local.get('materias'));
      }
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #263238;
}

@font-face {
font-family: Luciano;
src: url(./fonts/Luciano.ttf);
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

.titulo {
  font-family: Luciano;
  font-size: 250%;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>