import Vue from 'vue';
import Vuex from 'vuex';
import cursos from './modules/cursos';
import materias from './modules/materias';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    cursos,
    materias
  }
});
