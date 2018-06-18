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
import Reportes from './views/Reportes.vue';
import TeacherCourses from './views/TeacherCourses.vue';

import Estudiante from './views/Estudiante.vue';

import Horario from './views/Horario.vue';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: (to, from, next) => {
        let login = localStorage.getItem("logged");
        if (login != undefined) login = JSON.parse(login);
        if (login !== 'admin') {
          next('/profesor');
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reportes',
      name: 'reports',
      component: Reportes,
      beforeEnter: (to, from, next) => {
        let login = localStorage.getItem("logged");
        if (login != undefined) login = JSON.parse(login);
        if (login !== 'admin') {
          next('/profesor');
        } else {
          next();
        }
      },
    },
    {
      path: '/profesor',
      name: 'prof',
      component: Teacher,
       beforeEnter: (to, from, next) => {
         let login = localStorage.getItem("logged");
         if (login != undefined) login = JSON.parse(login);
         if (login !== 'teacher') {
           next('/');
         } else {
           next();
         }
       },
    },
    {
      path: '/mycourses',
      component: TeacherCourses,
      name: 'ProfCourses',
       beforeEnter: (to, from, next) => {
         let login = localStorage.getItem("logged");
         if (login != undefined) login = JSON.parse(login);
         if (login !== 'teacher') {
           next('/');
         } else {
           next();
         }
       },
    },
    {
      path: '/admin',
      name: 'admin',
       beforeEnter: (to, from, next) => {
         let login = localStorage.getItem("logged");
         if (login != undefined) login = JSON.parse(login);
         if (login !== 'admin') {
           next('/profesor');
         } else {
           next();
         }
       },
      component: Admin,
      redirect: '/admin/estudiantes',
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
      name: 'notfound',
      component: NotFound
    }
  ]
});