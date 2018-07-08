<template>
  <v-jumbotron height="100%" class="main-content" color="white">
    <v-container grid-list-lg>
      <loading :loading="loading"></loading>
      <v-layout row wrap>
        <v-flex xs12 md9 order-xs2 order-lg1>
          <v-layout row wrap v-if="stats != null">
            <v-flex xs6>
              <h2> {{ `Gestión: ${stats.gestion}` }} </h2>
            </v-flex>
            <v-flex xs6>
              <h2> {{ `Bimestre: ${stats.bimestre}` }} </h2>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <estado :numero="stats.docentes" imagen="Teachers_35749.png" text="grey" dl="lighten-1" color="purple darken-4" literal="Docentes"></estado>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <estado :numero="stats.inscritos" imagen="estudiante.png" text="grey" dl="lighten-1" color="deep-purple darken-4" literal="Estudiantes"></estado>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <estado :numero="stats.trabajos" imagen="trabajos.png" text="grey" dl="lighten-1" color="green darken-4" literal="Trabajos"></estado>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md3 order-xs1 order-lg2>
          <comunicados></comunicados>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import resource from "@/util/api-resource";
import { mapState } from "vuex";
import NavBar from "@/components/NavBar";
import Comunicados from "./../components/Comunicados";
import Estado from "./../components/Estado";
import Loading from '@/components/Loading';

export default {
  name: "Main",
  components: {
    NavBar,
    Comunicados,
    Estado,
    Loading
  },
  data() {
    return {
      stats: null,
      loading: false,
    };
  },

  methods: {
    
  },

  mounted() {
    this.loading = true;
    resource.stats
      .getStats()
      .then(response => {
        this.loading = false;
        this.stats = response.content.data;
        resource.local.set("gestion", response.content.data.gestion);
      })
      .catch(e => {
        this.loading = false;
        console.log(e);
      });
  }
};
</script>

<style scoped>
.main-content {
  min-height: 500px;
}
</style>