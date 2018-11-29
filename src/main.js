import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify';


import 'vuetify/dist/vuetify.min.css';
import router from './router'
// app.js
// import './stylus/main.styl';

Vue.config.productionTip = false
Vue.use(Vuetify);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
