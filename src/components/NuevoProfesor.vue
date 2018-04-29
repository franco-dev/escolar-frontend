<template>
      <v-card>
        <form @submit.prevent="submit()" ref="form">
          <v-toolbar dark color="primary">
            <v-btn icon @click.native="cerrar(item)" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Nuevo Profesor</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <!--  <v-btn dark flat type="submit"
                      :loading="formState.loading"
                      @click.native="formState.loading = true"
                      :disabled="!formIsValid || formState.loading">Login</v-btn> -->
              <v-btn dark flat type="submit">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

        <!--  <v-card-title class="mb-0 pb-0">
            <span class="headline">Inscribir Estudiante</span>
          </v-card-title> -->
          <v-card-text>
            <v-container>
              <v-layout wrap>
                <v-flex xs12 sm5 offset-sm1>
                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <h2>Materias a dictar:</h2>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-select
                      color="deep-purple darken-4"
                      label="Materias"
                      :items="getMaterias"
                      v-model="form.materias"
                      item-text="name"
                      item-value="id"
                      multiple
                      chips
                      max-height="auto"
                      autocomplete
                      append-icon="control_point"
                      :error-messages="errors.collect('materias')"
                      v-validate="'required'"
                      data-vv-name="materias"
                      required
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
                <v-flex xs12 sm5 offset-sm1>
                  <v-layout wrap>
                    <v-flex xs12 sm12>
                      <h2>Datos del nuevo Profesor:</h2>
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
                  </v-layout>
                </v-flex>
                <pre>
                </pre>
                
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
    $_veeValidate: {
      validator: 'new'
    },
    props: ["item", 'cerrar', "guardar"],

     computed: {
    ...mapGetters(['getMaterias']),
    form_valid() {
      return !!this.form.materias.length && !!this.form.nombres && !!this.form.appat && !!this.form.apmat && !!this.form.ci && !!this.form.dir && !!this.form.cel;
    },
  },
  data() {
    return {
        form: {
            materias: null,
            nombres: null,
            appat: null,
            apmat: null,
            ci: null,
            dir: null,
            cel: null,
        },
        name: '',
        dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          nombres: {
            required: () => 'El nombre no puede estar vacio.',
            min: (field, params) => `El nombre debe contener al menos ${params} caracteres.`
            // custom messages
          },
          appat: {
            required: () => 'El apellido paterno no puede estar vacio.',
            min: (field, params) => `El apellido paterno debe contener al menos ${params} caracteres.`
            // custom messages
          },
          apmat: {
            required: () => 'El apellido materno no puede estar vacio.',
            min: (field, params) => `El apellido materno debe contener al menos ${params} caracteres.`
            // custom messages
          },
          carnet: {
            required: () => 'La cédula de identidad no puede estar vacio.',
            min:(field, params) => `El cédula de identidad debe contener al menos ${params} dígitos númericos.`,
            numeric: 'La cédula de identidad debe ser númerico.'
            // custom messages
          },
          cel: {
            required: () => 'El número telefonico no puede estar vacio.',
            digits: (field, params) => `El número telefonico debe contener ${params} dígitos númericos.`,
            // custom messages
          },
          materias: {
             required: 'Las materias a dictar son requeridas.'
          },
          dir: {
             required: 'La dirección es requerida.'
          }
        }
      }
    };
  },

  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.guardar(this.item, this.form);
        }
      });
    }
  },
   mounted () {
      this.$validator.localize('en', this.dictionary)
    },
};
</script>

<style>
  .list__tile--active/*  > .list__tile__content > .list__tile__title  */{
    font-weight: bold;
    background-color: rgba(100, 0, 200, 0.2);
    display: block
  }
</style>