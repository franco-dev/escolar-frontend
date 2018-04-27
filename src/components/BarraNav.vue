<template>
    <div> 
        <v-toolbar color="blue-grey darken-4" dark class="elevation-0 pt-2 pb-2">
            <v-icon large>school</v-icon>
            <v-toolbar-title class="titulo">Proyecto <span class="light-blue--text">Escolar</span></v-toolbar-title>
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
                  <v-dialog v-model="item.dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                <!--   <v-dialog v-if="item.title == 'Nuevo Estudiante'" v-model="item.dialog" persistent max-width="50%"> -->
                    <!-- <v-btn flat block depressed dark slot="activator">Open Dialog</v-btn> -->
                    <nuevo-estudiante v-if="item.title == 'Nuevo Estudiante'" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-estudiante>
                    <nuevo-profesor v-if="item.title == 'Nuevo Profesor'" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-profesor>
                    <nueva-materia v-if="item.title == 'Nueva Materia'" :item="item" :guardar="item.action" :cerrar="cerrar"></nueva-materia>
                    <nuevo-curso v-if="item.title == 'Nuevo Curso'" :item="item" :guardar="item.action" :cerrar="cerrar"></nuevo-curso>
                  </v-dialog>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
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

         <!--  <div class="text-xs-center">
            <v-btn color="primary" dark v-if="!alert" @click="alert = true">Reset</v-btn>
          </div> -->
        </div>
        
        <v-layout row justify-center>
            <v-flex xs11>
                <!-- <v-tabs icons-and-text right dark fixed>
                    <v-tabs-slider v-for="i in 3" :key="i" color="red"></v-tabs-slider>
                    <v-tab v-for="(tab, index) in tabs" :key="index" :to="tab.ruta">
                        {{ tab.title }}
                        <v-icon>{{ tab.icon }}</v-icon>
                    </v-tab>
                </v-tabs> -->
                <!-- <v-card> -->
                <!--  <v-bottom-nav shift class="elevation-0" absolute :value="e31" color="grey darken-3">
                        <v-tooltip v-for="(tab, index) in tabs" flat :key="index"  :color="tab.color" bottom>
                            <v-btn :to="tab.ruta" color="primary" slot="activator">
                                <span>{{ tab.title }}</span>
                                <v-icon> {{ tab.icon }} </v-icon>
                            </v-btn>
                            <span>{{ tab.title }}</span>
                        </v-tooltip>
                    
                    </v-bottom-nav> -->
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
                                v-for="(tab, index) in tabsData"
                                :key="tab.title"
                                target
                                :to="tab.ruta"
                                >
                                    {{ tab.title }}
                                    <v-icon v-if="active != tab.ruta" color="grey darken-2"> {{ tab.icon }} </v-icon>
                                    <v-icon v-else :color="tab.color"> {{ tab.icon }} </v-icon>
                                </v-tab>
                        </v-tabs>
                    
                <!-- </v-card> -->
            </v-flex>
        </v-layout>
        <!-- <alert-msg :msgalert="alert.visible" :text="alert.msg" :y="alert.y" :x="alert.x" :mode="alert.mode" :timeout="alert.timeout"></alert-msg> -->
    </div>
</template>

<script>
import resource from "@/util/api-resource";
import NuevoEstudiante from "@/components/NuevoEstudiante";
import NuevaMateria from "@/components/NuevaMateria";
import NuevoCurso from "@/components/NuevoCurso";
import NuevoProfesor from "@/components/NuevoProfesor";
export default {
  components: {
    NuevoEstudiante,
    NuevaMateria,
    NuevoCurso,
    NuevoProfesor,
  },
  data() {
    return {
      active: null,
      /* alert: {
        visible: false,
        msg: null,
        y: "bottom",
        x: "right",
        mode: "multi-line",
        timeout: 30000
      }, */
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
      // console.log(dialog);
      item.dialog = false;
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
</style>