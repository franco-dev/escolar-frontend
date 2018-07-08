<template>
    <v-container>
     <h2>GESTIONAR PROFESORES</h2>
     <v-dialog v-model="dialog" persistent  max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Profesor</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="editedItem.nombres" label="Nombres"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="editedItem.appat" label="Apellido Paterno"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="editedItem.apmat" label="Apellido Materno"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.ci" label="Cédula de Identidad"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.dir" label="Dirección"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-if="visible" v-model="editedItem.password" label="Nueva Contraseña"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="getMaterias"
                  v-model="materias"
                  label="Select"
                  multiple
                  item-text="nombre"
                  item-value="id"
                  chips
                  max-height="400"
                  hint="Materias a dictadas por el docente."
                  persistent-hint
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn :color="!visible ? 'indigo' : 'error'" flat @click.native="editedItem.password=''; visible=!visible">{{ !visible ? 'CAMBIAR CONTRASEÑA' : 'CONSERVAR CONTRASEÑA' }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" dark @click.native="close">cancelar</v-btn>
          <v-btn color="primary" dark @click.native="save">guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar profesor..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
     <v-data-table
        :headers="headers"
        :items="teachers"
        :search="search"
        :loading="!loading"
        rows-per-page-text="Filas por página: "
        :rows-per-page-items="[5,10,20,{'text':'*','value':-1}]"
        class="elevation-1"
    >
        <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
            <tr @click.stop="props.expanded = false">
                <td class="text-xs-right">{{ props.item.ci }}</td>
                <td class="text-xs-left">{{ props.item.appat }}</td>
                <td class="text-xs-left">{{ props.item.apmat }}</td>
                <td class="text-xs-left">{{ props.item.nombres }}</td>
                <td class="text-xs-left">{{ props.item.dir }}</td>
                <td class="text-xs-center layout px-0">
                  <v-tooltip top>
                    <v-btn icon class="mx-0" slot="activator" @click.stop="props.expanded = !props.expanded">
                        <v-icon color="indigo">visibility</v-icon>
                    </v-btn>
                    <span>Ver Materias</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn icon class="mx-0" slot="activator" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <span>Actualizar Datos</span>
                  </v-tooltip>
                  <!-- <v-tooltip top>
                    <v-btn icon class="mx-0" slot="activator" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                    <span>Dar de Baja</span>
                  </v-tooltip> -->
                </td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <div v-if="props.item.materias.length">
            <v-chip v-for="(materia) in props.item.materias" :key="materia.id" :color="'color'+ (materia.id+1)" text-color="white">
              <v-avatar>
                <!-- <v-icon>account_circle</v-icon> -->
                <i :class="icons[materia.id]"></i>
              </v-avatar>
              {{ materia.nombre }}
            </v-chip>
          </div>
          <v-card v-else>
            <v-card-title class="ml-5 pink--text" primary-title>
              EL DOCENTE NO DICTA NINGUNA MATERIA
            </v-card-title>
          </v-card>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            No se encontró ningún resultado de la búsqueda de "{{ search }}".
      </v-alert>
    </v-data-table>
     </v-card>
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
import { mapActions, mapState, mapGetters } from "vuex";
import resource from "@/util/api-resource";
import router from "@/router";
export default {
  data() {
    return {
      dialog: false,
      visible: false,
      search: "",
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
          align: "left",
          sortable: false,
          value: "ci"
        },
        { text: "Ap. Paterno", value: "appat" },
        { text: "Ap. Materno", value: "apmat" },
        { text: "Nombres", value: "nombres" },
        { text: "Dirección", sortable: false, value: "dir" },
        { text: "Acciones", sortable: false, value: "actions" }
      ],
      editedItem: {
        nombres: "",
        appat: "",
        apmat: "",
        ci: null,
        dir: null,
        password: "",
        materias: []
      },
      materias: [],
      loading: false,
      editedIndex: -1,
      formTitle: "ACTUALIZAR DATOS DEL PROFESOR"
    };
  },
  computed: {
    ...mapState(["teachers", "icons"]),
    ...mapGetters(["getMaterias"])
  },

  methods: {
    ...mapActions(["get_teachers"]),
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.editedItem.materias = [];
      this.editedItem.password = "";
      item.materias.forEach(materia => {
        this.materias.push(materia.id);
      });
      this.dialog = true;
    },

    deleteItem(item) {},

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.materias = Object.assign([], this.defaultItem);
      }, 300);
    },

    obtener_profesores() {
      this.loading = false;
      this.get_teachers()
        .then(response => {
          this.loading = response.enter;
        })
        .catch(e => {
          console.log(e);
        });
    },

    save() {
      this.editedItem.materias = Object.assign([], this.materias);
      if (this.editedIndex > -1) {
        resource.docentes
          .saveTeacher(this.editedItem, this.editedIndex)
          .then(response => {
            this.obtener_profesores();
            this.msg.text = response.msg;
            this.msg.visible = true;
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.close();
    }
  },

  mounted() {
    this.obtener_profesores();
  }
};
</script>

<style scoped>
</style>