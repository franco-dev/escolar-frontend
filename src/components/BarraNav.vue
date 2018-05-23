<template>
    <div> 
        <v-toolbar color="primary" dark flat extended class="elevation-0 mb-3">
            <v-icon large>school</v-icon>
            <v-toolbar-title class="titulo">Proyecto <span class="light-blue--text mr-5">Escolar</span></v-toolbar-title>
              <v-spacer></v-spacer>
                 <v-flex centered xs3>
                    <v-select
                      :items="list_students"
                      v-model="e11"
                      :filter="customFilter"
                      color="pink"
                      cache-items
                      no-data-text="No se encontró coincidencias"
                      no-data-color="red"
                      item-sub="username"
                      single-line
                      item-text="name"
                      item-value="id"
                      solo
                      dark
                      flat
                      max-height="100"
                      prepend-icon="search"
                      append-icon=""
                      label="Buscar..."
                      autocomplete
                    >
          <template slot="item" slot-scope="data">
            <template>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.username"></v-list-tile-sub-title>                
              </v-list-tile-content>
            </template>
          </template>
          <template slot="no-data" >
            <div class="ml-3">
              Escriba nombre o ci
            </div>
          </template>
        </v-select>
                  </v-flex>
            <v-spacer></v-spacer>
            <v-menu
              origin="center center"
              transition="scale-transition"
              bottom
              dark
            >
              <v-btn flat icon slot="activator" color="pink">
                <v-icon>add_circle</v-icon> 
              </v-btn>
              <v-list class="pt-0 pb-0">
                <v-list-tile v-for="(item, i) in items" :key="i" @click.stop="item.dialog = true" >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-dialog v-model="item.dialog" lazy fullscreen transition="dialog-bottom-transition" :overlay="false">
                    <nuevo-estudiante v-if="item.title == 'Nuevo Estudiante'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-estudiante>
                    <nuevo-profesor v-if="item.title == 'Nuevo Profesor'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-profesor>
                    <nueva-materia v-if="item.title == 'Nueva Materia'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nueva-materia>
                    <nuevo-curso v-if="item.title == 'Nuevo Curso'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-curso>
                  </v-dialog>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-menu left>
            <v-btn icon slot="activator" dark class="mr-4">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list class="pt-0 pb-0">  
              <v-list-tile v-for="(item, i) in menu" :key="i" @click="item.action">
                  <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <div class="mensaje_de_alerta">
          <v-alert type="success" outline dismissible v-model="alert.visible">
            {{ alert.msg }}
          </v-alert>
        </div>
        
        <v-layout row justify-center>
            <v-flex xs11>
                    <div class="card--flex-toolbar">
                            <v-tabs
                                
                                v-model="active"
                                color="grey darken-3"
                                height="60"
                                dark
                                show-arrows
                                hide-slider
                                icons-and-text
                            >
                                <v-tab
                                v-for="(tab) in tabsData"
                                :key="tab.title"
                                target
                                :to="tab.ruta"
                                >
                                    {{ tab.title }}
                                    <v-icon v-if="active != tab.ruta" color="grey darken-2"> {{ tab.icon }} </v-icon>
                                    <v-icon v-else :color="tab.color"> {{ tab.icon }} </v-icon>
                                </v-tab>
                        </v-tabs>
                    </div>
            </v-flex>
        </v-layout>
        <dialog-alert :dialog="dialog.dialog" :msg="dialog.msg" :title="dialog.title" :action="logout"></dialog-alert>
        <!-- <alert-msg :msgalert="alert.visible" :text="alert.msg" :y="alert.y" :x="alert.x" :mode="alert.mode" :timeout="alert.timeout"></alert-msg> -->
    </div>
</template>

<script>
import resource from "@/util/api-resource";
import NuevoEstudiante from "@/components/NuevoEstudiante";
import NuevaMateria from "@/components/NuevaMateria";
import NuevoCurso from "@/components/NuevoCurso";
import NuevoProfesor from "@/components/NuevoProfesor";
import { EventBus } from "@/util/EventBus";
import DialogAlert from "@/components/DialogAlert";
import { mapActions, mapState, mapGetters } from "vuex";
import store from "@/store/store";
import axios from "axios";
export default {
  components: {
    NuevoEstudiante,
    NuevaMateria,
    NuevoCurso,
    NuevoProfesor,
    DialogAlert
  },

  computed: {
    ...mapState(["cursos"]),
    ...mapGetters(["list_students"]),
  },

  data() {
    return {
      e11: [],
        customFilter (item, queryText, itemText) {
          const hasValue = val => val != null && val != '' ? val : '?°!"#$$&&/()=193512/*-+-.,'
          const text = hasValue(item.name)
          const ci = hasValue(item.ci)
          const query = hasValue(queryText)
          let nameReturn = text.toString().toLowerCase().indexOf(query.toString().toLowerCase());
          let ciReturn = ci.toString().toLowerCase().indexOf(query.toString().toLowerCase());
          return nameReturn > -1 || ciReturn > -1
        },
      show: false,
      active: null,
      dialog: {
        dialog: false,
        msg: null,
        title: null,
        color: "primary"
      }, 
      tab: null,
        itemss: [
          'web', 'shopping', 'videos', 'images', 'news'
        ],
      alert: {
        visible: false,
        msg: null
      },
      tabsData: [
        { title: "Inicio", icon: "home", ruta: "/", color: "blue" },
        {
          title: "Administrar",
          icon: "folder_shared",
          ruta: "/admin",
          color: "red"
        }
      ],
      items: [
        { title: "Nuevo Profesor", dialog: false, action: this.guardarProfesor},
        { title: "Nuevo Estudiante", dialog: false, action:  this.guardarEstudiante},
        { title: "Nuevo Curso", dialog: false, action:  this.guardarCurso},
        { title: "Nueva Materia", dialog: false, action:  this.guardarMateria}
      ],
      menu: [
        {
          title: "Cerrar Sesión",
          icon: "power_settings_new",
          iconClass: "red--text mr-3",
          action: resource.auth.logout
        }
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    redirigir(item) {
      this.$router.push(item.ruta);
    },
    cerrar(item) {
      item.dialog = false;
    },

    ...mapActions(["obtenerCursos", 'get_students']),

    logout() {
      this.dialog.dialog = false;
      resource.auth.logout();
    },

    guardarProfesor(item, form) {
      resource.add
        .newTeacher(form)
        .then(response => {
          console.log(response);
          this.alert.msg = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      item.dialog = false;
    },

    guardarCurso() {
      console.log("Guardando curso");
    },

    guardarMateria() {
      console.log("Guardando materia");
    },

    guardarEstudiante(item, form) {
      resource.add
        .newStudent(form)
        .then(response => {
          console.log(response);
          this.alert.msg = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      item.dialog = false;
    },
  },

   mounted() {
    if (resource.auth.checkAuth()) {
      store.commit("setMaterias", resource.local.get("materias"));
      if (!this.cursos[0]) {
        this.obtenerCursos()
          .then(response => {
            if (!response.enter) {
              this.dialog.msg = response.msg;
              this.dialog.title = "Inctividad Prolongada";
              this.dialog.dialog = true;
            } else {
              EventBus.$emit('cargar-select');
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        EventBus.$emit('cargar-select');
      }

      this.get_students()
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
};
</script>

<style>
.tabs__item--active {
  background-color: #eeeeee;
  color: black;
}
.tabs__item {
  color: #616161;
}

.titulo {
  font-family: Luciano;
  font-size: 250%;
}
.list__tile--disabled {
  color: black;
}

.card--flex-toolbar {
    margin-top: -60px;
  }
</style>