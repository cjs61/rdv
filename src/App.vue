<template>
<v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app>

      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>View Meetups</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

 <v-toolbar>
  <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
  <v-toolbar-title>DevMeetup</v-toolbar-title>
  
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-xs-only">
    <v-btn flat>
      <v-icon left>people</v-icon>
      Vue Meetups</v-btn>
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
      drawer: true
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
