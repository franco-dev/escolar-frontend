<template>
<div id="nav">
    <v-card @mouseover="miniVariant = false"
            @mouseleave="miniVariant = true">
        <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      hide-overlay
      app
    >
      <v-list  class="pt-0">
        <v-list-group
            v-model="item.active"
            v-for="item in items"
            :key="item.title"
            :prepend-icon="item.icon"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" 
                :key="subItem.title" 
                @click="redirigir(subItem)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>
    </v-card>
    <v-toolbar dark color="primary" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
       <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-menu left>
            <v-btn icon slot="activator" dark class="mr-4">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list class="pt-0 pb-0">  
              <v-list-tile v-for="(item, i) in menu" :key="i" @click="item.action">
                  <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
    </v-toolbar>
</div>
</template>

<script>
import resource from "@/util/api-resource";
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "exposure",
          title: "Administrar Cursos",
          items: [
            {
              title: "Cursos",
              icon: "list",
              ruta: '/cursos'
            }
          ]
        }
      ],
      menu: [
        {
          title: "Cerrar Sesión",
          icon: "power_settings_new",
          iconClass: "red--text mr-3",
          action: resource.auth.logout
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "Proyecto Escolar"
    };
  },

  methods: {
    hola() {
      console.log("Holaa");
    },

    redirigir(item) {
        this.$router.push(item.ruta);
    }
  }
};
</script>

<style scoped>
.toolbar__title {
  font-weight: bold;
}
</style>