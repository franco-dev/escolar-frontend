<template>
    <v-container grid-list-lg>
        <form @submit.prevent="submit()">
            <v-layout v-if="student_data" row wrap>
                <v-flex xs6>
                    <h2>Datos del Estudiante</h2>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                        name="input-1"
                        label="Nombres"
                        v-model="student_data.nombres"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-2"
                        label="Apellido Paterno"
                        v-model="student_data.appat"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                        name="input-3"
                        label="Apellido Materno"
                        v-model="student_data.apmat"
                        :disabled="disabled"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <h2>Datos del Apoderado</h2>
                    <pre>
                        {{ student_data }}
                    </pre> 
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
      disabled: false,
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
          this.edited_student = Object.assign({}, response);
        })
        .catch(e => {
          console.log(e);
        });
    },

    submit() {

    }
  },

  mounted() {
    this.get_student();
  }
};
</script>

<style scoped>
</style>