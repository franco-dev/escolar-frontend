<template>
    <v-jumbotron height="100%" class="content" color="white">
        <v-container grid-list-sm>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1>Reportes</h1>
                </v-flex>
                <v-flex d-flex xs12 sm5 md4>
                    <estado numero="6" icono="./../assets/Kirby.jpg" color="indigo" literal="Docentes"></estado>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
import resource from "@/util/api-resource";
export default {
  name: "Reportes",
  components: {

  },
  mounted() {
   
  }
};
</script>

<style scoped>
.content {
  min-height: 500px;
}
</style>