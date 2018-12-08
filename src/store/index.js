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
        user: null
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        // pour recevoir un objet payload avec un id et un registeredMeetup
        setUser (state, payload) {
            // je réécris ou set le user avec le payload
            state.user = payload
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
                date: payload.date,
                // temporairement car l'id sera autoincrémenté dans la bdd
                id:'mon_id_temporaire'
            }
            // reach firebase and store it
            commit('createMeetup', meetup)
        },
        // un objet pour extraction de la méthode commit et un payload avec password et email
        signUserUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then (
                // je stocke ce nouvel utilisateur
                user => {
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
                    console.log(error)
                }
            )
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
            return state.user
        }
    }

})