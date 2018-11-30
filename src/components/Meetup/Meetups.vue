<template>
<v-container>
<v-layout row wrap>
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <v-card class="info">
          <v-container fluid>
              <v-layout row>
                  <v-flex xs5 sm4 md3>
                        <v-card-media
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            height="130px">
                        </v-card-media>
                    </v-flex>
    
    <v-flex xs7 sm8 md9>
        <v-card-title primary-title>
            <div>
                <h3 class="white--text mb-0">My Meetup</h3>
                <div>18 novembre 2018</div>
            </div>
        </v-card-title>
    
        <v-card-actions>
          <v-btn flat class="bt" to="">
              <v-icon left>arrow_forward</v-icon>
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
    
}
</script>
<style>
.bt{
    background-color: rgba(0, 0, 0, 0.2);
}
</style>

