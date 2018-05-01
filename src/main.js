import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import VueDragDrop from 'vue-drag-drop';

import resource from './util/api-resource';

import VeeValidate from "vee-validate";

Vue.use(VueDragDrop);

Vue.use(VeeValidate);

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

Vue.use(Vuetify, {
  theme: {
    primary: "#424242",
    secondary: "#616161",
    accent: "#9c27b0",
    error: "#D50000",
    warning: "#FFC107",
    info: "#2196f3",
    success: "#4caf50",
    fondo: "#ff0000",
    color1: '#c0392b',
    color2: '#E74C3C',
    color3: '#e67e22',
    color4: '#f1c40f',
    color5: '#8e44ad',
    color6: '#ab69c6',
    color7: '#ca2c68',
    color8: '#ea4c88',
    color9: '#2c3e50',
    color10: '#6C7A89',
    color11: '#102770',
    color12: '#3498db',
    color13: '#006c11',
    color14: '#0eac51'

  }
});

router.beforeEach((to, from, next) => {
  if(resource.auth.checkAuth() && to.path != '/login') {
    next();
  } else {
    if (!resource.auth.checkAuth() && to.path == '/login') {
      next();
    } else {
      if (from.path == '/' && !resource.auth.checkAuth()) {
        next('/login');
      } else {
        next(from.path);
      }
    }
  }
});

Vue.filter('literal', function (value) {
  let literal = "";
  switch (value) {
    case 1:
      literal = "Primero";
      break;
    case 2:
      literal = "Segundo";
      break;
    case 3:
      literal = "Tercero";
      break;
    case 4:
      literal = "Cuarto";
      break;
    case 5:
      literal = "Quinto";
      break;
    case 6:
      literal = "Sexto";
      break;
    case 7:
      literal = "Septimo";
      break;
    case 8:
      literal = "Octavo";
      break;
    case 9:
      literal = "Noveno";
      break;
    default:
      break;
  }
  return literal;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
