import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        // location: 'New York',
        // description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        // location: 'Paris',
        // description: 'It\'s Paris!'
      }
    ]
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      // loadedMeetups était le tableau que j'avais fais en dur et accédé au tableau
      // que j'ai créé et récupéré (le payload)
      state.loadedMeetups = payload
  },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  },
  actions: {
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
      // Reach out to firebase and store it
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
      }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}