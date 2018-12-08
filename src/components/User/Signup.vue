<template>
    <v-container>
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
                                    <v-flex>
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
                                    <v-flex>
                                        <v-btn type="submit">Sign up</v-btn>
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
        }
    },
    methods: {
        onSignup () {
        // vuex
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password })
        }
    }
    
}
</script>
