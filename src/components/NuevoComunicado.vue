<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ item.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                label="Título"
                v-model="form.titulo"
                :error-messages="errors.collect('campo')"
                v-validate="'required|min:3'"
                data-vv-name="campo"></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-textarea
                    name="contenido"
                    box
                    label="Contenido"
                    auto-grow
                    v-model="form.cont"
                  ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click.native="cerrar(item)">Cerrar</v-btn>
          <v-btn color="primary" @click.native="submit()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapState } from "vuex";
import resource from "@/util/api-resource";
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["item", "dialog", "cerrar", "guardar"],
  name: "NuevaTarea",

  computed: {
    ...mapState(["dictionary"])
  },

  data() {
    return {
      form: {
        titulo: null,
        cont: null
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
          this.form.id = resource.local.get("actual").id;
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