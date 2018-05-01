const fBasic = {
  nombres: null,
  appat: null,
  apmat: null,
  ci: null,
  dir: null,
  cel: null
};

const mutations = {
  setNombres(state, data) {state.nombres = data},
  setAppat(state, data) {state.appat = data},
  setApmat(state, data) {state.apmat = data},
  setCi(state, data) {state.ci = data},
  setCel(state, data) {state.cel = data},
  setDir(state, data) {state.dit = data},
};

export default {
  state: fBasic,
  mutations
};