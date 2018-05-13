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
              <v-btn dark flat type="submit">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
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
                        v-validate="'required|min:2'"
                        data-vv-name="appat"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
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
              </v-layout>
            </v-container>
          </v-card-text>
        </form>
      </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["item", "cerrar", "guardar", "dialog"],

  computed: {
    ...mapGetters(["getMaterias"]),
    ...mapState(["list_students"]),
  },
  watch: {
    dialog: function(val, oldVal) {
      if (oldVal) {
        setTimeout(this.limpiar, 300);
      }
    }
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
        cel: null
      },
      name: ""
    };
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
      let val = null;
      for (const key in keys) {
        if (keys[key] == "materias") {
          val = [];
        }
        this.form[keys[key]] = val;
      }
      this.$validator.reset();
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  }
};
</script>

<style>
.list__tile--active {
  font-weight: bold;
  background-color: rgba(100, 0, 200, 0.2);
  display: block;
}
</style>