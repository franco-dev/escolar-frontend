<template>
    <div> 
        <v-toolbar color="primary" dark flat class="elevation-0 mb-3">
            <img width="50px" src="./../assets/school_logo.png">
            <v-toolbar-title class="titulo">SIA <span class="light-blue--text mr-5"> San Sebastián B</span></v-toolbar-title>
              <v-spacer></v-spacer>
                <v-flex v-if="login === 'admin'" centered xs3>
                  <v-autocomplete
                    v-model="e11"
                    :items="searchStudents"
                    :search-input.sync="search"
                    color="white"
                    hide-no-data
                    hide-selected
                    solo
                    item-text="name"
                    item-value="id"
                    label="Public APIs"
                    placeholder="Buscar..."
                    prepend-icon="search"
                    return-object
                  ></v-autocomplete>
                    <!-- <v-select
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
        </v-select> -->
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
              <v-icon>settings</v-icon>
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
                                    <span :class="active == tab.ruta ? 'black--text' : 'grey--text'" >{{ tab.title }}</span>
                                    <v-icon :color="active != tab.ruta ? 'grey darken-2' : tab.color"> {{ tab.icon }} </v-icon>
                                </v-tab>
                        </v-tabs>
                    </div>
            </v-flex>
        </v-layout>
        <dialog-alert :dialog="dialog.dialog" :msg="dialog.msg" :title="dialog.title" :action="dialog.action"></dialog-alert>
        <v-dialog v-model="editprofile" persistent max-width="500px">
          <v-card v-if="!!perfil">
            <v-card-title>
              <span class="headline">EDITAR PERFIL DE USUARIO</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form @submit.prevent="guardarPerfil" ref="form">
                  <v-layout wrap>
                    <v-flex xs12 v-if="login === 'admin'">
                      <v-text-field v-model="perfil.cel" label="Número de celular" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-else>
                      <v-text-field v-model="perfil.dir" label="Dirección" required></v-text-field>
                    </v-flex>
                    <template v-if="editpass"> 
                      <v-flex xs12>
                        <v-text-field v-model="perfil.password"
                          label="Nueva contraseña"
                          :append-icon="!visible.p2 ? 'visibility_off' : 'visibility'"
                          @click:append="visible.p2 = !visible.p2"
                          :type="!visible.p2 ? 'password' : 'text'"  
                        required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="confirm"
                          label="Confirmar la contraseña"
                          :rules="[rules.confirm]"
                          :append-icon="!visible.p3 ? 'visibility_off' : 'visibility'"
                          @click:append="visible.p3 = !visible.p3"
                          :type="!visible.p3 ? 'password' : 'text'"
                        required></v-text-field>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn :color="editpass ? 'error' : 'indigo'" flat @click.native="password = ''; perfil.password = ''; confirm = ''; visible.p1=false; visible.p2=false; visible.p3=false; editpass = !editpass">{{ editpass ? 'Conservar la contraseña' : 'Cambiar contraseña'}}</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" dark @click.native="cancelarPerfil()">Cancelar</v-btn>
              <v-btn color="primary" dark :disabled="perfil.password !== confirm" type="submit" @click.native="guardarPerfil()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    ...mapGetters(["list_students"]),
    searchStudents() {
      return this.list_students.map(entry => {
        const Description =
          entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + "..."
            : entry.name;

        return Object.assign({}, entry, { Description });
      });
    }
  },

  watch: {
    e11(val) {
      if (!!val.id) {
        this.redirect(val);
      }
    }
  },

  data() {
    return {
      descriptionLimit: 60,
      search: null,
      login: null,
      valid: true,
      editprofile: false,
      confirm: "",
      visible: {
        p1: false,
        p2: false,
        p3: false
      },
      perfil: {
        dir: resource.local.get("user").dir,
        password: "",
        cel: resource.local.get("user").cel,
      },
      editpass: false,
      e11: [],
      news: null,
      rules: {
        confirm: value =>
          (value === this.perfil.password && this.confirm === value) ||
          this.confirm == null ||
          this.perfil.password == null ||
          "Las contraseñas no coinciden."
      },
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
        color: "primary",
        action: ""
      },
      tab: null,
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
          title: "Editar Perfil",
          icon: "build",
          iconClass: "indigo--text mr-3",
          action: () => (this.editprofile = true)
        },
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

    guardarPerfil() {
      resource.auth
        .editarPerfil(this.perfil, this.login)
        .then(response => {
          if (response.enter) {
            this.alert.msg =
              response.msg +
              ". Los cambios de verán cuando vuelva a iniciar sesión.";
            this.alert.visible = true;
          } else {
            this.dialog.msg = response.msg;
            this.dialog.title = "Inactividad Prolongada";
            this.dialog.dialog = true;
            this.dialog.action = this.logout();
          }
          this.cancelarPerfil();
        })
        .catch(e => {
          console.log(e);
        });
    },

    siguienteBimestre() {
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

    cancelarPerfil() {
      this.editprofile = false;
      this.editpass = false;
      this.confirm = null;
      this.perfil.dir = resource.local.get("user").dir;
      this.perfil.password = null;
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
      if (resource.local.get("courses").length > 0) {
        resource.trabajos
          .saveJob(form)
          .then(response => {
            if (response.enter) {
              this.actualizarCurso(idd);
              this.alert.msg = response.msg;
              this.alert.visible = true;
            } else {
              this.dialog.msg = response.msg;
              this.dialog.title = "Inactividad Prolongada";
              this.dialog.dialog = true;
              this.dialog.action = this.logout();
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.dialog.msg =
          "Usted no puede crear tareas hasta que se le asigne un respectivo curso y/o materia.";
        this.dialog.title = "Ninguna curso y/o materia designada";
        this.dialog.dialog = true;
        this.dialog.action = () => {
          this.dialog.dialog = false;
        };
      }
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
          if (!response.enter) {
            this.dialog.msg = response.msg;
            this.dialog.title = "Inactividad Prolongada";
            this.dialog.dialog = true;
            this.dialog.action = this.logout();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    //this.perfil = resource.local.get("user");
    this.login = resource.local.get("logged");
    if (this.login === "admin") {
      if (resource.auth.checkAuth()) {
        store.commit("setMaterias", resource.local.get("materias"));
        if (!this.cursos[0]) {
          this.obtenerCursos()
            .then(response => {
              if (!response.enter) {
                this.dialog.msg = response.msg;
                this.dialog.title = "Inactividad Prolongada";
                this.dialog.dialog = true;
                this.dialog.action = this.logout();
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
    }

    this.obtenerComunicados();
  }
};
</script>

<style>
.v-tabs__item--active {
  background-color: #e0e0e0;
  color: black;
}

.titulo {
  font-family: Luciano;
  font-size: 250%;
}
.list__tile--disabled {
  color: black;
}
</style>