import resource from '@/util/api-resource';
import store from '@/store/store';

const students = [];

const getters = {
    list_students(state) {
        let list = [];
       state.forEach(student => {
           list.push({
               id: student.id,
               name: student.appat + " " + student.apmat + " " + student.nombres,
               ci: student.ci 
           });
       });
        return list;
    },
};

const mutations = {
    setStudents(state, newStudents) {
        state.splice(0, state.length);
        console.log(newStudents)
        newStudents.forEach(student => {
            state.push(student);
        });
    },
};

const actions = {
    get_students({
        commit,
        state
    }, form) {
        return new Promise((resolve, reject) => {
            resource.estudiantes.get_students()
                .then(response => {
                    let resp = {
                        msg: null,
                        enter: false
                    };

                    if (response.code == 200) {
                        commit('setStudents', response.content.data);
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
};

export default {
    state: students,
    mutations,
    actions,
    getters
};