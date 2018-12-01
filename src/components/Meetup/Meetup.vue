<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs 12>
                <v-card>
                    <v-card-title>
                        <h4 class="primary--text">{{meetup.title}}</h4>
                    </v-card-title>
                    <v-card-media
                            :src="meetup.imageUrl"
                            height="400px">
                        </v-card-media>
                        <v-card-text>
                            <div class="info--text">28 novembre 2018 - Where it takes place</div>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nisi reprehenderit deleniti eaque fugit est quod quasi accusamus incidunt corrupti cum expedita facilis magni, eius, nihil eos inventore dolorum assumenda, quisquam fuga adipisci provident nesciunt. Tempore quae quisquam libero explicabo?
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
        }
    }
}
</script>

