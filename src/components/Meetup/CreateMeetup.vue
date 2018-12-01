<template>
   <v-container>
       <v-layout row>
           <v-flex xs12>
               <h2 class="primary--text">Create a new Meetup</h2>
           </v-flex>
        </v-layout> 
        <v-layout row>
            <v-flex xs12>
                 <v-form v-model="valid">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Titre"
                                id="title"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
   </v-container>
</template>