<template>
    <section class="weather-section" :class="searchContent === false ? weather.current.temp < 16 ? 'coldC' : weather.current.temp  < 28 ? 'normalC' : 'hotC' : weather_search.main.temp < 16 ? 'coldC' : weather_search.main.temp < 28 ? 'normalC' : 'hotC'">
        <div class="top-weather">
            <router-link to="/">
            <i class="material-icons back">
                arrow_back_ios
            </i>
            </router-link>
            <div class="top-information">
                <div class="city">
                    <i @click="backNormal" class="material-icons location">
                        location_on
                    </i>
                    <div v-show="!searchBar && !searchContent" class="city-name">
                        {{weather_current.name}}
                    </div>

                    <div v-if="!searchBar && searchContent" class="city-name">
                        {{weather_search.name}}, <span>{{weather_search.sys.country}}</span>
                    </div>

                    
                    <input v-model="place" @keypress="fetchWeather" class="inputFalse" :class="{'inputTrue' : searchBar}" type="text" placeholder="Search city....">
                    <span @click="searchClick" class="material-icons search">
                        search
                    </span>
                </div>
                <div class="date">
                    {{calendar}}
                </div>
            </div>
            <div class="calendar">
                <img src="../assets/calendar.png" alt="">
                <span>{{calendarDay()}}</span>
            </div>
        </div>

        <!--content normal-->
        <div class="weather-content"  v-show="!searchContent">
            <img class="weather-logo" src="../assets/normal.png" alt="">
            <h3 class="weather-status">{{weather.current.weather[0].main}}</h3>
            <h1 class="temp">{{Math.round(weather.current.temp)}}°</h1>
            <div class="more">
                <div class="more-detail">
                    <img src="../assets/air.png" alt="">
                    <span>{{weather.current.wind_speed}} km/h</span>
                </div>
                
                 <div class="more-detail">
                    <img src="../assets/water.png" alt="">
                    <span>{{weather.current.humidity}}</span>
                </div>
            </div>
        </div>

        <!--content search-->
        <div class="weather-content" v-if="searchContent">
            <img class="weather-logo" src="../assets/normal.png" alt="">
            <h3 class="weather-status">{{weather_search.weather[0].main}}</h3>
            <h1 class="temp">{{Math.round(weather_search.main.temp)}}°</h1>
            <div class="more">
                <div class="more-detail">
                    <img src="../assets/air.png" alt="">
                    <span>{{weather_search.wind.speed}} km/h</span>
                </div>
                
                 <div class="more-detail">
                    <img src="../assets/water.png" alt="">
                    <span>{{weather_search.main.humidity}}</span>
                </div>
            </div>
        </div>

        <div class="weather-history">
            <div v-for="dailyw in daily_weather" :key="dailyw" class="wrapper">
                <div class="weather-date">{{date.getDate() + dailyw}}, {{months[date.getMonth()]}}</div>
                <div class="glass">
                        <img src="../assets/rain.png" alt="">
                        <h1 class="temp">{{Math.round(weather.daily[dailyw].temp.day)}}°</h1>
                </div>
            </div>
        </div>
        <img class="bg" :src="searchContent === false ? weather.current.temp < 16 ? require('../assets/cold-det.png') : weather.current.temp  < 28 ? require('../assets/normal-det.png') : require('../assets/hot-det.png') : weather_search.main.temp < 16 ? require('../assets/cold-det.png') : weather_search.main.temp < 28 ? require('../assets/normal-det.png') : require('../assets/hot-det.png')" alt="">
    </section>
</template>

