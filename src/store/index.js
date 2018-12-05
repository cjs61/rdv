import Vue from 'vue';
import Vuex from 'vuex';

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
        user: {
            id: 'ruoie',
            registeredMeetups: ['fdsgh']
        }
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
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
        }
    }

})