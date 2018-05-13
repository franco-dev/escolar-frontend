import resource from '@/util/api-resource';
import store from '@/store/store';

const teachers = [];

const getters = {
    list_teacher(state) {
        let list = [];
        
        return list;
    },
};

const mutations = {
    setTeachers(state, newTeachers) {
        state.splice(0, state.length);
        newTeachers.forEach(student => {
            state.push(student);
        });
    },
};

const actions = {
    get_teachers({
        commit,
        state
    }, form) {
        return new Promise((resolve, reject) => {
            resource.docentes.get_teachers()
                .then(response => {
                    let resp = {
                        msg: null,
                        enter: false
                    };

                    if (response.code == 200) {
                        commit('setTeachers', response.content.data);
                        resp.enter = true;
                    }
                    resp.msg = response.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
};

export default {
    state: teachers,
    mutations,
    actions,
    getters
};