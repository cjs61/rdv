import Vue from 'vue';
import Vuex from 'vuex';
// utilisation du sdk firebase
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
                id: 'aze', 
                title: 'Meetup in New York',
                date: new Date()
            },
            { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
                id: 'poi', 
                title: 'Meetup in Paris',
                date: new Date() 
            }
         
        ],
        // pour ne pas commmencer l'application avec une utilisateur
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        // pour recevoir un objet payload avec un id et un registeredMeetup
        setUser (state, payload) {
            // je réécris ou set le user avec le payload
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        // j'aurai pu prendre payload comme objet et le mettre au dessus avec payload mais cela permet de voir une autre méthode
        createMeetup ({commit}, payload){
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                // j'ajoute toISOString pour pouvoir stocker la date en convertissant l'objet en string
                date: payload.date.toISOString(),
                // temporairement car l'id sera autoincrémenté dans la bdd
                // id:'mon_id_temporaire'
                
            }
            // j'envoie ma constante ci-dessus dans une node appellée meetups
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    // firebase renvoie un objet particulier
                 const key = data.key
                    // reach firebase and store it
                    // commit('createMeetup', meetup)

                    //  je commit dans un objet
                    commit('createMeetup', {
                        // je prends les propriété du createMeetup
                        ...meetup,
                        // j'utilise la valeur key comme id de ce meetup
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            
        },
        // un objet pour extraction de la méthode commit et un payload avec password et email
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then (
                // je stocke ce nouvel utilisateur
                user => {
                    commit('setLoading', false)
                    // le user que je réccupère de firebase a un format différent de id et registeredMeetups car il non encore enregistré donc je créé une constante nouvel utilisateur avec un id unique
                    const newUser = {
                        id: user.uid,
                        registeredMeetup: []
                    }
                    commit('setUser', newUser)
                }
            )
            // attrapper les erreurs
            .catch(
                error => {
                    commit('setLoading', true)
                    commit('setError', error)
                    console.log(error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then (
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.id,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups (state){
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup (state){
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user (state) {
            // je retourne mom user de vuex store
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }

})