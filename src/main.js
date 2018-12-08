import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import {store} from './store'
import DateFilter from './filters/date'

import 'vuetify/dist/vuetify.min.css';
import router from './router'
// app.js
// import './stylus/main.styl';

Vue.config.productionTip = false
Vue.use(Vuetify);

Vue.filter('date', DateFilter)

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
    storageBucket: 'devmeetup-1e9a1.appspot.com'
    })
  }
})
