<template>
<v-jumbotron height="100%" class="courses-content" color="white">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-layout v-if="course" wrap row>
              <v-layout wrap class="mr-0 ml-2">
                 <v-flex xs12>
                    <h2>Curso Actual</h2>
                </v-flex>
                <v-flex xs4 style="font-weight: bold;">
                    CURSO: <br>
                    PARALELO: <br>
                    MATERIA DICTADA: <br>
                    CAMPO: <br>
                    
                </v-flex>
                <v-flex xs8>
                     {{ course.nro | literal | upper }} DE SECUNDARIA <br>
                     {{ course.par }} <br>
                     {{ course.mat | upper }} <br>
                     {{ course.campo | upper }}
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                        <h3><b>Estudiantes</b></h3>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click.stop="drawer = !drawer">Cambiar Curso</v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="course.estudiantes"
                        :search="search"
                        :pagination.sync="pagination"
                        item-key
                        hide-actions
                        >
                        <template color="red" slot="headerCell" slot-scope="props">
                            {{ props.header.text }}
                            <p v-if="props.header.bimestre" class="mt-0 mb-0">Bimestre: {{props.header.bimestre}} </p>
                            <p v-if="props.header.fecha" class="mt-0 mb-0"> {{props.header.fecha}} </p>
                        </template>
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.ci }}</td>
                            <td>{{ props.item.appat }}</td>
                            <td>{{ props.item.apmat }}</td>
                            <td>{{ props.item.nombres }}</td>
                            <td v-for="trabajo in course.trabajos" :key="trabajo.id" class="text-xs-right">
                               <!--  {{ props.item.trabajos.find(tb => tb.id === trabajo.id) ? props.item.trabajos.find(tb => tb.id === trabajo.id).nota : "-" }} -->
                                <v-text-field
                                    :name="`trabajo${trabajo.id}.${props.item.id}`"
                                    solo
                                    flat
                                    :label="props.item.trabajos.find(tb => tb.id === trabajo.id) ? props.item.trabajos.find(tb => tb.id === trabajo.id).nota+'' : '0'"
                                    single-line
                                    v-model="form.notas[props.item.id][trabajo.id]"
                                    :error-messages="errors.collect('notas')"
                                    v-validate="'numeric'"
                                    :data-vv-name="`${props.item.id}.${trabajo.id}`"
                                ></v-text-field>
                            </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                        </v-data-table>
                        <v-layout row wrap>
                            <v-flex xs8>
                                <div class="text-xs-center pt-2">
                                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                                </div>
                            </v-flex>
                            <v-flex xs4>
                                <div class="text-xs-right pt-2">
                                    <v-btn 
                                    class="mt-0"
                                    dark color="indigo"
                                    @click.native="guardarNotas()"
                                    :loading="loading"
                                    :disabled="loading"
                                    >Guardar</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-navigation-drawer
            v-if="drawer && !!courses"
      v-model="drawer"
      :mini-variant="mini"
      temporary
      dark
      right
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile @click.stop="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <v-icon>list</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Mis cursos</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="(item, index) in courses" :key="item.title" @click="actualizarCurso(item.id)">
          <v-list-tile-action>
            {{ index+1 }}
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.nro | literal | upper }} {{ item.par }} {{ item.mat }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
          </v-layout>
        <v-snackbar
        :timeout="msg.timeout"
        :top="msg.y === 'top'"
        :bottom="msg.y === 'bottom'"
        :right="msg.x === 'right'"
        :left="msg.x === 'left'"
        :multi-line="msg.mode === 'multi-line'"
        :vertical="msg.mode === 'vertical'"
        v-model="msg.visible"
        >
        {{ msg.text }}
        <v-btn flat color="pink" @click.native="msg.visible = false">Cerrar</v-btn>
        </v-snackbar>
        </v-container>
  </v-jumbotron>
</template>

<script>
import resource from "@/util/api-resource";
import { mapState } from "vuex";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      form: {
        notas: {}
      },
      course: null,
      loading: false,
      search: null,
      pagination: {},
      courses: null,
      editable: {
        id_estudiante: null,
        id_trabajo: null
      },
      msg: {
        visible: false,
        y: "bottom",
        x: "left",
        mode: "",
        timeout: 15000,
        text: ""
      },
      headers: [
        {
          text: "Identidad",
          align: "center",
          sortable: false,
          value: "ci"
        },
        { text: "Ap. Paterno", align: "center", value: "appat" },
        { text: "Ap. Materno", align: "center", value: "apmat" },
        { text: "Nombres", align: "center", value: "nombres" }
      ],
      drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
    };
  },

  computed: {
    ...mapState(["dictionary"]),
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },

  methods: {
    guardarNotas() {
      this.loading = true;
      resource.trabajos
        .saveRatings(this.form)
        .then(response => {
          this.actualizarCurso(this.course.id);
          this.msg.text = response.msg;
          this.msg.visible = true;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },

    actualizarCurso(id) {
      this.drawer = false;
      resource.trabajos
        .get_course(id)
        .then(response => {
          this.course = resource.local.get("actual");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.course = resource.local.get("actual");
    this.courses = resource.local.get("courses");
    this.course.estudiantes.forEach(estudiante => {
      this.form.notas[estudiante.id] = {};
    });
    this.course.trabajos.forEach(trabajo => {
      this.headers.push({
        text: trabajo.nombre,
        align: "center",
        sortable: false,
        value: `nota${trabajo.id}`,
        bimestre: trabajo.bimestre,
        fecha: trabajo.fecha
      });
    });
  }
};
</script>

<style scoped>
.courses-content {
  min-height: 500px;
}

#right {
  text-align: center;
}
</style>
