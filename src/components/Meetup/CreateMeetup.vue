<template>
   <v-container>
       <v-layout row>
           <v-flex xs12 sm6 offset-sm3>
               <h2 class="primary--text">Create a new Meetup</h2>
           </v-flex>
        </v-layout> 
        <v-layout row>
            <v-flex xs12>
                <form>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Titre"
                                id="title"
                                v-model="title"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="Location"
                                v-model="location"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="imageURL"
                                label="ImageURL"
                                id="Image-URL"
                                v-model="imageURL"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageURL">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="Description"
                                multi-line
                                v-model="description"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
   </v-container>
</template>

<script>
export default {
    data(){
        return {
            title: '',
            location: '',
            imageURL: '',
            description: ''

        }
    }
}
</script>
