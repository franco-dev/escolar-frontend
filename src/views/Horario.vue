<template>
  <v-container fluid>
    <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm4 md5>
            <v-select
              label="Curso"
              required
              :items="cursosHabilitados"
              v-model="curso"
              item-text="text"
              item-value="value"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm4 md5>
            <v-select
              label="Paralelo"
              required
              :items="paralelos"
              item-value="value"
              v-model="cursoid"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm4 md2 text-xs-cente>
            <v-layout row wrap justify-center>
               <v-btn
              :loading="loading2"
              @click.native="saveHorario"
              :disabled="!cursoid || loading2"
              color="blue-grey"
              class="white--text"
              outline
            >
              Guardar
              <v-icon right dark>save</v-icon>
            </v-btn>
            </v-layout>
            <v-spacer></v-spacer>
           
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-layout>
    </v-container>
    <v-layout v-if="!loading && !!materias.length"  row>
        <v-navigation-drawer width="220" height="450px" class="mr-3 list-materias" :mini-variant.sync="mini" v-model="drawer" stateless hide-overlay>
          <v-toolbar fixed flat class="">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="./../assets/materias.png" >
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Materias</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.native.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="scroll-box mt-5" dense>
            <v-divider></v-divider>
            <template v-for="(materia, index) in sortMaterias">
              <drag :transfer-data="materia" :key="index">
                <template slot-scope="props">
                  <v-card :key="materia.id_materia" dark :color="'color'+ (materia.id_materia+1)">
                    <v-list-tile avatar  @click="">
                      <v-list-tile-action>
                        <i :class="icons[materia.id_materia]"></i>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ materia.literal }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <!-- <v-btn icon @click.native.stop="">
                          <v-icon>{{ !!materia.profesor ? 'how_to_reg' : 'warning'}}</v-icon>
                        </v-btn> -->
                        <v-menu
                          transition="slide-x-transition"
                          bottom
                          offset-x
                          right
                        >
                          <v-btn icon slot="activator">
                             <v-icon>{{ !!materia.profesor ? 'how_to_reg' : 'warning'}}</v-icon>
                          </v-btn>
                          <v-list class="pt-0 pb-0">
                            <v-list-tile v-for="item in materia.profesores" :key="item.id" @click="materia.profesor = item.id" :class="materia.profesor == item.id ? 'item-active' : ''">
                              <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-card>
                </template>
              </drag>
            </template>
          </v-list>
        </v-navigation-drawer>
        <v-layout row wrap>
          <v-flex xs1>
            <v-layout row wrap>
            <v-flex xs12>
                <v-card tile flat>
                  <v-card-text class="text-xs-center">HORA</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-list class="pt-0 pb-0">
                    <template v-for="(item, index) in hora">
                      <v-list-tile avatar :key="item">
                        <v-list-tile-content>
                          <v-list-tile-title class="text-xs-center"> {{item}} </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider v-if="index + 1 < hora.length" :key="index"></v-divider>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs11>
            <v-layout row>
              <v-flex xs2 v-for="dia in horario" :key="dia.dia">
                <v-card dark tile flat color="primary">
                  <v-card-text class="text-xs-center">{{ dia.dia }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs2 v-for="dia in horario" :key="dia.dia">
                <v-list class="pt-0 pb-0">
                  <template v-for="(item, index) in dia.periodos">
                    <drop @drop="handleDrop(item, ...arguments)" :key="item.id">
                      <template slot-scope="props">
                        <v-card dark :color="props.transferData ? 'color'+(props.transferData.id_materia+1) : (item.id_materia == null ? 'white' : 'color'+ (item.id_materia+1))">
                          <drag v-if="item.literal != null" :transfer-data="item">
                            <v-list-tile avatar :id="item.id_materia" @click="">
                              <v-list-tile-content>
                                <v-list-tile-title>{{ props.transferData ? props.transferData.literal : item.literal }}</v-list-tile-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-btn icon color="white" flat @click="removeMateria(dia.dia, item.id)">
                                  <v-icon>close</v-icon>
                                </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
                          </drag>
                          <v-list-tile v-else avatar>
                            <v-list-tile-content >
                                <v-list-tile-title>{{ props.transferData ? props.transferData.literal : item.literal }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-card>
                      </template>
                    </drop>
                    <v-divider v-if="index + 1 < dia.periodos.length" :key="index + '-' + item.id"></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
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
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store/store";
import resource from "@/util/api-resource";
export default {
  data() {
    return {
      drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: true,
        right: null,
      msg: {
        visible: false,
        y: "bottom",
        x: "left",
        mode: "",
        timeout: 15000,
        text: ""
      },
      curso: null,
      cursoid: null,
      loading: false,
      loading2: false,
      materias: [],
      horario: [],
      hora: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
    };
  },
  methods: {
    removeMateria(dia, index) {
      let perio = this.horario.find(day => day.dia === dia).periodos.find(periodo => periodo.id === index);
      perio.literal = null;
      perio.id_materia = null;
      console.log(perio.literal);
    },
    handleDrop(to, from) {
      if (!!from) {
        let mat_id = to.id_materia;
        let mat_name = to.literal;
        to.id_materia = from.id_materia;
        to.literal = from.literal;
        if (from.id >= 0) {
          from.id_materia = mat_id;
          from.literal = mat_name;
        }
      }
    },

    saveHorario() {
      this.loading2 = true;
      let creds = {
        materias: {},
        periodos: {}
      };
      for (const key in this.materias) {
        if (this.materias[key].profesor != null) {
          creds.materias[this.materias[key].id_materia] = this.materias[
            key
          ].profesor;
        }
      }

      for (const dia in this.horario) {
        for (const periodo in this.horario[dia].periodos) {
          if (this.horario[dia].periodos[periodo].id_materia != null) {
            creds.periodos[
              this.horario[dia].periodos[periodo].id
            ] = this.horario[dia].periodos[periodo].id_materia;
          }
        }
      }

      resource.horario
        .saveHorario(creds, this.cursoid)
        .then(response => {
          this.msg.text = response.msg;
          this.msg.visible = true;
          this.loading2 = false;
          console.log(creds);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    // whenever question changes, this function will run
    cursoid: function(newdata, olddata) {
      if (newdata != null) {
        this.loading = true;
        resource.horario
          .pedirHorario(newdata)
          .then(response => {
            this.materias = response.content.data.materias;
            this.horario = response.content.data.horario;
            this.loading = false;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },

    curso: function(newdata, olddata) {
      this.cursoid = null;
    },
  },

  computed: {
    ...mapGetters(["getMaterias", "cursosHabilitados"]),
    ...mapState(['icons']),
    paralelos() {
      return store.getters.paralelosCurso(this.curso);
    },
    sortMaterias(a, b) {
      return this.materias.sort((a, b) => (a.name < b.name ? -1 : 1));
    },
    lists() {
      let list = [];
      list.push(this.sortMaterias.slice(0, this.materias.length));
      return list;
    }
  }
};
</script>

<style scoped>
.list-materias {
  overflow: hidden; 
}

.scroll-box {
  overflow-y: auto;
  height: 400px;
  padding-top: 15px;
  overflow-x: hidden;
  position: absolute;
  right: -30px;
  padding-right: 18px;
  left: 0px;
}  

.item-active {
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.767);
  display: block;
  color: aliceblue;
}
</style>