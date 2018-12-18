import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

import 'vuetify/dist/vuetify.min.css'
import router from './router'
// app.js
// import './stylus/main.styl'
import colors from 'vuetify/es5/util/colors'


Vue.config.productionTip = false
// Vue.use(Vuetify)

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1,
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})﻿

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
// j'aurai pu le mettre comme composant local dans Meetup.vue car je ne l'utilise que là
// mais ici dans main.js il sera un composant global que je peux utiliser dans toute 
//l'application (ce qui est entre parenthèse est le sélecteur) je n'oubli pas de l'importer
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({    
    apiKey: 'AIzaSyCs_OGJ_PsTUXrpvTSMzWxgl20T9rIcPpg',
    authDomain: 'devmeetup-1e9a1.firebaseapp.com',
    databaseURL: 'https://devmeetup-1e9a1.firebaseio.com',
    projectId: 'devmeetup-1e9a1',
    storageBucket: 'gs://devmeetup-1e9a1.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
