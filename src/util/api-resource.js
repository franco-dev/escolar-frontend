import axios from "axios";
import router from "@/router";
import store from "@/store/store";

// URL's
const API_URL = "http://blackcrozz.com/escolar-api/";
const LOGIN_URL = API_URL + "admin/login";
const CURSOS_URL = API_URL + "admin/cursos";
const INSCRIBIR_URL = API_URL + "admin/inscripcion";
const TEACHER_URL = API_URL + "admin/profesor";
const HORARIO_URL = API_URL + "admin/horario/curso/";
const ESTUDIANTES_URL = API_URL + "admin/estudiantes";
const ESTUDIANTE_URL = API_URL + "admin/estudiante/";
const DOCENTES_URL = API_URL + "admin/profesores";
const DOCENTE_URL = API_URL + "admin/profesor/";

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
            local.set("user", response.data.content.data.admin);
            local.set("token", response.data.content.token);
            local.set("materias", response.data.content.data.materias);
            console.log("token de Login: " + response.data.content.token);
            store.commit("setMaterias", response.data.content.data.materias);
            /*  if (creds.remember) local.set('login-user', creds);
                        else local.remove('login-user'); */
            router.push(redirect);
            resp.enter = true;
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
    localStorage.clear();
    router.push("/login");
  },

  checkAuth: () => !!local.get("token")
};

const cursos = {
  pedirCursos() {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "get",
        url: CURSOS_URL,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          // console.log("Token enviado: ", local.get('token'));
          let code = response.data.code;
          if (code == 200) {
            console.log(local.get("token"));
            local.set("token", response.data.content.token);
            console.log(response.data.content.token);
            //console.log('Cambiooooo');
          }
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  guardarCursos(creds) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: CURSOS_URL,
        data: creds,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resolve(response.data);
        })
        .catch(e => {
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
          Authorization: local.get("token")
        }
      })
        .then(response => {
          //console.log(local.get('user').token);
          let resp = {
            msg: null,
            username: null
          };
          let code = response.data.code;
          if (code == 200) {
            console.log(local.get("token"));
            local.set("token", response.data.content.token);
            console.log(response.data.content.token);
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

  newTeacher(creds) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "post",
        url: TEACHER_URL,
        data: creds,
        headers: {
          Authorization: local.get("token")
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
            console.log(local.get("token"));
            local.set("token", response.data.content.token);
            console.log(response.data.content.token);
            resp.username = response.data.content.data;
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

const horario = {
  pedirHorario(id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "get",
        url: HORARIO_URL + id,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          // console.log("Token enviado: ", local.get('token'));
          let code = response.data.code;
          if (code == 200) {
            // console.log(local.get("token"));
            local.set("token", response.data.content.token);
            //console.log(response.data.content.token);
            //console.log('Cambiooooo');
          }
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  saveHorario(creds, id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "post",
        url: HORARIO_URL + id,
        data: creds,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          //console.log(local.get('user').token);
          let resp = { msg: null};
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

const estudiantes = {
  get_students() {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "get",
          url: ESTUDIANTES_URL,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          // console.log("Token enviado: ", local.get('token'));
          let code = response.data.code;
          if (code == 200) {
            // console.log(local.get("token"));
            local.set("token", response.data.content.token);
            //console.log(response.data.content.token);
            //console.log('Cambiooooo');
          }
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  get_student(id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "get",
          url: ESTUDIANTE_URL + id,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          //console.log(local.get('user').token);
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resolve(response.data.content.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  saveStudent(creds, id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "put",
          url: ESTUDIANTE_URL + id,
          data: creds,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          //console.log(local.get('user').token);
          let resp = {
            msg: null
          };
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

const docentes = {
  get_teachers() {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "get",
        url: DOCENTES_URL,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  saveTeacher(creds, id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "put",
          url: DOCENTE_URL + id,
          data: creds,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          //console.log(local.get('user').token);
          let resp = {
            msg: null
          };
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

export default {
  auth,
  local,
  cursos,
  add,
  horario,
  estudiantes,
  docentes
};
