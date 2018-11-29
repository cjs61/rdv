<template>
<v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app>

      <v-list>
        <!-- tile est une ligne dans la liste le v-for permet de réccupérer les icones de façon dynamique -->
        <v-list-tile v-for="item in menuItems" :key="item.title"> 
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
  <!-- dark permet de passer le texte en blanc pour qu'il soit plus lisible -->
 <v-toolbar dark class="blue lighten-1">
  <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
  <v-toolbar-title>DevMeetup</v-toolbar-title>
  <!-- pour mettre un espace entre le titre et le bouton  -->
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-xs-only">
    <v-btn flat v-for="item in menuItems" :key="item.title">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}</v-btn>
  </v-toolbar-items>
</v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout

        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
  data(){
    return {
      drawer: false,
      menuItems:[ 
      {icon: 'people', title: 'View Meetups'},
      {icon: 'room', title: 'Organize Meetup'},
      {icon: 'person', title: 'Profile'},
      {icon: 'face', title: 'Sign up'},
      {icon: 'lock_open', title: 'Sign in'}
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
