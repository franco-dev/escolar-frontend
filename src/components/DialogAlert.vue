<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> {{ title }} </v-card-title>
        <v-card-text>
            {{ msg }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline color="primary" @click="action">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        props: ['title', 'msg', 'dialog', 'action']
    }
</script>

<style scoped>

</style>