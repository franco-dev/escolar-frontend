import resource from '@/util/api-resource';
import store from '@/store/store';

const cursos = [];

const getters = {
    cursosHabilitados(state) {
        let habilitados = [];
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].paralelos.length; j++) {
                if (state[i].paralelos[j].estado == 1 && habilitados.indexOf(state[i].curso) < 0) {
                     let literal = "";
                     switch (state[i].curso) {
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
                    habilitados.push({
                        text: literal,
                        value:state[i].curso
                    });
                }
            }
        }
        return habilitados;
    },
    paralelosHabilitados(state) {
        let habilitados = [];
        for (let i = 0; i < state.length; i++) {
            habilitados.push({
                curso: state[i].curso,
                paralelos: []
            });
            for (let j = 0; j < state[i].paralelos.length; j++) {
                if (state[i].paralelos[j].estado == 1) {
                    habilitados[i].paralelos.push(state[i].paralelos[j]);
                }
            }
        }
        return habilitados;
    },
};

const mutations = {
    setCursos(state, cursosnew) {
        state.splice(0, state.length);
        for (let i = 0; i < cursosnew.length; i++) {
            state.push(cursosnew[i]);
        }
    },
};

const actions = {
    obtenerCursos({
        commit,
        state
    }, form) {
        return new Promise((resolve, reject) => {
            resource.cursos.pedirCursos()
                .then(response => {
                    let resp = {
                        msg: null,
                        enter: false
                    };

                    if (response.code == 200) {
                        commit('setCursos', response.content.data);
                        resp.enter = true;
                    }
                    resp.msg = response.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                });
        });
    },

    guardarEstados({
        commit,
        state
    }, creds) {
        return new Promise((resolve, reject) => {
            resource.cursos.guardarCursos(creds)
                .then(response => {
                    let resp = {
                        msg: null,
                        enter: false
                    };

                    if (response.code == 200) {
                        commit('setCursos', response.content.data);
                        resp.enter = true;
                    }
                    resp.msg = response.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    console.log("Cursos.JS");
                    reject(e);
                });
        });
    },
};

export default {
    state: cursos,
    mutations,
    actions,
    getters
};