<template>
        <!-- mise en place d'un boléen pour ouvrir et fermer sur editDialog qui devient true avec l'activator -->
    <v-dialog width="350px" persistent v-model="editDialog">
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
        props: ['meetup'],
        data () {
            return { 
            editDialog: false,
            editableDate: null
            }
        },
        methods: {
            onSaveChanges () {
              
    //             const newDate = new Date(this.meetup.date)
    //             const newDay = new Date(this.editableDate).getUTCDate()
    //             const newMonth = new Date(this.editableDate).getUTCMonth()
    //             const newYear = new Date(this.editableDate).getUTCYear()
    //             newDate.setUTCDate(newDay)
    //             newDate.setUTCMounth(newMounth)
    //             newDate.setUTCFullYear(newYear)

                // const pickerDate = new Date(this.meetup.date)  
                // this.$store.dispatch('updateMeetupData', {
                //     id: this.meetup.id,
                //     date: newDate
                // })
                this.editDialog = false
                // va chercher l'action du store et le place dans cet objet
                this.$store.dispatch('updateMeetupData', {
                // je récupère l'id que j'utilise partout
                id: this.meetup.id,
                date: this.editableDate
            })
        },
        // created () {
        //     this.editableDate = pickerDate.getUTCFullYear() + '-' + (pickerDate.getUTCMonth() + 1) + '-' + pickerDate.getUTCDate()
        //     // this.editableDate = new Date(this.meetup.date)
        created: function () {
            const dateTime = moment()
            this.date = dateTime.format('YYYY-MM-DD').toString()
            this.time = dateTime.format('HH:mm').toString()
        }
    }
}
</script>

