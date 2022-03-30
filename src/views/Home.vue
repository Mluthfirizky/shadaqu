<template>
  <div class="home">
    <div class="top-content">
      <div class="top-button square" @click="locationButton">
        <i class="material-icons">location_on</i>
      </div>
      <div class="top-date">
        <h1 class="masehi">{{calendar}}</h1>
        <h3 class="hijriyah">13 Ramadhan 1442 H</h3>
      </div>
      <div class="top-button">
        <i class="material-icons">
          explore
        </i>
      </div>
    </div>
    <router-link to="/weather">
    <section class="weather" :class="weather.main.temp < 16 ? 'cold' : weather.main.temp < 28 ? 'normal' : 'hot'">
      <div class="weather-content">
        <div class="weather-status">
          <i class="material-icons">
            light_mode
          </i>
          <div class="temp">
            <h1 class="celc">{{weather.main.temp}}°</h1>
            <h3>{{weather.weather[0].main}}</h3>
          </div>
        </div>

        <div class="time">
          {{time}} 
        </div>

        <div class="location">
          <i class="material-icons">location_on</i>
          <div class="city">{{weather.name}} , {{weather.sys.country}}</div>
        </div>
      </div>
    </section>
  </router-link>
    <section class="prayer">

      <div class="prayer-schedule">
        <div class="prayer-name">Imsak</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Imsak}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>

      <div class="prayer-schedule">
        <div class="prayer-name">Shubuh</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Fajr}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>

      <div class="prayer-schedule">
        <div class="prayer-name">Dzuhur</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Dhuhr}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>

      <div class="prayer-schedule">
        <div class="prayer-name">Ashar</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Asr}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>

      <div class="prayer-schedule">
        <div class="prayer-name">Maghrib</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Maghrib}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>

      <div class="prayer-schedule">
        <div class="prayer-name">Isya</div>
        <div class="prayer-time">{{shalat.results.datetime[0].times.Isha}} <span>PM</span></div>
        <span class="material-icons prayer-alarm">
          notifications
        </span>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  props: [
    'calendar', 'weather_url', 'shalat_url', 'weather_api_key', 'coordinates'
  ],
  data(){
    return{
      time: null,
      prays: ["Shubuh", "Dhuha", "Dzuhur", "Ashar", "Maghrib", "Isya"],
      place: "",
      weather: {},
      shalat: {}
    }
  },
    components: {

  },
  methods:{
    fetchWeather(e){
      if(e.key == "Enter"){
        fetch(`${this.weather_url}weather?q=${this.place}&units=metric&APPID=${this.weather_api_key}`)
          .then(response => response.json())
          .then(data => {
            this.weather = data
          })
      }
    },
    clock(){
      // let d = new Date()

      // let hour = d.getHours()
      // let minute = d.getMinutes()
      // let mill = d.getMilliseconds()

      // return `${hour} : ${minute} : ${mill}`
      let minute = new Date().getHours()
      let second = new Date().getMinutes()

      if(second < 10 && minute > 10){
        this.time = `${minute} : 0${second}`
      }if(second > 10 && minute < 10){
        this.time = `0${minute} : ${second}`
      }if(second < 10 && minute < 10){
        this.time = `0${minute} : 0${second}`
      }if(second > 10 && minute > 10){
        this.time = `${minute} : ${second}`
      }
    },
    locationButton(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
          },
          error => {
            console.log(error.message)
          }
        )
      }else{
        console.log("notsupported")
      }
    }
  },
  beforeMount(){
    fetch(`${this.weather_url}weather?lat=${this.coordinates.lat}&units=metric&lon=${this.coordinates.lng}&=units=metric&APPID=${this.weather_api_key}`)
          .then(response => response.json())
          .then(data => {
            this.weather = data
        })
    fetch(`${this.shalat_url}?longitude=${this.coordinates.lng}&latitude=${this.coordinates.lat}&date=2022-02-05`)
          .then(response => response.json())
          .then(data => {
            console.log(this.coordinates.lat)
            this.shalat = data
          })
      },
  mounted(){
    setInterval(() => {
      this.clock()
    },0)
  }
}
</script>

<style>
  .home{
    background-color: #FAFDFF;
    min-height: 100vh;
    padding: 42px 37px;
  }
  .top-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }
  .top-content .masehi{
    font-size: 1.25em;
    margin-bottom: 6px;
    font-weight: 600;
    cursor: default;
  }
  .top-content .hijriyah{
    color: #848484;
    font-size: 0.7em;
    font-weight: 500;
    cursor: default;
  }
  .top-button{
    background: #E5FAFF;
    cursor: pointer;
    display: flex;
    border-radius: 100%;
    padding: 10px;
  }
  .top-button i{
    font-size: 1.4em;
  }
  .square{
    border-radius: 6px;
  }
  .weather{
    cursor: pointer;
    margin-top: 23px;
    border-radius: 15px;
    background-size:cover;
    color: white;
    background-repeat: no-repeat;
    transition: 0.5s;
  }
  .normal{
    background-image: url('../assets/cloudy.jpg');
  }
  .cold{
     background-image: url('../assets/cold.jpg');
  }
  .hot{
     background-image: url('../assets/hot.jpg');
  }
  .weather .weather-content{
    display: flex;
    align-items: center;
    padding: 0px 0 25px 0;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
  }
  .weather-content .weather-status{
    display: flex;
    align-items: center;
  }
  .weather-status .temp{
    margin-left: 13px;
  }
  .temp .celc{
    font-size: 26px;
    font-weight: 500;
  }
  .weather-status i{
    font-size: 3em;
  }
  .weather-status h3{
    font-size: 18px;
    font-weight: 500;
  }
  .weather-content .location{
    margin-top: 0.3em;
    display: flex;
    align-items: center;
  }
  .location .city{
    margin-left: 11px;
    font-size: 1.2em;
    font-weight: 300;
  }
  .weather-content .time{
    font-size: 2em;
    letter-spacing: -1px;
    font-weight: 700;
  }
  .search{
    width: 100%;
    padding: 3px 6px;
  }
  .prayer{
    margin: 1.5em 0 3em 0;
    gap: 1.2em;
    display: flex;
    flex-direction: column;
  }
  .prayer-schedule{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1em 0;
    background: #E5FAFF;
    
    text-align: center;
    border-radius: 12px;
  }
  .prayer-schedule .prayer-name, .prayer-time{
    font-weight: 700;
    font-size: 1.1em;
    cursor: default;
  }
  .prayer-schedule .prayer-name{
    font-weight: 500;
  }
  .prayer-name{
    flex: 1;
  }
  .prayer-time{
    flex: 2;
  }
  .prayer-time span{
    font-size: 0.65em;
    font-weight: 500;
  }
  .prayer-alarm{
    flex: 1;
    cursor: pointer;
  }
</style>
