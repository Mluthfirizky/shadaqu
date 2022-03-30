<template>
  <div class="nav-bar">
    <router-link to="/dzikir">
    <div>
    <img @click="dzikirF" class="dzikir" src="../assets/nav1.png" alt="">
    </div>
    </router-link>
    <router-link to="/">
    <div class="active">
      <img @click="shalatF" class="shalat " src="../assets/nav2.png" alt="">
    </div>
    </router-link>
    <router-link to="/alquran">
    <div>
    <img @click="alquranF" class="quran" src="../assets/nav3.png" alt="">
    </div>
    </router-link>
    <div class="dot" :class="$route.name == 'Home' ? 'center' : $route.name == 'Dzikir' ? 'left' : $route.name == 'Alquran' ? 'right' : ''"></div>

    
    
  </div>
</template>

<script>
export default {
  name: 'navBar',

  data(){
    return{
      left: '50%'
    }
  },
  computed: {
    dots: function () {
      return this.left;
    }
  },
  methods: {
    shalatF(){
      this.left='50%';
    },
    dzikirF(){
      this.left='65px'
    },
    alquranF(){
      this.left='85%'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-bar{
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 15px 52px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    background: #23B9DD;
    border-radius: 20px 20px 0 0;
  }
  .nav-bar .shalat{
    width: 1.7em;
    height: 1.7em;
  }
  .nav-bar img{
    width: 2em;
    height: auto;
    cursor: pointer;
    transition: 0.3s;
  }
  .nav-bar div{
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .dot{
    content: "";
    background-color: white;
    display: block;
    width: 5px;
    transition: 0.3s;
    height: 5px;
    border-radius: 100%;
    position: absolute;
    bottom: 11%;
  }
  .right{
    left: 85%;
  }
  .center{
    left: 50%;
    transform: translate(-50%, 0);
  }
  .left{
    left: 65px;
  }
  img:hover{
    filter: drop-shadow(0px 5px 3px #0000003b);
  }
</style>
