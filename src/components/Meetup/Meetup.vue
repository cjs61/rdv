<template>
    <v-container>
        <v-layout raw wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    :width="7"
                    :size="70"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
            <v-layout row wrap v-else>
                <v-flex xs 12>
                    <v-card>
                        <v-card-title>
                            <h4 class="primary--text">{{meetup.title}}</h4>
                            <!-- je remets ici un template car je ne veux le montrer que s'il s'agit du 
                            créateur de ce template spécifique donc -->
                            <template v-if="userIsCreator">
                                <!-- pour que le bouton soit à gauche et l'icône à droite -->
                                <v-spacer></v-spacer>
                                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                            </template>
                        </v-card-title>
                        <v-img
                                :src="meetup.imageUrl"
                                height="400px">
                        </v-img>
                        <v-card-text>
                            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
                            <div>
                                <app-edit-meetup-date-dialog 
                                :meetup="meetup"
                                v-if="userIsCreator">
                                </app-edit-meetup-date-dialog>
                            </div>
                            <div>
                            <p class="text-xs-left">{{ meetup.description }}</p> 
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn dark class="error">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>
<script>
export default {
    // j'ai besoin de réccupérer l'id du meetup ; ne pas oublier d'ajouter props: true à index de router
    props: ['id'],
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        },
        // vérifier que le user id correspond au creator id
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
            // je n'écris pas userIsAuthenticated() comme une méthode car c'est juste une référence
            // à la méthode du dessus
            if(!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading () {
        return this.$store.getters.loading
        }
    }
}
</script>

