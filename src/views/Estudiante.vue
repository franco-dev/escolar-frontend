<template>
    <v-container grid-list-lg>
        <form @submit.prevent="submit()">
            <v-layout v-if="student_data" row wrap>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs6>
                      <h1>FICHA DEL ESTUDIANTE</h1>
                      </v-flex>
                      <v-flex xs6>
                       
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 md6>
                    <h3> {{ student_data.nombres | upper }} {{ student_data.appat | upper }} {{ student_data.apmat | upper }} </h3>
                  </v-flex>
                  <v-flex xs12 md6 class="ficha">
                    <span>CURSO:</span> {{ student_data.curso.nro | literal | upper }} DE SECUNDARIA <br>
                    <span>PARALELO:</span> {{ student_data.curso.paralelo | upper }} <br>
                    <span>NOMBRE DE USUARIO:</span> {{ student_data.username }}
                  </v-flex>
                </v-layout>
              </v-flex>
                <v-flex xs6>
                    <h2>DATOS DEL ESTUDIANTE</h2>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                        name="input-1"
                        label="Nombres"
                        v-model="edited_student.nombres"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-2"
                        label="Apellido Paterno"
                        v-model="edited_student.appat"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-3"
                        label="Apellido Materno"
                        v-model="edited_student.apmat"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-4"
                        label="Cédula de Identidad"
                        v-model="edited_student.ci"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-5"
                        label="Dirección"
                        v-model="edited_student.dir"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-6"
                        label="Número de Celular"
                        v-model="edited_student.nrocel"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <h2>DATOS DEL APODERADO</h2>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                        name="input-7"
                        label="Nombre del Apoderado"
                        v-model="edited_student.aponombre"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-8"
                        label="Parentesco"
                        v-model="edited_student.apopar"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-9"
                        label="Número de referencia"
                        v-model="edited_student.aponro"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-end>
                      <v-btn dark :color="disabled ? 'indigo' : 'red'" @click.stop="disabled = !disabled">{{ disabled ? 'Editar Datos' : 'Cancelar'}}</v-btn>
                      <v-btn v-if="!disabled" color="indigo" dark @click.native="submit()">Guardar</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </form>
    </v-container>
        
</template>

<script>
import resource from "@/util/api-resource";
export default {
  data() {
    return {
      id: this.$route.params.id,
      student_data: null,
      edited_student: null,
      disabled: true
    };
  },
  watch: {
    $route(to) {
      this.id = to.params.id;
      this.get_student();
    }
  },

  methods: {
    get_student() {
      resource.estudiantes
        .get_student(this.id)
        .then(response => {
          console.log(response);
          this.student_data = Object.assign({}, response);
          this.edited_student = {
            nombres: response.nombres,
            appat: response.appat,
            apmat: response.apmat,
            ci: response.ci,
            dir: response.dir,
            nrocel: response.nrocel,
            aponombre: response.apoderado.nombre,
            aponro: response.apoderado.nroref,
            apopar: response.apoderado.parentesco
          };
        })
        .catch(e => {
          console.log(e);
        });
    },

    submit() {
      resource.estudiantes
        .saveStudent(this.edited_student, this.id)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.get_student();
  }
};
</script>

<style scoped>
.ficha > span {
  font-weight: bold;
}
</style>