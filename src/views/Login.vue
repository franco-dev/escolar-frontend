<template>
    <!-- <v-layout row wrap>
      <v-flex class="mt-3" 12 sm8 md6 lg4 offset-xs0 offset-sm2 offset-md3 offset-lg4>
        <v-card class="elevation-10">
          <v-toolbar color="primary" dark class="pt-3 pb-3"  align-center>
            <v-flex>
              <v-toolbar-title class="headline">
                Inicio de Sesión
              </v-toolbar-title>
            </v-flex>
          </v-toolbar>
          <v-form @submit.prevent="submit" ref="form">
            <v-card-text class="pb-0">
              <v-flex>
                <v-text-field
                  prepend-icon="person_outline"
                  :append-icon="form.ci ? 'clear' : 'create'"
                  :append-icon-cb="form.ci ? ()=>resetForm() : ()=>''"
                  name="unsername"
                  label="Nombre de usuario"
                  id="username" 
                  :rules="[formState.rules.required]" 
                  v-model="form.ci"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  prepend-icon="lock_outline"
                  name="password"
                  label="Ingresa tu contraseña"
                  hint="Al menos 8 carácteres"
                  min="8"
                  :append-icon="formState.ocultar ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (formState.ocultar = !formState.ocultar)"
                  :rules="[formState.rules.required]" 
                  v-model="form.password"
                  :type="formState.ocultar ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
              <v-flex class="pb-0 pt-0">
                <v-checkbox
                  color="success"
                  label="Recuerdame"
                  v-model="form.remember"
                ></v-checkbox>
              </v-flex>
            </v-card-text>
            <v-card-actions class="pt-0" align-center>
              <v-flex class="pt-0">
                <v-btn 
                  block
                  large
                  color="primary"
                  type="submit"
                  :loading="formState.loading"
                  @click.native="formState.loading = true"
                  :disabled="!formIsValid || formState.loading"
                >
                  Log in
                  <v-icon right>send</v-icon>
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-snackbar
            :timeout="snackbar.timeout"
            :color="snackbar.color"
            :multi-line="snackbar.mode === 'multi-line'"
            :vertical="snackbar.mode === 'vertical'"
            :top="snackbar.y === 'top'"
            :bottom="snackbar.y === 'bottom'"
            v-model="snackbar.snackbar"
        >
          {{ snackbar.text }}
          <v-btn flat icon dark @click.native="snackbar.snackbar = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout> -->
    <!-- <v-app> -->
      <v-content>
        <v-jumbotron height="100%" color="secondary">
        <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary" class="pt-2 pb-3">
                <!-- <v-icon large>school</v-icon> -->
                  <img class="mt-3" width="60px" src="./../assets/school_logo.png">
                  <v-layout row wrap>
                    <v-flex xs7>
                      <v-toolbar-title class="titulo">
                        Inicio de Sesión
                        <v-layout row wrap>
                          <span class="light-blue--text subheading mt-0 pt-0"> SIA San Sebastián B</span>
                        </v-layout>
                        
                      </v-toolbar-title>
                    </v-flex>
                    <v-flex xs5>
                      <v-toolbar-title>
                        <v-switch
                          v-model="login"
                          :label="login ? 'Admin' : 'Profesor'"
                          color="light-blue"
                          class="mt-3 ml-3"
                          hide-details
                        ></v-switch>
                      </v-toolbar-title>
                    </v-flex>
                  </v-layout>
               <!--  <v-spacer></v-spacer> -->
              </v-toolbar>
               <v-form @submit.prevent="submit" ref="form">
                  <v-card-text>
                    <v-text-field prepend-icon="person" name="login" label="Nombre se usuario" type="text"
                      :append-icon="form.ci ? 'clear' : 'create'"
                    :append-icon-cb="form.ci ? ()=>resetForm() : ()=>''"
                    :rules="[formState.rules.required]" 
                    v-model="form.ci"></v-text-field>
                    <v-text-field 
                    prepend-icon="lock" name="password" label="Password"
                    id="password"
                    hint="Al menos 8 carácteres"
                    :append-icon="formState.ocultar ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (formState.ocultar = !formState.ocultar)"
                    :rules="[formState.rules.required]" 
                    v-model="form.password"
                    :type="formState.ocultar ? 'password' : 'text'"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit"
                    :loading="formState.loading"
                    @click.native="formState.loading = true"
                    :disabled="!formIsValid || formState.loading">Login</v-btn>
                  </v-card-actions>
               </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </v-jumbotron>
      <v-snackbar
        :timeout="alert.timeout"
        :top="alert.y === 'top'"
        :bottom="alert.y === 'bottom'"
        :right="alert.x === 'right'"
        :left="alert.x === 'left'"
        :multi-line="alert.mode === 'multi-line'"
        :vertical="alert.mode === 'vertical'"
        v-model="alert.visible"
        :color="alert.color"
        >
        {{ alert.text }}
        <v-btn flat color="red" @click.native="alert.visible = false">Cerrar</v-btn>
        </v-snackbar>
    </v-content>
  <!--   </v-app> -->
</template>

<script>
import resource from "@/util/api-resource";
export default {
  name: "Login",
  data() {
    const defaultForm = Object.freeze({
      ci: null,
      password: null,
      remember: null
    });

    return {
      form: Object.assign({}, defaultForm),
      login: false,
      alert: {
        visible: false,
        color: "primary",
        mode: "multi-line",
        timeout: 15000,
        text: null,
        y: "top",
        x: ''
      },
      formState: {
        ocultar: true,
        rules: {
          required: value => !!value || "Campo necesario."
        },
        loading: false
      },
      defaultForm
    };
  },

  mounted() {
    let local = resource.local.get("login-user");
    if (local) {
      this.form.ci = local.ci;
      this.form.password = local.password;
      this.form.remember = local.remember;
    }
  },

  computed: {
    formIsValid() {
      return this.form.ci && this.form.password;
    }
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },

    ocultar() {
      this.alert.visible = false;
    },

    submit() {
      if (this.login) {
        resource.auth
        .login(this.form, "/")
        .then(response => {
          this.formState.loading = false;
          this.alert.text = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      } else {
        resource.auth
        .loginTeacher(this.form, "/profesor")
        .then(response => {
          this.formState.loading = false;
          this.alert.text = response.msg;
          this.alert.visible = true;
        })
        .catch(e => {
          console.log(e);
        });
      }
      this.resetForm();
    },
  }
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>