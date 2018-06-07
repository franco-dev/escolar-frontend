<template>
  <v-jumbotron height="100%" class="main-content" color="white">
    Main
  </v-jumbotron>
</template>

<script>
  import NavBar from '@/components/NavBar';
  export default {
    name: 'Main',
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .main-content {
  min-height: 465px;
}
</style>