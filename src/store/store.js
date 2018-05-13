import Vue from 'vue';
import Vuex from 'vuex';
import cursos from './modules/cursos';
import materias from './modules/materias';
import students from './modules/estudiantes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
          digits: (field, params) =>
            `El número telefónico debe contener ${params} dígitos númericos.`
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
        curso: {
          required: "El curso al cual se inscribirá es requerido."
        },
        paralelo: {
          required: "El paralélo al cual se inscribira es requerido."
        }
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {
    cursos,
    materias,
    students
  }
});
