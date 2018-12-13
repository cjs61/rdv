<template>
    <!-- mise en place d'un boléen pour ouvrir et fermer sur editDialog qui devient true avec l'activator -->
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap="">
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                required
                                v-model="editedTitle">
                            </v-text-field>
                             <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                multi-line
                                required
                                v-model="editedDescription">
                                </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
                            <!-- le bouton a un event listener sur le click qui fait référence à la méthode onSaveChanges -->
                            <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
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
            // le v-model du champs va chercher le titre du meetup spécifique
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods: {
        // cette méthode s'applique quand on clique sur le bouton Save
        onSaveChanges () {
            // je vérifie que les champs ne sont pas vides ici trim() pour enlever les espaces vides
            if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
            // pour ne rien faire et continuer
            return
            }
            // permet de fermer la fenetre qui a été ouverte par le 
            // v-model="editDialog" du v-dialog ligne 3
            this.editDialog = false
            // va chercher l'action du store et le place dans cet objet
            this.$store.dispatch('updateMeetupData', {
                // je récupère l'id que j'utilise partout
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription,
            })
        }
    }
}
</script>

