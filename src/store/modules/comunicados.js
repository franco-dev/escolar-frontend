import resource from '@/util/api-resource';
import store from '@/store/store';

const comunicados = [];

const mutations = {
    setComunicados(state, comunicados) {
        state.splice(0, state.length);
        for (let i = 0; i < comunicados.length; i++) {
            state.push(comunicados[i]);
        }
    },
};

export default {
    state: comunicados,
    mutations,
};