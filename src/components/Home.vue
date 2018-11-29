<template>


<v-container>
    <v-layout row wrap>
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
        </v-flex>
        
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-btn large router to="/meetup/new" class="info">Organise Meetups</v-btn>
        </v-flex>
    </v-layout>
</v-container>


</template>

<script>
export default {
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

