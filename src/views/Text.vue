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
        <v-layout v-if="!loading" row wrap>
          <v-flex xs6 v-for="(list, index) in lists" :key="index">
            <v-list>
              <template v-for="(materia, index) in list">
                <drag :transfer-data="materia" :key="index">
                  <template slot-scope="props">
                    <v-card dark :color="'color'+ (materia.id_materia+1)">
                      <v-list-tile avatar :key="materia.id" @click="">
                        <v-list-tile-avatar>
                          <i :class="materia.icon"></i>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            {{ props.transferData ? 'Coloque la materia en el periodo que usted vea conveniente' : materia.literal }}
                          </v-list-tile-title>
                        </v-list-tile-content>
                        <v-flex xs6>
                          <v-select
                            :items="materia.profesores"
                            v-model="materia.profesor"
                            label="Designar Profesor"
                            item-text="nombre"
                            item-value="id"
                            single-line
                            auto
                            append-icon="account_circle"
                          ></v-select>
                        </v-flex>
                      </v-list-tile>
                    </v-card>
                  </template>
                </drag>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
        <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-layout>
    </v-container>
    <v-layout v-if="!loading && !!materias.length"  row>
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
                      <v-list-tile avatar :id="item.id_materia" @click="">
                        <drag v-if="item.literal != null" :transfer-data="item" style="height: 100%; width: 100%">
                          <v-list-tile-content>
                              <v-list-tile-title>{{ props.transferData ? props.transferData.literal : item.literal }}</v-list-tile-title>
                          </v-list-tile-content>
                        </drag>
                        <v-list-tile-content v-else>
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
import { mapGetters } from "vuex";
import store from '@/store/store';
import resource from '@/util/api-resource';
export default {
  data() {
    return {
      msg: {
        visible: false,
        y: 'bottom',
        x: 'left',
        mode: '',
        timeout: 15000,
        text: ''
      },
      curso: null,
      cursoid: null,
      loading: false,
      loading2: false,
      /* materias: [
        {
          id: 1,
          name: "Religión",
          color: "colorRel",
          icon: "fas fa-calculator"
        },
        {
          id: 2,
          name: "Lenguaje",
          color: "colorLen",
          icon: "fas fa-book"
        },
        {
          id: 3,
          name: "Sociales",
          color: "colorSoc",
          icon: "fab fa-react"
        },
        { id: 4, name: "Biología", color: "colorBio", icon: "fas fa-flask" },
        {
          id: 5,
          name: "Artes Plásticas",
          color: "colorArt",
          icon: "fas fa-leaf"
        },
        {
          id: 6,
          name: "Matemáticas",
          color: "colorMat",
          icon: "fas fa-trophy"
        },
        {
          id: 7,
          name: "Técnica Vocacional",
          color: "colorTec",
          icon: "fas fa-globe"
        },
        { id: 8, name: "Ingles", color: "colorIng", icon: "fas fa-globe" },
        {
          id: 9,
          name: "Educación Fisica",
          color: "colorEdu",
          icon: "fas fa-globe"
        },
        { id: 10, name: "Música", color: "colorMus", icon: "fas fa-globe" },
        { id: 11, name: "Filosofía", color: "colorFil", icon: "fas fa-globe" },
        { id: 12, name: "Literatura", color: "colorLit", icon: "fas fa-globe" },
        {
          id: 13,
          name: "Física-Química",
          color: "colorQui",
          icon: "fas fa-globe"
        },
        { id: 14, name: "Física", color: "colorFis", icon: "fas fa-globe" }
      ], */
      materias: [],
      horario: [
       /*  {
          dia: "lunes",
          materias: [
            { idPer: 0, id: "", name: "" },
            { idPer: 1, id: "", name: "" },
            { idPer: 2, id: "", name: "" },
            { idPer: 3, id: "", name: "" },
            { idPer: 4, id: "", name: "" },
            { idPer: 5, id: "", name: "" },
            { idPer: 6, id: "", name: "" }
          ]
        },
        {
          dia: "martes",
          materias: [
            { idPer: 7, id: "", name: "" },
            { idPer: 8, id: "", name: "" },
            { idPer: 9, id: "", name: "" },
            { idPer: 10, id: "", name: "" },
            { idPer: 11, id: "", name: "" },
            { idPer: 12, id: "", name: "" },
            { idPer: 13, id: "", name: "" }
          ]
        },
        {
          dia: "miercoles",
          materias: [
            { idPer: 14, id: "", name: "" },
            { idPer: 15, id: "", name: "" },
            { idPer: 16, id: "", name: "" },
            { idPer: 17, id: "", name: "" },
            { idPer: 18, id: "", name: "" },
            { idPer: 19, id: "", name: "" },
            { idPer: 20, id: "", name: "" }
          ]
        },
        {
          dia: "jueves",
          materias: [
            { idPer: 21, id: "", name: "" },
            { idPer: 22, id: "", name: "" },
            { idPer: 23, id: "", name: "" },
            { idPer: 24, id: "", name: "" },
            { idPer: 25, id: "", name: "" },
            { idPer: 26, id: "", name: "" },
            { idPer: 27, id: "", name: "" }
          ]
        },
        {
          dia: "viernes",
          materias: [
            { idPer: 28, id: "", name: "" },
            { idPer: 29, id: "", name: "" },
            { idPer: 30, id: "", name: "" },
            { idPer: 31, id: "", name: "" },
            { idPer: 32, id: "", name: "" },
            { idPer: 33, id: "", name: "" },
            { idPer: 34, id: "", name: "" }
          ]
        },
        {
          dia: "Sabado",
          materias: [
            { idPer: 35, id: "", name: "" },
            { idPer: 36, id: "", name: "" },
            { idPer: 37, id: "", name: "" },
            { idPer: 38, id: "", name: "" },
            { idPer: 39, id: "", name: "" },
            { idPer: 40, id: "", name: "" },
            { idPer: 41, id: "", name: "" }
          ]
        } */
      ],
      hora: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
    };
  },
  methods: {
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
        periodos: {},
      }
      for (const key in this.materias) {
        if (this.materias[key].profesor != null) {
          creds.materias[this.materias[key].id_materia] = this.materias[key].profesor;
        }
      }

      for (const dia in this.horario) {
        for (const periodo in this.horario[dia].periodos) {
          if(this.horario[dia].periodos[periodo].id_materia != null) {
            creds.periodos[this.horario[dia].periodos[periodo].id] = this.horario[dia].periodos[periodo].id_materia;
          }
        }
      }
      
      //console.log(creds)

      resource.horario
        .saveHorario(creds, this.cursoid)
        .then(response => {
          this.msg.text = response.msg;
          this.msg.visible = true;
          this.loading2 = false;
         // console.log(this.cursoid)
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    // whenever question changes, this function will run
    cursoid: function (newdata, olddata) {
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

    curso: function (newdata, olddata) {
      this.cursoid = null;
    }
  },
  computed: {
    ...mapGetters(["getMaterias", 'cursosHabilitados']),
    paralelos() {
      return store.getters.paralelosCurso(this.curso);
    },
    sortMaterias(a, b) {
      return this.materias.sort((a, b) => (a.name < b.name ? -1 : 1));
    },
    lists() {
      let list = [];
      list.push(this.sortMaterias.slice(0, this.materias.length / 2 + 1));
      list.push(
        this.sortMaterias.slice(
          this.materias.length / 2 + 1,
          this.materias.length
        )
      );
      /* list.push(
        this.sortMaterias.slice(
          this.materias.length / 3 * 2 + 1,
          this.materias.length
        )
      ); */
      return list;
    }
  }
};
</script>

<style scoped>

</style>