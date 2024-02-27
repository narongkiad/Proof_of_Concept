/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import axios from 'axios' // Import axios to make HTTP requests

// Components
import App from './App.vue'

const url = "https://data-customer-api.onrender.com/api/customer"

const app = createApp(App)

// Register plugins
registerPlugins(app)

// Mount the app to the DOM
app.mount('#app')

// Fetch data from the API when the app is mounted
app.mixin({
  data() {
    return {
      results: []
    }
  },
  mounted() {
    axios.get(url)
      .then(response => {
        this.results = response.data
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }
})
