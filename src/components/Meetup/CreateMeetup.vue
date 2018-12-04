<template>
   <v-container>
       <v-layout row>
           <v-flex xs12 sm6 offset-sm3>
               <h2 class="primary--text">Create a new Meetup</h2>
           </v-flex>
        </v-layout> 
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
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
                                id="location"
                                v-model="location"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="imageUrl"
                                label="ImageUrl"
                                id="image-Url"
                                v-model="imageUrl"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150px">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                required>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary" 
                            :disabled="!formIsValid"
                            type="submit">Create Meetup
                            </v-btn>
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
            imageUrl: '',
            description: ''

        }
    },
    computed: {
        formIsValid () {
            return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== '' 
        }
    },
    methods: {
        // je crée un objet javascript qui contient/stock/store toutes les données stockées dans les datas
        onCreateMeetup () {
            const MeetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: new Date()

            }
            this.$store.dispatch('createMeetup', MeetupData)
        }
    }
}
</script>
