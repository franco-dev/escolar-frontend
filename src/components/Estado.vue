<template>
    <v-card :color="color" dark class="imagen" :style="{ backgroundImage: 'url(' + ruta + ')' }">
          <v-card-text class="numero">
            <v-card color="transparent" class="mt-3 mb-3" flat>
                <v-container grid-list-lg>
                    <v-layout>
                        <v-spacer></v-spacer>
                        <h3 :class="`display-3 ${text}--text text--${dl}`"> {{ numero }} </h3>
                    </v-layout>
                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <h3 :class="`display-1 ${text}--text text--${dl}`"> {{ literal }} </h3>
                    </v-layout>
                </v-container>
            </v-card>
          </v-card-text>
        </v-card>
</template>

<script>
export default {
  props: ["numero", "imagen", "color", "literal", 'text', 'dl'],
  data() {
    return {
      gradient: "to top right",
      image: "checkbox-marked-circle-outline.png"
    };
  },
  computed: {
    ruta() {
        if (this.image != null) {
            const url = require(`@/assets/${this.imagen}`);
            return url;
    } else {
        return "";
    }
  }
  }

};
</script>

<style scoped>
h3 {
  font-family: Luciano;
  font-size: 200%;
}
.imagen {
  background-size: 70% auto;
  background-repeat: no-repeat;
  background-position: left center;
}
</style>