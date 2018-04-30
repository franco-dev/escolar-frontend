<template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="cerrar(item)" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="guardar(item, form)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

       <!--  <v-card-title class="mb-0 pb-0">
          <span class="headline">Inscribir Estudiante</span>
        </v-card-title> -->
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm5>
                <v-layout wrap>
                  <v-flex xs12 sm12>
                    <h2>Datos del Estudiante:</h2>
                  </v-flex>
                   <v-flex xs12 sm12>
                      <!-- <v-text-field v-model="form.nombres" label="Nombres" :counter="10" :error-messages="namesErrors" @input="$v.names.$touch()" required></v-text-field> -->
                      <v-text-field
                        v-model="form.nombres"
                        label="Nombres"
                        :error-messages="errors.collect('nombres')"
                        v-validate="'required|min:2'"
                        data-vv-name="nombres"
                        
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-text-field 
                        v-model="form.appat"
                        label="Apellido Paterno"
                        :error-messages="errors.collect('appat')"
                        v-validate="'required|min:2'"
                        data-vv-name="appat"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-text-field
                        v-model="form.apmat"
                        label="Apellidos Materno"
                        :error-messages="errors.collect('apmat')"
                        v-validate="'required|min:2'"
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
                        v-validate="'required|digits:8'"
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
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      label="Paralelo"
                      required
                      :items="paralelos"
                      item-value="value"
                      v-model="form.cursoid"
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
                <v-text-field v-model="form.aponombre" label="Nombres del Apoderado" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field v-model="form.apocel" label="Telefono de contacto del apoderado" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field v-model="form.apopar" label="Parentesco" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <h4> (*) indica que es un campo necesario</h4>
              </v-flex>
                </v-layout>
              </v-flex>
              
              
            </v-layout>
          </v-container>
        </v-card-text>
       <!--  <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cerrar(item)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="guardar(item)">Save</v-btn>
        </v-card-actions> -->
      </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
   $_veeValidate: {
      validator: 'new'
    },
    props: ["item", 'cerrar', "guardar"],
    name: 'NuevoEstudiante',
    computed: {
    ...mapGetters(['cursosHabilitados', 'paralelosHabilitados']),
    ...mapState(['dictionary']),
    paralelos() {
        let sw = false;
        let paralelos = [];
        for (let i = 0; i < this.paralelosHabilitados.length && !sw; i++) {
            if (this.paralelosHabilitados[i].curso == this.form.curso) {
               // paralelos = this.paralelosHabilitados[i].paralelos;
                for (let j = 0; j < this.paralelosHabilitados[i].paralelos.length; j++) {
                    paralelos.push({
                        text: this.paralelosHabilitados[i].paralelos[j].paralelo,
                        value: this.paralelosHabilitados[i].paralelos[j].id
                    });
                }
                sw = true;
            }
        }
       // console.log(this.paralelosHabilitados[2].curso )
        return paralelos;
    }
  },
  data() {
    return {
        form: {
            curso: null,
            cursoid: null,
            nombres: null,
            appat: null,
            apmat: null,
            ci: null,
            dir: null,
            cel: null,
            aponombre: null,
            apocel: null,
            apopar: null
        }
    };
  },
  mounted () {
      this.$validator.localize('en', this.dictionary)
    },
};
</script>

<style scoped>

</style>