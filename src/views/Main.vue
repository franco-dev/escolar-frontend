<template>
  <v-jumbotron height="100%" class="main-content" color="white">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md9>

        </v-flex>
        <v-flex xs12 md3>
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
export default {
  name: "Main",
  components: {
    NavBar,
    Comunicados
  },
  data() {
    return {
      
    };
  },

  methods: {
    
  },

  mounted() {}
};
</script>

<style scoped>
.main-content {
  min-height: 465px;
}
</style>