<template>
    <div> 
        <v-toolbar color="primary" dark flat class="elevation-0 mb-3">
            <img width="50px" src="./../assets/school_logo.png">
            <v-toolbar-title class="titulo">SIA <span class="light-blue--text mr-5"> San Sebastián B</span></v-toolbar-title>
              <v-spacer></v-spacer>
                 <v-flex v-if="login === 'admin'" centered xs3>
                    <v-select
                      class="mt-1"
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
              <v-list-tile-content @click="redirect(data.item)">
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
            <v-dialog  v-if="login === 'admin'" v-model="dia_bimestre" persistent max-width="320">
              <v-btn color="pink" slot="activator" flat @click="dia_bimestre = true">
                <v-icon left>arrow_forward</v-icon>
                  <b>Siguiente Bimestre</b>
              </v-btn>
              <v-card>
                <v-card-title class="headline">¡Advertencia!</v-card-title>
                <v-card-text>Se cambiará el período académico al siguiente semestre, una vez hecho esto, todos los trabajos creados a partir de ahora perteneceran a este nuevo bimestre, esta acción no se puede deshacer.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click.native="dia_bimestre = false">Cancelar</v-btn>
                  <v-btn color="primary" @click.native="siguienteBimestre(); dia_bimestre = false">Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-menu
              origin="center center"
              transition="slide-y-transition"
              left
              dark
            >
              <v-btn flat icon slot="activator" color="pink">
                <v-icon>add_circle</v-icon> 
              </v-btn>
              <v-list class="pt-0 pb-0">
                <v-list-tile v-for="(item, i) in items" v-if="login === item.logged" :key="i" @click.stop="item.dialog = true" >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-dialog v-model="item.dialog" lazy v-if="item.title != 'Nuevo Trabajo' && item.title != 'Nuevo Comunicado'" fullscreen transition="dialog-bottom-transition" :overlay="false">
                    <nuevo-estudiante v-if="item.title == 'Nuevo Estudiante'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-estudiante>
                    <nuevo-profesor v-if="item.title == 'Nuevo Profesor'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-profesor>
                    <!-- <nueva-materia v-if="item.title == 'Nueva Materia'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nueva-materia>
                    <nuevo-curso v-if="item.title == 'Nuevo Curso'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-curso> -->
                  </v-dialog>
                  <v-dialog v-else
                    v-model="item.dialog" 
                    :overlay="false"
                    max-width="500px"
                    transition="dialog-transition"
                  >
                    <nueva-tarea v-if="item.title == 'Nuevo Trabajo'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nueva-tarea>
                    <nuevo-comunicado v-if="item.title == 'Nuevo Comunicado'" :dialog="item.dialog" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-comunicado>
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
                                color="secondary"
                                height="60"
                                show-arrows
                                hide-slider
                                icons-and-text
                            >
                                <v-tab
                                v-for="(tab) in tabsData"
                                v-if="login === tab.logged"
                                :key="tab.title"
                                target
                                dark
                                :to="tab.ruta"
                                >
                                    <span class="grey-darken-2--text">{{ tab.title }}</span>
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
import NuevaTarea from "@/components/NuevaTarea";
import NuevoProfesor from "@/components/NuevoProfesor";
import NuevoComunicado from "@/components/NuevoComunicado";
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
    DialogAlert,
    NuevaTarea,
    NuevoComunicado
  },

  computed: {
    ...mapState(["cursos"]),
    ...mapGetters(["list_students"])
  },

  data() {
    return {
      login: null,
      e11: [],
      news: null,
      customFilter(item, queryText, itemText) {
        const hasValue = val =>
          val != null && val != "" ? val : '?°!"#$$&&/()=193512/*-+-.,';
        const text = hasValue(item.name);
        const ci = hasValue(item.ci);
        const query = hasValue(queryText);
        let nameReturn = text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase());
        let ciReturn = ci
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase());
        return nameReturn > -1 || ciReturn > -1;
      },
      show: false,
      active: null,
      dia_bimestre: false,
      dialog: {
        dialog: false,
        msg: null,
        title: null,
        color: "primary"
      },
      tab: null,
      itemss: ["web", "shopping", "videos", "images", "news"],
      alert: {
        visible: false,
        msg: null
      },
      tabsData: [
        {
          title: "Inicio",
          icon: "home",
          ruta: "/",
          color: "blue",
          logged: "admin"
        },
        {
          title: "Administrar",
          icon: "folder_shared",
          ruta: "/admin",
          color: "red",
          logged: "admin"
        },
        {
          title: "Reportes",
          icon: "description",
          ruta: "/reportes",
          color: "green",
          logged: "admin"
        },
        {
          title: "Inicio",
          icon: "home",
          ruta: "/profesor",
          color: "blue",
          logged: "teacher"
        },
        {
          title: "Mis Cursos",
          icon: "folder_shared",
          ruta: "mycourses",
          color: "red",
          logged: "teacher"
        }
      ],
      items: [
        {
          title: "Nuevo Profesor",
          dialog: false,
          action: this.guardarProfesor,
          logged: "admin"
        },
        {
          title: "Nuevo Estudiante",
          dialog: false,
          action: this.guardarEstudiante,
          logged: "admin"
        },
        {
          title: "Nuevo Comunicado",
          dialog: false,
          action: this.guardarComunicado,
          logged: "admin"
        },
        {
          title: "Nuevo Trabajo",
          dialog: false,
          action: this.guardarTrabajo,
          logged: "teacher"
        }
        /*  { title: "Nuevo Curso", dialog: false, action:  this.guardarCurso},
        { title: "Nueva Materia", dialog: false, action:  this.guardarMateria} */
      ],
      menu: [
        {
          title: "Cerrar Sesión",
          icon: "power_settings_new",
          iconClass: "red--text mr-3",
          action: resource.auth.logout
        }
      ]
    };
  },
  methods: {
    ...mapActions(["obtenerCursos", "get_students"]),

    redirigir(item) {
      this.$router.push(item.ruta);
    },
    cerrar(item) {
      item.dialog = false;
    },

    redirect(item) {
      this.$router.push(`/estudiante/${item.id}`);
    },

    logout() {
      this.dialog.dialog = false;
      resource.auth.logout();
    },

    siguienteBimestre () {
      resource.bimestre
        .next_bimester()
        .then(response => {
          //console.log(response);
          this.alert.msg = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    guardarProfesor(item, form) {
      resource.add
        .newTeacher(form)
        .then(response => {
          //console.log(response);
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

    guardarComunicado(item, form) {
      resource.comunicados
        .saveRelease(form)
        .then(response => {
          this.alert.msg = response.msg;
          this.alert.visible = true;
          this.obtenerComunicados();
        })
        .catch(e => {
          console.log(e);
        });
      item.dialog = false;
    },

    actualizarCurso(id) {
      resource.trabajos
        .get_course(id)
        .then(response => {})
        .catch(e => {
          console.log(e);
        });
    },
    guardarTrabajo(item, form) {
      let idd = form.id;
      resource.trabajos
        .saveJob(form)
        .then(response => {
          this.actualizarCurso(idd);
          this.alert.msg = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      item.dialog = false;
    },

    guardarEstudiante(item, form) {
      resource.add
        .newStudent(form)
        .then(response => {
          //console.log(response);
          this.alert.msg = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      item.dialog = false;
    },

    obtenerComunicados() {
      resource.comunicados
        .getReleases()
        .then(response => {
          //console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.login = resource.local.get("logged");
    if (this.login === "admin") {
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
                EventBus.$emit("cargar-select");
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          EventBus.$emit("cargar-select");
        }

        this.get_students()
          .then(response => {
            //console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
    };

    this.obtenerComunicados();
  }
};
</script>

<style>
.tabs__item--active {
  background-color: #e0e0e0;
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
</style>