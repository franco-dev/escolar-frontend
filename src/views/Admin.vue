<template>
    <div>
        <sub-nav :items="nav"></sub-nav>
        <v-jumbotron height="100%" class="admin-content" color="white">
          <router-view></router-view>
        </v-jumbotron>
    </div>
</template>

<script>
import SubNav from "@/components/SubNav.vue";
export default {
  components: {
    SubNav
  },
  data() {
    return {
      nav: [
        { title: "Profesores", icon: "people", iconClass: 'amber white--text', ruta: 'profesores'},
        { title: "Estudiantes", icon: "local_library", iconClass: 'red white--text', ruta: 'estudiantes'},
        { title: "Cursos", icon: "iso", iconClass: 'blue white--text', ruta: 'cursos'},
        { title: "Horarios", icon: "alarm", iconClass: 'pink white--text', ruta: 'horarios'},
      ]
    };
  }
};
</script>

<style scoped>
.admin-content {
  min-height: 400px;
}
</style>