<template>
    <v-container>
     <h2>GESTIONAR PROFESORES</h2>
     <v-dialog v-model="dialog" max-width="500px">
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
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
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
        rows-per-page-text="Filas por página: "
        :rows-per-page-items="[5,10,20,{'text':'*','value':-1}]"
        class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-right">{{ props.item.ci }}</td>
                <td class="text-xs-left">{{ props.item.appat }}</td>
                <td class="text-xs-left">{{ props.item.apmat }}</td>
                <td class="text-xs-left">{{ props.item.nombres }}</td>
                <td class="text-xs-left">{{ props.item.dir }}</td>
                <td class="text-xs-left layout px-0">
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
                  <v-tooltip top>
                    <v-btn icon class="mx-0" slot="activator" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                    <span>Dar de Baja</span>
                  </v-tooltip>
                </td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-chip v-for="(materia, index) in props.item.materias" :key="index" :color="'color'+ (materia.id+1)" text-color="white">
            <v-avatar>
              <!-- <v-icon>account_circle</v-icon> -->
              <i :class="icons[materia.id]"></i>
            </v-avatar>
            {{ materia.nombre }}
          </v-chip>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            No se encontró ningún resultado de la búsqueda de "{{ search }}".
      </v-alert>
    </v-data-table>
     </v-card>
        <!-- <pre>
            {{ teachers }}
        </pre>  -->
    </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import resource from "@/util/api-resource";
export default {
  data() {
    return {
      dialog: false,
      search: "",
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
        materias: []
      },
      editedIndex: -1,
      formTitle: "ACTUALIZAR DATOS DEL PROFESOR"
    };
  },
  computed: {
    ...mapState(["teachers", 'icons'])
  },

  methods: {
    ...mapActions(["get_teachers"]),
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        resource.docentes
          .saveTeacher(this.editedItem, this.editedIndex)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.close();
    }
  },

  mounted() {
    this.get_teachers()
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>

</style>