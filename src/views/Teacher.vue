<template>
    <v-jumbotron height="100%" class="teacher-content" color="white">
        <v-container grid-list-lg>
            <v-layout row wrap>
                
                <v-flex xs12 md9 order-xs2 order-lg1>
                    <h2>Inicio</h2>
                </v-flex>
                <v-flex  xs12 md3 order-xs1 order-lg2>
                    <comunicados></comunicados>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
import resource from "@/util/api-resource";
import Comunicados from "./../components/Comunicados";
export default {
  name: "Teacher",
  components: {
    Comunicados
  },
  data() {
    return {
      comunicados: null
    };
  },
  mounted() {
    resource.comunicados
      .getReleases()
      .then(response => {
        //console.log(response);
        this.comunicados = response;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.teacher-content {
  min-height: 500px;
}
</style>