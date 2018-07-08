<template>
    <v-jumbotron height="100%" class="teacher-content" color="white">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 md9 order-xs2 order-lg1 class="mt-2">
                  <h2>INICIO</h2>
                    <!--  <v-card v-if="!!perfil">
                      <v-card-media
                        :src="require(`@/assets/bienvenido.jpg`)"
                        height="271px"
                      >
                      </v-card-media>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{ `${perfil.nombres} ${perfil.appat} ${perfil.apmat}` }}</div>
                          <span class="grey--text text--darken-3"><b>Cédula de identidad:</b> {{ perfil.ci}} </span><br>
                          <span class="grey--text text--darken-3"><b>Dirección:</b> {{ perfil.dir}} </span>
                        </div>
                      </v-card-title>
                    </v-card> -->
                    <v-card color="transparent" v-if="!!perfil" flat class="black--text mt-0 mb-0">
                      <v-container fluid grid-list-lg>
                        <v-layout row>
                          <v-flex xs3 offset-xs1 align-content-center>
                            <h3 class="text-xs-center">PERFIL</h3>
                            <v-card-media
                              :src="require(`@/assets/user.png`)"
                              height="125px"
                              contain
                              class="mt-0 mb-0"
                            ></v-card-media>
                          </v-flex>
                          <v-flex xs7>
                            <div class="box--outline">
                              <div class="ml-5 mt-3">
                                <div class="headline">{{ `${perfil.nombres} ${perfil.appat} ${perfil.apmat}` }}</div>
                                <div class="subheading"><b>Cédula de identidad:</b> {{ perfil.ci}} </div>
                                <div class="subheading"><b>Dirección:</b> {{ perfil.dir}} </div>
                              </div>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-container>
                  </v-card>
                  <v-card color="transparent" v-if="!!perfil" flat class="black--text mt-0 mb-0">
                      <v-container fluid grid-list-lg>
                        <v-layout row>
                          <v-flex xs3 offset-xs1 align-content-end>
                            <h3 class="text-xs-center">ASIGNATURAS</h3>
                            <v-card-media
                              :src="require(`@/assets/courses.png`)"
                              height="125px"
                              contain
                            ></v-card-media>
                          </v-flex>
                          <v-flex xs7>
                            <div class="box--outline">
                              <div class="ml-5 mt-3">
                                <div><b>Cursos: </b> <span ></span></div>
                                <div class="ml-5" v-for="(course) in courses" :key="course.id">
                                  <v-chip color="indigo" text-color="white">
                                    <v-avatar class="deep-purple darken-4"> {{ course.par }} </v-avatar>
                                    {{ course.nro | literal }}
                                  </v-chip>
                                  <v-chip color="transparent" flat>
                                    <v-icon>arrow_forward</v-icon>
                                  </v-chip>
                                  <v-chip :color="`color${course.matid}`" text-color="white">
                                    <v-avatar>
                                      <i :class="icons[course.matid]"></i>
                                    </v-avatar>
                                    {{ course.mat }}
                                  </v-chip>
                                </div>
                              </div>
                            </div>
                          </v-flex>
                          
                        </v-layout>
                      </v-container>
                  </v-card>
                </v-flex>
                <v-flex  xs12 md3 order-xs1 order-lg2 class="mt-2">
                    <comunicados></comunicados>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
import resource from "@/util/api-resource";
import { mapState } from "vuex";
import Comunicados from "./../components/Comunicados";
export default {
  name: "Teacher",
  components: {
    Comunicados,
  },
  data() {
    return {
      comunicados: null,
      perfil: null,
      show: false,
      courses: null,
    };
  },

  computed: {
    ...mapState(["icons"]),
  },

  mounted() {
    this.perfil = resource.local.get("user");
    this.courses = resource.local.get("courses");
   /*  resource.comunicados
      .getReleases()
      .then(response => {
        if (response.enter) {
            this.comunicados = response;
          } else {
            this.dialog.msg = response.msg;
            this.dialog.title = "Inactividad Prolongada";
            this.dialog.dialog = true;
            this.dialog.action = this.logout();
          }
      })
      .catch(e => {
        console.log(e);
      }); */
  }
};
</script>

<style scoped>
.teacher-content {
  min-height: 500px;
}

div .box--outline {
  border-width: 2px;
  border-style: outset;
  border-radius: 7%;
  height: 100%;
}
</style>