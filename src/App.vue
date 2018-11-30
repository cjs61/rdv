<template>
<v-app>
  <!-- temporary pour que le drawer ne s ouvre pas à chaque lien cliqué -->
  <!-- router pour utiliser le router et :to pour lui dire à quoi le lier -->
    <v-navigation-drawer

      v-model="drawer"
      temporary
      fixed
      app
      >

      <v-list>
        <!-- tile est une ligne dans la liste le v-for permet de réccupérer les icones de façon dynamique -->
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link" > 
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
  <!-- dark permet de passer le texte en blanc pour qu'il soit plus lisible -->
 <v-toolbar dark class="error">
  <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
  <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link> </v-toolbar-title>
  <!-- pour mettre un espace entre le titre et le bouton  -->
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-xs-only">
    <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}</v-btn>
  </v-toolbar-items>
</v-toolbar>

    <v-content>
      <!-- <v-container fluid fill-height> -->
        <v-layout>
          <router-view></router-view>
        </v-layout>
      <!-- </v-container> -->
    </v-content>
    <v-footer color="error" app>

      <span class="white--text">&copy; 2018</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
  data(){
    return {
      drawer: false,
      menuItems:[ 
      {icon: 'people', title: 'View Meetups', link: '/meetups'},
      {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
      {icon: 'person', title: 'Profile', link: '/profile'},
      {icon: 'face', title: 'Sign up', link: '/signup'},
      {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
