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
                    <v-text-field v-model="form.nombres" label="Nombres" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.appat" label="Apellido Paterno" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.apmat" label="Apellidos Materno" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.ci" label="Cédula de Identidad" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="form.cel" label="Telefono o Celular" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12>
                    <v-text-field v-model="form.dir" label="Dirección" required></v-text-field>
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
                      item-value="nombre"
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
import { mapGetters } from 'vuex';
export default {
    props: ["item", 'cerrar', "guardar"],
    name: 'NuevoEstudiante',
    computed: {
    ...mapGetters(['cursosHabilitados', 'paralelosHabilitados']),
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
  }
};
</script>

<style scoped>

</style>