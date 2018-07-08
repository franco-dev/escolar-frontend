import Vue from 'vue';
import Vuex from 'vuex';
import cursos from './modules/cursos';
import materias from './modules/materias';
import students from './modules/estudiantes';
import teachers from './modules/docentes';
import comunicados from './modules/comunicados';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: null,
    icons: {
      6: "fas fa-calculator",
      2: "fas fa-pencil-alt",
      4: "fas fa-leaf",
      14: "fas fa-flask",
      9: "fas fa-trophy",
      3: "fas fa-globe",
      10: "fas fa-music",
      5: "fas fa-paint-brush",
      8: "fas fa-language",
      7: "fas fa-lightbulb",
      11: "fas fa-diagnoses",
      1: "fas fa-hands",
      13: "fas fa-flask",
      12: "fas fa-book"
    },
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        nombres: {
          required: () => "El nombre no puede estar vacio.",
          min: (field, params) =>
            `El nombre debe contener al menos ${params} caracteres.`
          // custom messages
        },
        appat: {
          required: () => "El apellido paterno no puede estar vacio.",
          min: (field, params) =>
            `El apellido paterno debe contener al menos ${params} caracteres.`
          // custom messages
        },
        apmat: {
          required: () => "El apellido materno no puede estar vacio.",
          min: (field, params) =>
            `El apellido materno debe contener al menos ${params} caracteres.`
          // custom messages
        },
        carnet: {
          required: () => "La cédula de identidad no puede estar vacio.",
          min: (field, params) =>
            `El cédula de identidad debe contener al menos ${params} dígitos númericos.`,
          numeric: "La cédula de identidad debe ser númerico."
          // custom messages
        },
        cel: {
          required: () => "El número telefónico no puede estar vacio.",
          numeric: () => "El número telefónico debe contener solo números.",
          min: (field, params) =>
            `El número telefónico debe contener mínimo ${params} dígitos númericos.`,

          // custom messages
        },
        materias: {
          required: "Las materias a dictar son requeridas."
        },
        dir: {
          required: "La dirección es requerida."
        },
        apocel: {
          required: () => "El número telefónico no puede estar vacio.",
          digits: (field, params) =>
            `El número telefónico debe contener ${params} dígitos númericos.`
          // custom messages
        },
        aponombre: {
          required: () => "El nombre no puede estar vacio.",
          min: (field, params) =>
            `El nombre debe contener al menos ${params} caracteres.`
          // custom messages
        },
        apopar: {
          required: () => "El parentesco no puede estar vacio.",
          min: (field, params) =>
            `El parentesco debe contener al menos ${params} caracteres.`
          // custom messages
        },
        campo: {
          required: () => "Este campo no puede estar vacío",
          min: (field, params) => `Este campo debe contener al menos ${params} caracteres.`
        },
        curso: {
          required: "El curso al cual se inscribirá es requerido."
        },
        paralelo: {
          required: "El paralélo al cual se inscribira es requerido."
        }
      }
    }
  },
  mutations: {
    setLogin: (state, person) => state.login = person 
  },
  actions: {},
  modules: {
    cursos,
    materias,
    students,
    teachers,
    comunicados
  }
});
