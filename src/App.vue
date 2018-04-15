<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-inverse navbar-expand-sm sticky-top navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#" style='padding-top:0!important'>
          <img src="./assets/Logo.png" alt="Logo" style="width:150px">
        </a>
        <ul class="navbar-nav nav ml-auto">
          <li class="nav-item">
            <router-link class='nav-link' to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class='nav-link' to="/news">Новости</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
.active-link{
  color: #a4cdfa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg-dark{
  background: rgb(0,0,0);
  background: linear-gradient(107deg, rgba(0,0,0,1) 0%, rgba(52,58,64,1) 80%, rgba(74,76,78,1) 100%);
}

.sticky-top {
  top: 0.5em;
}
#nav a.router-link-exact-active {
  color: #26ca7f;
}
.row {
  margin: 0!important
}
.Hr{
    left: 50%;
    z-index: 1;
    width: 800px;
    height: 2px;
    content: " ";
    bottom: -5px;
    margin-left: -400px;
    text-align: center;
    position: relative;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(52,58,64,1), rgba(0, 0, 0, 0));
    margin-bottom: 20px;
    margin-top: 10px;
  }
</style>
