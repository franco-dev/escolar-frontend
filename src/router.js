import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import Login from './views/Login.vue';
import Admin from './views/Admin.vue';
import Cursos from './views/Cursos.vue';
import Estudiantes from './views/Estudiantes';
import Profesores from './views/Profesores.vue';
import NotFound from './views/NotFound.vue';
import Teacher from './views/Teacher.vue';
import TeacherCourses from './views/TeacherCourses.vue';

import Estudiante from './views/Estudiante.vue';

import Horario from './views/Horario.vue';

Vue.use(Router);

export default new Router({
  routes: [{
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
      path: '/profesor',
      name: 'prof',
      component: Teacher,
    },
    {
      path: '/mycourses',
      component: TeacherCourses,
      name: 'ProfCourses'
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [{
          path: 'cursos',
          component: Cursos,
          name: 'cursos'
        },
        {
          path: 'profesores',
          component: Profesores,
          name: 'profesores'
        },
        {
          path: 'estudiantes',
          component: Estudiantes,
          name: 'estudiantes'
        },
        {
          path: 'horarios',
          component: Horario,
          name: 'horarios'
        },
        {
          path: '/estudiante/:id',
          component: Estudiante
        },
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});