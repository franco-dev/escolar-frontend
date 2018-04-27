<template>
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="cerrar(item)" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="guardar()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

       <!--  <v-card-title class="mb-0 pb-0">
          <span class="headline">Inscribir Estudiante</span>
        </v-card-title> -->
        <v-card-text>
            <h2>Nueva Materia</h2>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: ["item", 'cerrar', "guardar"],
    }
</script>

<style scoped>

</style>