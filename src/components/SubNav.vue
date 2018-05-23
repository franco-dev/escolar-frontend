<template>
    <nav>
    <v-toolbar class="hidden-sm-and-down" flat color="grey lighten-3">
     <!--  <v-toolbar-title>
        <router-link class="nav-item" to="/">MySite</router-link>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="mr-0">
        <v-btn v-for="item in items" :key="item.title" flat="flat" :to="{name: item.ruta}">
          <v-icon class="pr-3"> {{ item.icon }} </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div class="hidden-md-and-up">
      <v-expansion-panel color="red">
        <v-expansion-panel-content class="grey lighten-3">
          <div slot="header">Acciones</div>
          <v-card>
            <v-list class="pt-0 pb-0">
              <v-list-tile avatar v-for="item in items" :key="item.title" :to="{name: item.ruta}">
                <v-list-tile-avatar>
                  <v-icon :class="[item.iconClass]"> {{ item.icon }} </v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </nav>
</template>

<script>
    export default {
        props: ["items"],
        data() {
            return {
               e1: 'Cursos',
              currentItem: 'Cursos'
            }
        },
        methods: {
      addItem (item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1)
        )
        this.more.push(...removed)
        this.$nextTick(() => { this.currentItem = 'tab-' + item })
      }
    }
    }
</script>

<style scoped>

</style>