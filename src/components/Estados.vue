<template>
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <v-card color="indigo lighten-1" dark class="imagen">
          <v-card-text class="numero">
            <v-card color="transparent" class="mt-3 mb-3" flat>
                <v-layout class="pr-3 pb-0 number">
                    <v-spacer></v-spacer> {{habilitados}}
                </v-layout>
                <v-layout class="pt-0 pb-0 texto">
                    <v-spacer></v-spacer> Habilitados
                </v-layout>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12>
        <v-card color="red lighten-1" dark  class="imagen2">
          <v-card-text class="numero">
            <v-card color="transparent" class="mt-3 mb-3" flat>
                <v-layout class="pr-3 pb-0 number">
                    <v-spacer></v-spacer> {{nohabilitados}}
                </v-layout>
                <v-layout class="pt-0 pb-0 texto">
                    <v-spacer></v-spacer>Inhabilitado
                </v-layout>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
    export default {
         
        data() {
            return {
                
            }
        },
    }
</script>

<style scoped>
.imagen {
    background-image: url('./../assets/checkbox-marked-circle-outline.png');
    background-size: 70% auto;
    background-repeat: no-repeat;
    background-position: left center;
}

.imagen2 {
    background-image: url('./../assets/alert-circle-outline.png');
    background-size: 70% auto;
    background-repeat: no-repeat;
    background-position: left center;
}

.number {
    font-size: 60px;
}

.texto {
    font-size: 22px;
}
</style>