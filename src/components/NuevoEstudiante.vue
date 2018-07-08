<template>
      <v-card>
        <form @submit.prevent="submit()" ref="form">
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="cerrar(item)" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat type="submit">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm5>
                <v-layout wrap>
                  <v-flex xs12 sm12>
                    <h2>Datos del Estudiante:</h2>
                  </v-flex>
                   <v-flex xs12 sm12>
                        <v-text-field
                        v-model="form.nombres"
                        label="Nombres"
                        :error-messages="errors.collect('nombres')"
                        v-validate="'required|min:2'"
                        data-vv-name="nombres"
                        
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field 
                        v-model="form.appat"
                        label="Apellido Paterno"
                        :error-messages="errors.collect('appat')"
                        v-validate="'min:2'"
                        data-vv-name="appat"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        v-model="form.apmat"
                        label="Apellidos Materno"
                        :error-messages="errors.collect('apmat')"
                        v-validate="'min:2'"
                        data-vv-name="apmat"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-text-field
                        v-model.number="form.ci"
                        label="Cédula de Identidad"
                        :error-messages="errors.collect('carnet')"
                        v-validate="'required|min:6|numeric'"
                        data-vv-name="carnet"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-text-field
                        v-model.number="form.cel"
                        label="Telefono o Celular"
                        :error-messages="errors.collect('cel')"
                        v-validate="'required|min:6|numeric'"
                        data-vv-name="cel"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-text-field
                        v-model="form.dir"
                        label="Dirección"
                        :error-messages="errors.collect('dir')"
                        v-validate="'required'"
                        data-vv-name="dir"
                        >
                      </v-text-field>
                    </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      label="Curso"
                      required
                      :items="cursosHabilitados"
                      v-model="form.curso"
                      item-text="text"
                      item-value="value"
                      :error-messages="errors.collect('curso')"
                      v-validate="'required'"
                      data-vv-name="curso"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      label="Paralelo"
                      required
                      :items="paralelos"
                      item-value="value"
                      v-model="form.cursoid"
                      :error-messages="errors.collect('paralelo')"
                      v-validate="'required'"
                      data-vv-name="paralelo"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm5 offset-sm2>               
                <v-layout wrap>
                   <v-flex xs12 sm12>
                <h2>Datos del Apoderado:</h2>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="form.aponombre"
                  label="Nombres del Apoderado"
                  :error-messages="errors.collect('aponombre')"
                  v-validate="'required|min:2'"
                  data-vv-name="aponombre"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="form.apocel"
                  label="Telefono de contacto del apoderado"
                  :error-messages="errors.collect('apocel')"
                  v-validate="'required|digits:8'"
                  data-vv-name="apocel"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="form.apopar"
                  label="Parentesco"
                  :error-messages="errors.collect('apopar')"
                  v-validate="'required|min:3'"
                  data-vv-name="apopar"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <h4> (*) indica que es un campo necesario</h4>
              </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        </form>
      </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from '@/store/store';
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["item", "cerrar", "guardar", "dialog"],
  name: "NuevoEstudiante",
  computed: {
    ...mapGetters(["cursosHabilitados"]),
    ...mapState(["dictionary"]),
    paralelos() {
      return store.getters.paralelosCurso(this.form.curso);
    },
  },
  data() {
    return {
      form: {
        curso: null,
        cursoid: null,
        nombres: null,
        appat: '',
        apmat: '',
        ci: null,
        dir: null,
        cel: null,
        aponombre: null,
        apocel: null,
        apopar: null
      }
    };
  },

  watch: {
    dialog: function(val, oldVal) {
      if (oldVal) {
        setTimeout(this.limpiar, 300);
      }
    }
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.guardar(this.item, this.form);
        }
      });
    },
    limpiar() {
      let keys = Object.keys(this.form);
      for (const key in keys) {
        this.form[keys[key]] = null;
      }
      this.$validator.reset();
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  }
};
</script>

<style scoped>

</style>