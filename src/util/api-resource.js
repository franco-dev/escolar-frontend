import axios from 'axios';
import router from '@/router';
import store from '@/store/store';

// URL's
const API_URL = 'http://blackcrozz.com/escolar-api/';
const LOGIN_URL = API_URL + 'admin/login';
const CURSOS_URL = API_URL + 'admin/cursos';
const INSCRIBIR_URL = API_URL + 'admin/inscripcion';
const TEACHER_URL = API_URL + 'admin/profesor';

const local = {
    get(credencial) {
        let data = localStorage[credencial];
        if (data == undefined) return false;
        else return JSON.parse(data);
    },
    set(credencial, valor) {
        localStorage.setItem(credencial, JSON.stringify(valor));
    },
    remove(credencial) {
        localStorage.removeItem(credencial);
    }
};

const auth = {
    login(creds, redirect) {
        return new Promise((resolve, reject) => {
            axios({
                    method: "post",
                    url: LOGIN_URL,
                    data: creds,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    let code = response.data.code;
                    let resp = {
                        msg: null,
                        enter: false
                    };
                    if (code == 200) {
                        local.set('user', response.data.content);
                        if (creds.remember) local.set('login-user', creds);
                        else local.remove('login-user');
                        router.push(redirect);
                        resp.enter = true;
                        store.commit('setMaterias', response.data.content.data.materias);
                        
                        //console.log("Login: ", response);
                    }
                    resp.msg = response.data.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },

    logout() {
        local.remove('user');
        router.push('/login');
    },

    checkAuth: () => !!local.get('user').token,
};

const cursos = {
    pedirCursos() {
        return new Promise((resolve, reject) => {
            //console.log(local.get('user').token);
            axios({
                    method: "get",
                    url: CURSOS_URL,
                    headers: {
                        "Authorization": local.get('user').token
                    }
                })
                .then(response => {
                    console.log("Token enviado: ", local.get('user').token);
                    let code = response.data.code;
                    if (code == 200) {
                        let user = local.get('user');
                        local.remove('user');
                        user.token = response.data.content.token;
                        //console.log(user);
                        local.set('user', user);
                        //console.log('Cambiooooo');
                    }
                  //  console.log('Tokennn: '+local.get('user').token);
                    resolve(response.data);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },

    guardarCursos(creds) {
        return new Promise((resolve, reject) => {
            //console.log(local.get('user').token);
            axios({
                    method: "post",
                    url: CURSOS_URL,
                    data: creds,
                    headers: {
                        "Authorization": local.get('user').token
                    }
                })
                .then(response => {
                    //console.log(local.get('user').token);
                    let code = response.data.code;
                    if (code == 200) {
                        let user = local.get('user');
                        user.token = response.data.content.token;
                        local.remove('user');
                        local.set('user', user);
                    }
                    resolve(response.data);
                })
                .catch(e => {
                    console.log("API-Resourse.js");
                    reject(e);
                });
        });
    }
};

const add = {
    newStudent(creds) {
        return new Promise((resolve, reject) => {
            //console.log(local.get('user').token);
            axios({
                    method: "post",
                    url: INSCRIBIR_URL,
                    data: creds,
                    headers: {
                        "Authorization": local.get('user').token
                    }
                })
                .then(response => {
                    //console.log(local.get('user').token);
                    let resp = {
                        msg: null,
                        username: null
                    };
                    let code = response.data.code;
                    console.log(response);
                    if (code == 200) {
                        let user = local.get('user');
                        user.token = response.data.content.token;
                        local.remove('user');
                        local.set('user', user);
                        resp.username = response.data.content.data;
                    }
                    resp.msg = response.data.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    console.log("API-Resourse.js");
                    reject(e);
                });
        });
    },

    newTeacher(creds){
        return new Promise((resolve, reject) => {
            //console.log(local.get('user').token);
            axios({
                    method: "post",
                    url: TEACHER_URL,
                    data: creds,
                    headers: {
                        "Authorization": local.get('user').token
                    }
                })
                .then(response => {
                    //console.log(local.get('user').token);
                    let resp = {
                        msg: null,
                        username: null
                    };
                    let code = response.data.code;
                    console.log(response);
                    if (code == 200) {
                        let user = local.get('user');
                        user.token = response.data.content.token;
                        local.remove('user');
                        local.set('user', user);
                        resp.username = response.data.content.data;
                    }
                    resp.msg = response.data.usrmsg;
                    resolve(resp);
                })
                .catch(e => {
                    console.log("API-Resourse.js");
                    reject(e);
                });
        });
    }
};

export default {
    auth,
    local,
    cursos,
    add
};