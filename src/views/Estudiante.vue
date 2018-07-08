<template>
    <v-container grid-list-lg>
      <loading :loading="loading"></loading>
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
                    <span>NOMBRE DE USUARIO:</span> {{ student_data.username }} <br>
                    <span>FECHA DE INSCRIPCIÓN:</span> {{ student_data.fecha }}
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
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-2"
                        label="Apellido Paterno"
                        v-model="edited_student.appat"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-3"
                        label="Apellido Materno"
                        v-model="edited_student.apmat"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-4"
                        label="Cédula de Identidad"
                        v-model="edited_student.ci"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-5"
                        label="Dirección"
                        v-model="edited_student.dir"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-6"
                        label="Número de Celular"
                        v-model="edited_student.nrocel"
                        :readonly="disabled"
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
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-8"
                        label="Parentesco"
                        v-model="edited_student.apopar"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        name="input-9"
                        label="Número de referencia"
                        v-model="edited_student.aponro"
                        :readonly="disabled"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-end>
                      <v-btn dark :disabled="loading" :color="disabled ? 'primary' : 'error'" @click.stop="disabled = !disabled">{{ disabled ? 'Editar Datos' : 'Cancelar'}}</v-btn>
                      <v-btn :disabled="loading" v-if="!disabled" color="primary" dark @click.native="submit()">Guardar</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </form>
        <v-snackbar
      :timeout="msg.timeout"
      :top="msg.y === 'top'"
      :bottom="msg.y === 'bottom'"
      :right="msg.x === 'right'"
      :left="msg.x === 'left'"
      :multi-line="msg.mode === 'multi-line'"
      :vertical="msg.mode === 'vertical'"
      v-model="msg.visible"
    >
      {{ msg.text }}
      <v-btn flat color="pink" @click.native="msg.visible = false">Cerrar</v-btn>
    </v-snackbar>
    </v-container>
        
</template>

<script>
import resource from "@/util/api-resource";
import Loading from '@/components/Loading';
export default {
  components: {
    Loading
  },
  data() {
    return {
      id: this.$route.params.id,
      student_data: null,
      edited_student: null,
      disabled: true,
      loading: false,
      msg: {
        visible: false,
        y: "bottom",
        x: "left",
        mode: "",
        timeout: 15000,
        text: ""
      },
    };
  },

  watch: {
    $route(to) {
      this.id = to.params.id;
      this.get_student();
    },
  },

  methods: {
    get_student() {
      this.loading = true;
      resource.estudiantes
        .get_student(this.id)
        .then(response => {
          this.student_data = Object.assign({}, response);
          this.loading = false;
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
          this.loading = false;
          console.log(e);
        });
    },

    submit() {
      this.loading = true;
      resource.estudiantes
        .saveStudent(this.edited_student, this.id)
        .then(response => {
          this.msg.text = response.msg;
          this.msg.visible = true;
          this.disabled = true;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
          this.disabled = true;
          this.loading = false;
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