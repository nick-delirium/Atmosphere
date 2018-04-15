<template>
  <div class="home">
    <h3 style='margin-top:20px;'>Карта загрязнений Санкт-Петербурга</h3>
    <hr class='Hr'>
    <MapCont />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import MapCont from '@/components/MapAndInfo.vue'
import Footer from '@/components/footer.vue'
export default {
  name: 'home',
  components: {
    MapCont,
    Footer
  }
}
</script>
