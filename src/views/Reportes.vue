<template>
    <v-jumbotron height="100%" class="content" color="white">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1>Reportes</h1>
                </v-flex>
                <v-flex xs6>
                    <h2>ESTUDIANTES</h2>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md6>
                            <v-select
                            label="Curso"
                            required
                            :items="cursosHabilitados"
                            v-model="curso"
                            item-text="text"
                            item-value="value"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-select
                            label="Paralelo"
                            required
                            :items="paralelos"
                            item-value="value"
                            v-model="cursoid"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-select
                            label="Materia"
                            required
                            :items="getMaterias"
                            v-model="materia"
                            item-text="nombre"
                            item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-select
                            label="Gestión"
                            required
                            :items="paralelos"
                            item-value="value"
                            v-model="gestion"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                        <v-layout row wrap justify-center>
                        <v-btn
                        :loading="loading"
                        @click.native=""
                        :disabled="!cursoid || loading || !gestion"
                        color="primary"
                        class="white--text"
                        block
                        >
                            <v-icon left dark>list_alt</v-icon>
                            Lista General
                        </v-btn>
                        </v-layout>
                        <v-spacer></v-spacer>
                    </v-flex>
                   
                    <v-flex xs12>
                        <v-layout class="mt-2">
                            <v-flex xs3>
                                <v-checkbox color="indigo" v-model="bimestre" :disabled="!cursoid || loading || !gestion" label="Primer" value="1"></v-checkbox>
                            </v-flex>
                            <v-flex xs3>
                                <v-checkbox color="indigo" v-model="bimestre" :disabled="!cursoid || loading || !gestion" label="Segundo" value="2"></v-checkbox>
                            </v-flex>
                            <v-flex xs3>
                                <v-checkbox color="indigo" v-model="bimestre" :disabled="!cursoid || loading || !gestion" label="Tercer" value="3"></v-checkbox>
                            </v-flex>
                            <v-flex xs3>
                                <v-checkbox color="indigo" v-model="bimestre" :disabled="!cursoid || loading || !gestion" label="Cuarto" value="4"></v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                     <v-flex xs12>
                        <v-btn :loading="loading"
                        @click.native=""
                        :disabled="bimestre.length <= 0"
                        color="indigo"
                        class="white--text mt-0"
                        block>
                            <v-icon left dark>assignment_returned</v-icon>
                            BOLETIN SEMESTRAL
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn :loading="loading"
                        @click.native=""
                        :disabled="!cursoid || loading || !gestion"
                        color="primary"
                        class="white--text mt-0"
                        block>
                            <v-icon left dark>assignment_turned_in</v-icon>
                            BOLETINES FINALES
                        </v-btn>
                    </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <h2>DOCENTES</h2>
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center>
                            <v-btn color="primary" block>
                                <v-icon left dark>list</v-icon>
                                Lista de Docentes
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store/store";
import resource from "@/util/api-resource";
export default {
  name: "Reportes",
  components: {},
  data() {
      return {
          curso: null,
          cursoid: null,
          gestion: null,
          loading: false,
          materia: null,
          bimestre: [],
      }
  },
  computed: {
    ...mapGetters(["getMaterias", "cursosHabilitados"]),
    ...mapState(['icons']),
    paralelos() {
      return store.getters.paralelosCurso(this.curso);
    },
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  min-height: 500px;
}
</style>