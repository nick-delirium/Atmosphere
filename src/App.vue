<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-inverse navbar-expand-sm sticky-top navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#">
          <img src="https://www.here.com/sites/all/themes/herecorporate/build/img/here-logo.svg" alt="Logo" style="width:50px;border-radius:5px">
        </a>
        <ul class="navbar-nav nav ml-auto">
          <li class="nav-item">
            <router-link class='nav-link' to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class='nav-link' to="/about">News</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
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
  }
</style>
