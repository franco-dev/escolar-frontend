import axios from "axios";
import router from "@/router";
import store from "@/store/store";

// URL's
const API_URL = "https://sansebastianb.com/escolarapi/";
const ADMIN_LOGIN_URL = API_URL + "admin/login";
const CURSOS_URL = API_URL + "admin/cursos";
const INSCRIBIR_URL = API_URL + "admin/inscripcion";
const TEACHER_URL = API_URL + "admin/profesor";
const HORARIO_URL = API_URL + "admin/horario/curso/";
const ESTUDIANTES_URL = API_URL + "admin/estudiantes";
const ESTUDIANTE_URL = API_URL + "admin/estudiante/";
const DOCENTES_URL = API_URL + "admin/profesores";
const DOCENTE_URL = API_URL + "admin/profesor/";
const DOCENTE_LOGIN_URL = API_URL + "prof/login";
const TRABAJOS_URL = API_URL + "prof/trabajo";
const CURSO_URL = API_URL + "prof/curso/";
const NOTAS_URL = API_URL + "prof/notas";
const COMUNICADOS_URL = API_URL + "comunicados";
const COMUNICADO_URL = API_URL + "admin/comunicado";
const ESTADISTICAS_URL = API_URL + "admin/stats";
const BIMESTRE_URL = API_URL + "admin/bimestre";

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
          url: ADMIN_LOGIN_URL,
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
            //console.log("token de Login: " + response.data.content.token);
            store.commit("setMaterias", response.data.content.data.materias);
            local.set('logged', 'admin');
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

  loginTeacher(creds, redirect) {
    return new Promise((resolve, reject) => {
      axios({
          method: "post",
          url: DOCENTE_LOGIN_URL,
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
            local.set("user", response.data.content.data.profesor);
            local.set("token", response.data.content.token);
            local.set("actual", response.data.content.data.curso_actual);
            local.set("courses", response.data.content.data.cursos);
            local.set('logged', 'teacher');
            /* console.log("token de Login: " + response.data.content.token); */
            /* store.commit("setCursos", response.data.content.data.cursos); */
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

  editarPerfil(creds, actual) {
    let url = API_URL;
    if (actual === "admin") {
      url += 'admin/perfil';
    } else {
      url += 'prof/perfil';
    }
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
        method: "put",
        url: url,
        data: creds,
        headers: {
          Authorization: local.get("token")
        }
      })
        .then(response => {
          let resp = {
            msg: null,
            enter: false,
          };
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
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
            //console.log(local.get("token"));
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
            //console.log(local.get("token"));
            local.set("token", response.data.content.token);
            //console.log(response.data.content.token);
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
            //console.log(local.get("token"));
            local.set("token", response.data.content.token);
            //console.log(response.data.content.token);
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
            //console.log(response);
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

const trabajos = {
  saveJob(creds) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "post",
          url: TRABAJOS_URL,
          data: creds,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          //console.log(response);
          let resp = {
            msg: null,
            enter: false
          };
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
            resp.code = true;
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  get_course(id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "get",
          url: CURSO_URL + id,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          //console.log(local.get('user').token);
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
            local.set("actual", response.data.content.data);
            /* console.log(response.data.content.data); */
          }
          resolve(response.data.content.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  saveRatings(creds) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "post",
          url: NOTAS_URL,
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
            //console.log(response);
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

const comunicados = {
  getReleases() {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "get",
          url: COMUNICADOS_URL,
        })
        .then(response => {
          let resp = {
            msg: null,
            enter: false,
            data: null,
          };
          let code = response.data.code;
          
          if (code == 200) {
            store.commit("setComunicados", response.data.content);
            resp.enter = true;
          }
          resp.data = response.data;
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  saveRelease(creds) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "post",
          url: COMUNICADO_URL,
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
            //console.log(response);
            local.set("token", response.data.content.token);
          }
          resp.msg = response.data.usrmsg;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  deleteRelease(id) {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "delete",
          url: COMUNICADO_URL + "/" + id,
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
  },
};

const stats = {
  getStats() {
    return new Promise((resolve, reject) => {
      //console.log(local.get('user').token);
      axios({
          method: "get",
          url: ESTADISTICAS_URL,
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

const bimestre = {
  next_bimester() {
    return new Promise((resolve, reject) => {
      axios({
          method: "get",
          url: BIMESTRE_URL,
          headers: {
            Authorization: local.get("token")
          }
        })
        .then(response => {
          let resp = {
            msg: null
          };
          let code = response.data.code;
          if (code == 200) {
            local.set("token", response.data.content.token);
          }
          resp.msg = `${response.data.usrmsg}. Para ver los cambios por favor actualice la página.`;
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
}

export default {
  auth,
  local,
  cursos,
  bimestre,
  stats,
  add,
  horario,
  estudiantes,
  docentes,
  trabajos,
  comunicados
};