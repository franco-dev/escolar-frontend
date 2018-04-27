import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import Login from './views/Login.vue';
import Admin from './views/Admin.vue';
import Cursos from './views/Cursos.vue';
import Estudiantes from './views/Estudiantes';
import Profesores from './views/Profesores.vue';
import NotFound from './views/NotFound.vue';

import Test from './views/Text.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: 'cursos', component: Cursos, name: 'cursos'},
        {path: 'profesores', component: Profesores, name: 'profesores'},
        {path: 'estudiantes', component: Estudiantes, name: 'estudiantes'},
        {path: 'horarios', component: Test, name: 'horarios'},
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
