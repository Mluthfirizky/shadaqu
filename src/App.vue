<template>
  <div>
    <main>
      <router-view v-if="locActive" :calendar="calendar()" :coordinates="coordinates" :shalat_url="shalat_url" :weather_api_key="weather_api_key" :weather_url="weather_url"/>
      <div class="else" v-else>
        turn on location
        <button @click="location">Turn On</button>
      </div>
    </main>
    <footer>
      <navBar/>
    </footer>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
export default {
  data(){
    return{
      locActive: false,
      coordinates: {
        lat: 0,
        lng: 0
      },
      weather_api_key: "235e5cd7b4c474bfb88728872ad5d6a5",
      weather_url: "https://api.openweathermap.org/data/2.5/",
      shalat_url: "https://api.pray.zone/v2/times/day.json",
    }
  },
  components: {
    navBar
  },
  methods: {
    location(){
      
    },
    calendar(){
      let d = new Date()
      let months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

      let day = days[d.getDay()]
      let month = months[d.getMonth()]
      let date = d.getDate()
      // let year = d.getFullYear()

      return `${day}, ${date} ${month}`
    }
  },
  beforeMount(){

     this.$getLocation({})
      .then(coordinates => {
      this.coordinates = coordinates
      this.locActive = true
    }
    )
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
body{
  overflow-x: hidden;
}
.else{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
a{
  text-decoration: none;
  color: white;
}
</style>
