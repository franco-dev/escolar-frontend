<template>
    <div>
        <v-layout wrap>
            <v-flex xs12 sm12>
                <h2> {{ titulo }}:</h2>
            </v-flex>
            <v-flex xs12 sm12>
                <v-text-field
                    v-model.trim="t_nombres"
                    label="Nombres"
                    :error-messages="errors.collect('nombres')"
                    v-validate="'required|min:2'"
                    data-vv-name="nombres"
                ></v-text-field>
            </v-flex>
          <!--   <v-flex xs12 sm12>
                <v-text-field 
                    v-model="appat"
                    label="Apellido Paterno"
                    :error-messages="errors.collect('appat')"
                    v-validate="'required|min:2'"
                    data-vv-name="appat"
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
                <v-text-field
                    v-model="apmat"
                    label="Apellidos Materno"
                    :error-messages="errors.collect('apmat')"
                    v-validate="'required|min:2'"
                    data-vv-name="apmat"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
                <v-text-field
                    v-model.number="ci"
                    label="Cédula de Identidad"
                    :error-messages="errors.collect('carnet')"
                    v-validate="'required|min:6|numeric'"
                    data-vv-name="carnet"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
                <v-text-field
                    v-model.number="cel"
                    label="Telefono o Celular"
                    :error-messages="errors.collect('cel')"
                    v-validate="'required|digits:8'"
                    data-vv-name="cel"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
                <v-text-field
                    v-model="dir"
                    label="Dirección"
                    :error-messages="errors.collect('dir')"
                    v-validate="'required'"
                    data-vv-name="dir"
                ></v-text-field>
            </v-flex> -->
        </v-layout>
    </div>
</template>

<script>
import store from "@/store/store";
import { mapState } from "vuex";
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["nombres", /*  "appat", "apmat", "cel", "dir", "ci",  */ "titulo"],
  computed: {
    ...mapState(["dictionary"]),
    t_nombres: {
      get() {
        return this.nombres;
      },
      set(value) {
        this.$emit("nombres", value);
      }
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  }
};
</script>

<style scoped>

</style>