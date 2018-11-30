import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
                id: 'aze', 
                title: 'Meetup in New York',
                date: '2018-11-28'
            },
            { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
                id: 'poi', 
                title: 'Meetup in Paris',
                date: '2018-11-29' 
            }
         
        ],
        user: {
            id: 'ruoie',
            registeredMeetups: ['fdsgh']
        }
    },
    mutations: {},
    actions: {},
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
                return state.loadedMeetups.find((meetup) =>{
                    return meetup.id === meetupId
                })
            }
        }
    }

})