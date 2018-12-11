<template>
<v-app>
    <!-- temporary pour que le drawer ne s ouvre pas à chaque lien cliqué -->
   
    <v-navigation-drawer
       fixed
        v-model="drawer"   
    >
        <v-list>
            <!-- tile est une ligne dans la liste le v-for permet de réccupérer les icones
            de façon dynamique -->
            <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
                v-if="userIsAuthenticated"
                @click="onLogout">
                <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>Logout</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

    <!-- dark permet de passer le texte en blanc pour qu'il soit plus lisible -->
    <v-toolbar app :clipped-left="clipped" dark="dark" class="error">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">DevMeetup
            </router-link>
        </v-toolbar-title>
        
        <!-- pour mettre un espace entre le titre et le bouton -->
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
                <v-icon left="left" dark="dark">{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
            <v-btn 
            flat 
            v-if="userIsAuthenticated"
            @click="onLogout">
                <v-icon left="left" dark="dark">exit_to_app</v-icon>
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <v-container fluid="fluid">
            <v-layout row wrap>
                <router-view></router-view>
            </v-layout>
        </v-container>
    </v-content>
    <v-footer :fixed="fixed" color="error" app>
        <span class="white--text">&copy; 2018</span>
    </v-footer>
</v-app>

</template>

<script>
    export default {
        data(){
            return {
                drawer: false,
            }
        },
        computed: {
            // j'ajuste le menu en fonction de l'authentification
            menuItems () {
                let menuItems = [ 
                    {icon: 'face', title: 'Sign up', link: '/signup'},
                    {icon: 'lock_open', title: 'Sign in', link: '/signin'}
                ]
                // ici userIsAuthenticated n'est pas utilisé comme une méthode mais comme une propriété
                if (this.userIsAuthenticated) {
                    menuItems = [
                        {icon: 'people', title: 'View Meetups', link: '/meetups'},
                        {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
                        {icon: 'person', title: 'Profile', link: '/profile'},
                    ]
                }
                return menuItems
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        },
        methods: {
            onLogout () {
                this.$store.dispatch('logout')
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
