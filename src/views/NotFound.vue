<template>
    <v-jumbotron>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h5 class="display-2 primary--text">¡Uuuups!, 404</h5>
                    <span class="subheading">La página que estabas buscando no existe ...</span>
                    <v-divider class="my-3"></v-divider>
                    <v-btn @click="sacame" large outline color="primary" class="mx-0">Sácame de aquí</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    sacame() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>

</style>