import resource from '@/util/api-resource';
import store from '@/store/store';

const materias = [];

const mutations = {
    setMaterias(state, materias) {
        state.splice(0, state.length);
        for (let i = 0; i < materias.length; i++) {
            state.push(materias[i]);
        }
    },
};

const actions = {

};

const getters = {
    getMaterias(state) {
        return state;
    }
};

export default {
    state: materias,
    mutations,
    actions,
    getters
};