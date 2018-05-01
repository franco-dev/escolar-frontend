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
              <dialog-alert :dialog="dialog.dialog" :msg="dialog.msg" :title="dialog.title" :action="logout"></dialog-alert>
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
import NavBar from "@/components/NavBar";
import BarraNav from "@/components/BarraNav";
import PiePagina from "@/components/PiePagina";
import resource from "@/util/api-resource";
import store from "@/store/store";
import { EventBus } from "@/util/EventBus";
import DialogAlert from "@/components/DialogAlert";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    NavBar,
    PiePagina,
    BarraNav,
    DialogAlert
  },
  data() {
    return {
      nav: null,
      dialog: {
        dialog: false,
        msg: null,
        title: null,
        color: "primary"
      }
    };
  },

  methods: {
    ...mapActions(["obtenerCursos"]),
    logout() {
      this.dialog.dialog = false;
      resource.auth.logout();
    },
  },

  computed: mapState(["cursos"]),

  mounted() {
    if (resource.auth.checkAuth()) {
      store.commit("setMaterias", resource.local.get("materias"));
      if (!this.cursos[0]) {
        this.obtenerCursos()
          .then(response => {
            if (!response.enter) {
              this.dialog.msg = response.msg;
              this.dialog.title = "Inctividad Prolongada";
              this.dialog.dialog = true;
            } else {
              EventBus.$emit('cargar-select');
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        EventBus.$emit('cargar-select');
      }
    }
  }
};
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