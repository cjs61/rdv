<template>
<v-container>
<v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="margin mb-2">
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <v-card class="info">
          <v-container fluid>
              <v-layout row>
                  <v-flex xs5 sm4 md3>
                        <v-img
                            :src="meetup.imageUrl"
                            height="130px">
                        </v-img>
                    </v-flex>
    
    <v-flex xs7 sm8 md9>
        <v-card-title primary-title>
            <div>
                <!-- une fois que j'ai fais la boucle sur ma card je peux remplacer My Meetup par {{...}} -->
                <h3 class="white--text mb-0">{{ meetup.title }} </h3>
                <div>{{ meetup.date | date }}</div>
            </div>
        </v-card-title>
    
        <v-card-actions>
          <v-btn flat class="bt" :to="'/meetups/' + meetup.id">
              <v-icon left light>arrow_forward</v-icon>
              VIEW MEETUP
        </v-btn>
          
        </v-card-actions>
    </v-flex>
</v-layout>
</v-container>
    </v-card>
</v-flex>   



</v-layout>
</v-container>
</template>
<script>
export default {
    computed: {
        meetups () {
            // ici j'appelle la fonction en temps que propriété donc pas de ()
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>
<style>
.bt{
    background-color: rgba(0, 0, 0, 0.2);
}
</style>

