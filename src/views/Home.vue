<template>
  <div class="home">
    <h3 style='margin-top:20px;'>St.Petersburg's polution map</h3>
    <hr class='Hr'>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
