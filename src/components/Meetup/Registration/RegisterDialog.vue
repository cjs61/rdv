<template>
        <!-- le persistent sert à rester en haut de l'écran -->
    <v-dialog persistent v-model="registerDialog">
        <!-- l'activator permet de distinguer si l'on registered ou pas -->
        <v-btn accent slot="activator">
            Edit Date
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap="">
                    <v-flex xs12>
                        
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" ></v-date-picker>
                        <!-- <v-date-picker v-model="editableDate" style="width: 100% " actions></v-date-picker> -->
                        <v-template scope="{save, cancel}">
                            <v-btn 
                            class="blue--text darken-1"
                            flat
                            @click="editDialog = false">Close
                            </v-btn>
                            <v-btn 
                            class="blue--text darken-1"
                            flat
                            @click="onSaveChanges">Save
                            </v-btn>
                        </v-template>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        
    }
</script>

