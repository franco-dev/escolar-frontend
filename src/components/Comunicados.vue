<template>
    <v-layout justify-center row wrap>
            <h3>Comunicados</h3>
            <v-flex xs12 class="scroll-box">
              <v-card v-for="comunicado in comunicados" :key="comunicado.id" color="grey darken-3" class="white--text mb-2">
              <v-card-title primary-title class="pb-0">
                <v-layout row wrap>
                  <v-flex xs12 class="title pt-0 pb-0">
                    <b> {{ comunicado.titulo | upper }} </b>
                  </v-flex>
                  <v-flex xs12 class="subheading pt-0 pb-0">
                    {{ comunicado.cont }}
                  </v-flex>
                  <v-flex xs12 class="mb-0 pb-0">
                    <b>Fecha de Publicación:</b>
                  </v-flex>
                  <v-flex xs12 class="mt-0 pt-0 mb-2">
                     <v-layout wrap class="mt-1 mr-1 ml-1">
                        {{ comunicado.hora }}
                        <v-spacer></v-spacer>
                        {{ comunicado.fecha}}
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-actions v-if="login === 'admin'" class="pt-0">
                <v-spacer></v-spacer>
                <v-btn color="error" @click.native.stop="dialog = true; id_comunicado = comunicado.id" flat dark>Borrar</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>

      <v-dialog v-model="dialog" max-width="300">
        <v-card>
          <v-card-title class="headline text-lg-center pb-0">¿Esta seguro de eliminar el comunicado?</v-card-title>
          <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" outline @click.native="dialog = false; id_comunicado = null">cancelar</v-btn>
            <v-btn color="indigo" dark outline @click.native="borrarComunicado()">aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          </v-layout>
</template>

<script>
import resource from "@/util/api-resource";
import { mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
  computed: {
    ...mapState(["comunicados"])
  },
  data() {
    return {
      dialog: false,
      id_comunicado: null,
      login: null,
    };
  },

  mounted() {
      this.login = resource.local.get("logged");
  },
  methods: {
    borrarComunicado() {
       resource.comunicados
        .deleteRelease(this.id_comunicado)
        .then(response => {
          this.obtenerComunicados();
        })
        .catch(e => {
          console.log(e);
        });

        this.dialog = false;
    },

    obtenerComunicados() {
      resource.comunicados
        .getReleases()
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
};
</script>

<style scoped>
.scroll-box {
  overflow-y: scroll;
  height: 450px;
}  
</style>