<template>
  <v-container fluid>
    <div id="create">
      <h1>Administrar Cursos</h1>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm3 md3>
          <v-layout row wrap>
            <v-flex xs12>
              <estado :numero="estados.habilitados" imagen="checkbox-marked-circle-outline.png" text="white" dl="lighten-1" color="indigo" literal="Habilitados"></estado>
            </v-flex>
            <v-flex xs12>
              <estado :numero="estados.inhabilitados" imagen="alert-circle-outline.png" text="white" dl="lighten-1" color="red" literal="Inhabilitados"></estado>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm9 md9>
          <div class="text-xs-right">
<v-btn
      color="primary"
      :loading="loading"
      @click.native="guardarCambios"
      :disabled="loading"
    >
    <v-icon class="pr-1" dark>save</v-icon>
      Guardar 
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
          </div>
          
           <v-data-table
    :headers="headers"
    :items="cursos"
    :pagination.sync="pagination"
    class="elevation-5 ml-3"
    item-key="id"
    hide-actions
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th>
        </th>
        <th
          v-for="header in props.headers"
          :key="header.text"
        >
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td>
          <v-btn @click="llegarSelect(props.item.paralelos)" class="elevation-0" dark small :color="btn_all_color" v-text="btn_all">
          </v-btn>
        </td>
        <td>{{ props.item.curso | literal }} de Secundaria</td>
        <td class="text-xs-center">
            <v-btn-toggle multiple v-model="form.habilitados">
              <v-btn v-for="paralelo in props.item.paralelos" color="light-green accent-3" :value="paralelo.id" :key="paralelo.id">
                {{ paralelo.paralelo }}
              </v-btn>
            </v-btn-toggle>
        </td>
      </tr>
    </template>
  </v-data-table>
        </v-flex>
      </v-layout>
            
             <v-layout row wrap absolute>
                <v-flex xs10 offset-xs1 fixed>
                  
                </v-flex>
            </v-layout>
             
            
    </div>
  </v-container>
</template>

<script>
import resource from "@/util/api-resource";

import Estado from "@/components/Estado";
import { mapActions, mapState } from "vuex";
import { EventBus } from "@/util/EventBus";
export default {
  name: "Cursos",
  components: {
    Estado
  },

  created() {
    EventBus.$on("cargar-select", () => {
      this.cargarSelect();
    });
  },

  data() {
    return {
      form: {
        habilitados: [],
        desabilitados: []
      },
      estados: {
        habilitados: 0,
        inhabilitados: 0
      },
      pagination: {
        rowsPerPage: 6
      },
      btn_all: "Todos",
      btn_all_color: "indigo lighten-1",
      headers: [
        {
          text: "CURSOS",
          align: "text-xs-left",
          value: "name"
        },
        { text: "PARALELOS" }
      ],
      loading: false
    };
  },

  computed: mapState(["cursos"]),

  methods: {
    ...mapActions(["obtenerCursos", "guardarEstados"]),
    

    vaciarSelect() {
      this.form.habilitados = [];
    },

    llegarSelect(list) {
      for (let i = 0; i < list.length; i++) {
        if (this.form.habilitados.indexOf(list[i].id) < 0)
          this.form.habilitados.push(list[i].id);
      }
    },

    select_all(item) {
      let val = false;

      for (let i = 0; i < item.paralelos.length; i++) {
        item.paralelos[i].estado = val;
      }
    },

    guardarCambios() {
      this.loading = true;
      for (let i = 0; i < this.cursos.length; i++) {
        for (let j = 0; j < this.cursos[i].paralelos.length; j++) {
          if (
            this.form.habilitados.indexOf(this.cursos[i].paralelos[j].id) < 0
          ) {
            this.form.desabilitados.push(this.cursos[i].paralelos[j].id);
          }
        }
      }

      this.guardarEstados(this.form)
        .then(response => {
          this.estados.habilitados = 0;
          this.estados.inhabilitados = 0;
          this.form.habilitados = [];
          this.form.desabilitados = [];
          this.cargarSelect();
          this.loading = false;
          //console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },

    cargarSelect() {
      for (let i = 0; i < this.cursos.length; i++) {
        for (let j = 0; j < this.cursos[i].paralelos.length; j++) {
          if (this.cursos[i].paralelos[j].estado == 1) {
            this.form.habilitados.push(this.cursos[i].paralelos[j].id);
            this.estados.habilitados++;
          } else {
            this.estados.inhabilitados++;
          }
        }
      }
    }
  },

  mounted() {
    this.cargarSelect();
  }
};
</script>

<style scoped>
#create .speed-dial {
  position: fixed;
}

#create .btn--floating {
  position: relative;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>