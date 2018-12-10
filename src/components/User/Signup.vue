<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>   
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <!-- création d'une grid -->
                        <v-container>
                            <!-- j'enlève action= car je ne veux pas envoyer de request -->
                            <!-- je ne mets pas les parenthèses à onSignup car seul un pointer suffit -->
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required>
                                        </v-text-field>
                                     </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required>
                                        </v-text-field>
                                     </v-flex>
                                </v-layout>
                                <v-layout row>
                                     <!-- column car je lie une valeur dynamique -->
                                    <v-flex xs12>
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
    
                                        :rule="[comparePasswords]">
                                        </v-text-field> 
                                     </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn type="submit" :disabled="loading" :loading="loading">
                                            Sign up
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>

                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Password incorrect' : true
        },
        user () {
            // je renvoie le user que je viens de créer
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        },
        loading () {
            this.$store.getters.loading
        }
        
    },
    // regarde le user computed propriété
    watch: {
        // je stocke une valeur à chaque fois que le statut du user change
        user (value) {
            // je vérifie si le user existe
            if (value !== null && value !== undefined) {
                // je redirige vers la home page
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignup () {
        // vuex
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password })
        },
        onDismissed() {
            console.log('Dismissed Alert')
            this.$store.dispatch('clearError')
        }
    }
    
}
</script>
