<template>
      <v-card>
        <form @submit.prevent="submit" ref="form">
          <v-toolbar dark color="primary">
            <v-btn icon @click.native="cerrar(item)" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Nuevo Profesor</v-toolbar-title>
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
                <v-flex xs12 sm5 offset-sm6>
                  <v-layout wrap>
                    <v-flex xs12 sm12>
                      <h2>Datos del nuevo Profesor:</h2>
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
                    <v-flex xs12 sm12>
                      <v-select
                      color="indigo"
                      label="Materias"
                      :items="getMaterias"
                      v-model="form.materias"
                      item-text="name"
                      item-value="id"
                      multiple
                      chips
                      max-height="auto"
                      autocomplete
                      append-icon="map"
                      hide-details
                      >
                      <template slot="selection" slot-scope="data">
                          <v-chip
                          close
                          @input="data.parent.selectItem(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                          :key="JSON.stringify(data.item)"
                          >
                          {{ data.item.nombre }}
                          </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                          <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template>
                          <template v-else>
                          <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.nombre"></v-list-tile-title>
                              <v-list-tile-sub-title v-html="data.item.id"></v-list-tile-sub-title>
                          </v-list-tile-content>
                          </template>
                      </template>
                      </v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                
                
              </v-layout>
            </v-container>
          </v-card-text>
        </form>
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

     computed: {
    ...mapGetters(['getMaterias']),
  },
  data() {
    return {
        form: {
            materias: [],
            nombres: null,
            appat: null,
            apmat: null,
            ci: null,
            dir: null,
            cel: null,
        }
    };
  }
};
</script>

<style scoped>

</style>