
// utilisation du sdk firebase
import * as firebase from 'firebase'

export default {
    state : {
        // pour ne pas commmencer l'application avec un utilisateur
        user: null
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
        setUser (state, payload) {
            state.user = payload
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
        }
    },
    getters: {
        user(state) {
            // je retourne mom user de vuex store
            return state.user
        }
    }
}