<script>
    export default {
        props: [
             'weather_url', 'calendar' ,'shalat_url', 'weather_api_key', 'coordinates'
        ],
        data(){
            return{
                date: new Date(),
                searchBar: false,
                searchContent: false,
                one_call: "https://api.openweathermap.org/data/2.5/onecall",
                place: "",
                weather: {},
                weather_current: {},
                waether_search: {},
                daily_weather: [0, 1, 2, 3, 4, 5 ,6],
                months: ["January", "February", "March", "April", "May", "June", "July", "Augustus", "September", "October", "November", "December"],
                bg: ["/img/cold-det.9f42e5db.png", "/img/normal-det.a5528089.png", "/img/hot-det.fa2ed89e.png"]
            }
        },
        methods: {
            
            backNormal(){
                this.searchBar = false
                this.searchContent = false
            },
            fetchWeather(e){
            if(e.key == "Enter"){
                fetch(`${this.weather_url}weather?q=${this.place}&units=metric&APPID=${this.weather_api_key}`)
                .then(response => response.json())
                .then(data => {
                    this.weather_search = data
                    this.searchBar = false
                    this.searchContent = true
                    this.place = ""
                })
            }
            },
            calendarDay(){
                let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                let day = days[this.date.getDay()]
                // let year = d.getFullYear()
                return `${day}`
            },
            searchClick(){ 
                this.searchBar = !this.searchBar
                console.log(this.searchBar)
            }
        },
        beforeMount(){
            fetch(`${this.one_call}?lat=${this.coordinates.lat}&units=metric&lon=${this.coordinates.lng}&cnt=1&appid=${this.weather_api_key}`)
            .then(response => response.json())
            .then(data => {
                this.weather = data
                console.log(fetch)
            })
        fetch(`${this.weather_url}weather?lat=${this.coordinates.lat}&units=metric&lon=${this.coordinates.lng}&=units=metric&APPID=${this.weather_api_key}`)
          .then(response => response.json())
          .then(data => {
            this.weather_current = data
        })
        }
    }
</script>

<style>
.weather-section{
    display: flex;background-color: #18AED1;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 3;
    min-height: 100vh;
}

.coldC{
    background-color: #18AED1;
}

.normalC{
    background-color: #23B9DD;
    }

.hotC{
    background-color: #FFA828;
}
.inputFalse{
    width: 0px;
    display: none;
}
.inputTrue{
    width: 150px;
    margin-left: 6px;
    height: 44px;
    display: block;
    outline: none;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
}
.top-weather{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    padding: 35px;
    color: white;
}
.top-weather .top-information{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.top-weather .city{
    display: flex;
    align-items: center;
}

.top-weather .city .location{
    font-size: 2em;
    cursor: pointer;
}

.city .city-name{
    font-weight: 600;
    font-size: 32px;
    white-space: nowrap;
    margin-left: 14px;
    text-align: center;
}
.city .search{
    color: rgba(255, 255, 255, 0.555);
    font-size: 2em;
    cursor: pointer;
    align-self: flex-end;
}
.top-weather .date{
    font-size: 20px;
    margin-top: 5px;
    font-weight: 300;
}
.back{
    font-size: 2em;
}
.calendar img{
    width: 30px;
    position: absolute;
    height: auto;
}
.calendar{
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
}
.calendar span{
    font-size: 0.7em;
    position: relative;
    top: 3px;
}
.bg{
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    /* transition: 0.3s; */
    z-index: 1;
}
.weather-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    color: white;
}
.weather-content .weather-logo{
    width: 120px;
    filter: brightness(100);
}
.weather-content .weather-status{
    font-size: 22px;
    margin-top: 25px;
    font-weight: 400;
}
.weather-content .temp{
    font-weight: 600;
    font-size: 80px;
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
}
.weather-content .more-detail{
    display: flex;
    align-items: center;
    gap: 12px;
}
.weather-content .more{
    margin-top: 0.5em;
    display: flex;
    gap: 2.1em;
}

.more-detail img{
    width: 16px;
    height: auto;
}
.weather-history{
    gap: 1.1em;
    overflow: scroll;
    position: relative;
    justify-self: flex-end;
    scrollbar-width: none;
    z-index: 2;
    bottom: 30px;
    display: flex;
    padding: 0 2em;
}
.weather-history .glass{
background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.105) 100%);
backdrop-filter: blur(18px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 15px;
backdrop-filter: blur(18px);
border: 1px rgba(255, 255, 255, 0.208) solid;
/* Note: backdrop-filter has minimal browser support */
display: flex;
flex-direction: column;
padding: 24px 30px;
align-items: center;
cursor: pointer;
gap: 28px;
border-radius: 15px;
}
.weather-history .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8em;
}
.wrapper .weather-date{
font-weight: 500;
font-size: 18px;
text-align: center;
color: #FFFFFF;
text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);

}
.weather-history .glass .temp{
    font-weight: 600;
    font-size: 30px;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
} 
.weather-history .glass img{
    width: 52px;
}
</style>