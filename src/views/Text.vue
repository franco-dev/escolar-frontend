<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs4 v-for="(list, index) in lists" :key="index">
        <v-list>
          <template v-for="(materia, index) in list">
            <drag :transfer-data="materia" :key="index">
              <template slot-scope="props">
                <v-card dark :color="'color'+ (materia.id+1)">
                  <v-list-tile avatar :key="materia.id" @click="">
                    <v-list-tile-avatar>
                      <i :class="materia.icon"></i>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                         {{ props.transferData ? 'Coloque la materia en el periodo que usted vea conveniente' : materia.name }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-card>
              </template>
            </drag>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row>
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
              <template v-for="(item, index) in dia.materias">
                <drop @drop="handleDrop(item, ...arguments)" :key="item.idPer">
                  <template slot-scope="props">
                    <v-card dark :color="props.transferData ? 'color'+(props.transferData.id+1) : (item.id == '' ? 'white' : 'color'+ (item.id+1))">
                      <v-list-tile avatar :id="item.id" @click="">
                        <drag v-if="item.name != ''" :transfer-data="item" style="height: 100%; width: 100%">
                          <v-list-tile-content>
                              <v-list-tile-title>{{ props.transferData ? props.transferData.name : item.name }}</v-list-tile-title>
                          </v-list-tile-content>
                        </drag>
                        <v-list-tile-content v-else>
                          <v-list-tile-title>{{ props.transferData ? props.transferData.name : item.name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-card>
                  </template>
                </drop>
                <v-divider v-if="index + 1 < dia.materias.length" :key="index + '-' + item.idPer"></v-divider>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      materias: [
        {
          id: 1,
          name: "Religión",
          color: "colorRel",
          icon: "fas fa-calculator"
        },
        { id: 2, name: "Lenguaje", color: "colorLen", icon: "fas fa-book" },
        { id: 3, name: "Sociales", color: "colorSoc", icon: "fab fa-react" },
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
      ],
      horario: [
        {
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
        }
      ],
      hora: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
    };
  },
  methods: {
    handleDrop(to, from) {
      if(!!from) {
        let mat_id = to.id;
        let mat_name = to.name;
        to.id = from.id;
        to.name = from.name;
        if(from.idPer>=0) {
          from.id = mat_id;
          from.name = mat_name;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getMaterias"]),
    sortMaterias(a, b) {
      return this.materias.sort((a, b) => (a.name < b.name ? -1 : 1));
    },
    lists() {
      let list = [];
      list.push(this.sortMaterias.slice(0, this.materias.length / 3 +1));
      list.push(this.sortMaterias.slice(this.materias.length / 3 + 1, this.materias.length / 3 * 2 + 1));
      list.push(this.sortMaterias.slice(this.materias.length / 3 * 2 + 1, this.materias.length));
      return list;
    }
  }
};
</script>

<style scoped>

</style>