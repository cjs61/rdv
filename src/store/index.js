import Vue from 'vue';
import Vuex from 'vuex';
// utilisation du sdk firebase
import * as firebase from 'firebase';
Vue.use(Vuex);

export const store = new Vuex.Store({
state : {
    loadedMeetups: [
        {
            imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            id: 'aze',
            title: 'Meetup in New York',
            date: new Date()
        }, {
            imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            id: 'poi',
            title: 'Meetup in Paris',
            date: new Date()
        }
    ],
    // pour ne pas commmencer l'application avec un utilisateur
    user: null,
    loading: false,
    error: null
},
mutations: {
    registerUserForMeetup (state, payload) {
        const id = payload.id
        if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >=0) {
            return
        }
        state.user.registeredMeetups.push(id)
        state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
        const registeredMeetups = state.user.registeredMeetups
        registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
        Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedMeetups(state, payload) {
        // loadedMeetups était le tableau que j'avais fais en dur et accédé au tableau
        // que j'ai créé et récupéré (le payload)
        state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
        state
            .loadedMeetups
            .push(payload)
    },
    // pour recevoir un objet payload avec un id et un registeredMeetup
    setUser(state, payload) {
        // je réécris ou set le user avec le payload
        state.user = payload
    },
    updateMeetup (state, payload) {
        const meetup = state.loadedMeetups.find(meetup => {
            return meetup.id === payload.id
        })
        if (payload.title) {
            meetup.title = payload.title
        }
        if (payload.description) {
            meetup.description = payload.description
        }
        if (payload.date) {
            meetup.date = payload.date
        }
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    clearError(state) {
        state.error = null
    }
},

actions: {
    registerUserForMeetup ({commit, getters}, payload) {
        commit('setLoading', true)
        const user = getters.user
        firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
            commit('setLoading', false)
            commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch(error => {
            console.log(error)
            commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
        commit('setLoading', true)
        const user = getters.user
        if(!user.fbKeys) {
            return
        }
        const fbKey = user.fbKeys[payload]
        firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
            commit('setLoading', false)
            commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
            console.log(error)
            commit('setLoading', false)
        })
    },
    // comme je ne vois que les meetups que je viens de créé et pas tous ceux qui
    // sont dans la Bdd, je crée une action comme je veux tous les
    // meetups je n'ai pas besoin d'un payload
    loadMeetups({commit}) {
        // création d'un loader le temps que les meetups soient chargés ici true puis
        // false
        commit('setLoading', true)
        // .on fait référence à un évènement et value à chaque fois que les données de
        // la valeur changent (firebase accède automatiquement à un web socket que l'on
        // peut renvoyer à chaque fois que les donnés changent) cependant je n'ai besoin
        // que d'un instantané donc j'utilise .once
        firebase
            .database()
            .ref('meetups')
            .once('value')
            .then((data) => {
                // stockage de toutes les valeurs (une liste de meetups) que j'ai dans meetups
                // dans un tableau
                const meetups = []
                // transformation des datas pour les utiliser dans mon appli val() permet de
                // récupérer les valeurs récupérées dans data que je stocke dans un objet (dans
                // firebase chaque clé est une propriété dans laquelle la valeur de chaque
                // propriété sera un objet avec date, description... )
                const obj = data.val()
                // je peux alors utiliser l'objet que j'ai créé
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        creatorId: obj[key].creatorId
                    })
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false)
            })
            .catch((error) => {
                console.log(error)
            })
        },
    // j'aurai pu prendre payload comme objet et le mettre au dessus avec payload
    // mais cela permet de voir une autre méthode getters
    createMeetup({
        commit,
        getters
    }, payload) {
        const meetup = {
            title: payload.title,
            location: payload.location,
            //imageUrl: payload.imageUrl,
            description: payload.description,
            // j'ajoute toISOString pour pouvoir stocker la date en convertissant l'objet en
            // string
            date: payload
                .date
                .toISOString(),
            creatorId: getters.user.id
            // tempora irement car l'id sera autoincrémenté dans la bdd
            // id:'mon_id_temporaire'
        }
        let imageUrl
        let key
        // j'envoie ma constante ci-dessus dans une node appellée meetups
        firebase
            .database()
            .ref('meetups')
            .push(meetup)
            .then((data) => {
                // firebase renvoie un objet particulier
                key = data.key
                // reach firebase and store it commit('createMeetup', meetup) je commit dans un
                // objet commit('createMeetup', { je prends les propriété du createMeetup
                // ...meetup, j'utilise la valeur key comme id de ce meetup id: key })
                return key
            })
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase
                    .storage()
                    .ref('meetups/' + key + '.' + ext)
                    .put(payload.image)
            })
        
            .then(fileData => {
                let imagePath = fileData.metadata.fullPath
                return firebase.storage().ref().child(imagePath).getDownloadURL()
                .then(url => {
                    imageUrl = url
                    console.log('File available at', url)
                    return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                  })
            })﻿
              
            .then(() => {
                commit('createMeetup', {
                    // je prends les propriété du createMeetup
                    ...meetup,
                    // comme je le récupère du template, l'url manque
                    imageUrl: imageUrl,
                    // j'utilise la valeur key comme id de ce meetup
                    id: key
                })
                
            })
            .catch((error) => {
                console.log(error)
            })
        },
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            // cela nous donne une promesse qui nous donne accès au cas ou c'est un succès
            .then(() => {
                commit('setLoading', false)
                // je réccupère l'action updateMeetup et je passe le payload qui contient les données
                commit('updateMeetup', payload)
            })
            .catch (error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
    // un objet pour extraction de la méthode commit et un payload avec password et
    // email
    signUserUp({
        commit
    }, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                // je stocke ce nouvel utilisateur
                user => {
                    commit('setLoading', false)
                    // le user que je réccupère de firebase a un format différent de id et
                    // registeredMeetups car il non encore enregistré donc je créé une constante
                    // nouvel utilisateur avec un id unique
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        // j'ajoute cette clé pour chaque utilisateur de même dans signUserIn et autoSignIn
                        // afin de pourvoir s'enregistrer à un meetup en initialisant la clé firebase
                        fbKeys: {}
                    }
                    commit('setUser', newUser)
                }
            )
            // attrapper les erreurs
            .catch(error => {
                commit('setLoading', true)
                commit('setError', error)
                console.log(error)
            })
        },
    signUserIn({
        commit
    }, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setLoading', false)
                const newUser = {
                    id: user.uid,
                    registeredMeetups: [],
                    fbKeys: {}
                }
                commit('setUser', newUser)
            })
            .catch(error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            })
        },
    autoSignIn({
        commit
    }, payload) {
        commit('setUser', {
            id: payload.uid,
            registeredMeetups: [],
            fbKeys: {}
        })
    },
    fetchUserData ({commit, getters}) {
        commit('setLoading', true)
        firebase.database().ref('/users/' + getters.user.id + '/registrations/').once ('value')
        .then(data => {
            const dataPairs = data.val()
            let registeredMeetups = []
            // swapped veut dire échangé
            let swappedPairs = {}
            // dataPairs est une valeur que je vais utiliser dans une nouvelle clé
            for (let key in dataPairs) { 
                registeredMeetups.push(dataPairs[key])
                swappedPairs[dataPairs[key]] = key
            }
            const updatedUser = {
                id: getters.user.id,
                registeredMeetups: registeredMeetups,
                fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
        })
        .catch(error => {
            console.log(error)
            commit('setLoading', false)
        })
    },
    logout({commit}) {
        firebase
            .auth()
            .signOut()
        commit('setUser', null)
    },
    clearError({commit}) {
        commit('clearError')
    }
},
getters: {
    loadedMeetups(state) {
        return state
            .loadedMeetups
            .sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
    },
    featuredMeetups(state, getters) {
        return getters
            .loadedMeetups
            .slice(0, 5)
    },
    loadedMeetup(state) {
        return(meetupId) => {
            return state
                .loadedMeetups
                .find((meetup) => {
                    return meetup.id === meetupId
                })
        }
    },
    user(state) {
        // je retourne mom user de vuex store
        return state.user
    },
    loading(state) {
        return state.loading
    },
    error(state) {
        return state.error
    }
}
})
