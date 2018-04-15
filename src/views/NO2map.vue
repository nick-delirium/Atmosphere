<template>
  <div class="home">
    <h3 style='margin-top:20px;'>Карта загрязнений Санкт-Петербурга</h3>
    <hr class='Hr'>
    <NO2Map />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NO2Map from '@/components/NO2Map.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'NO2map',
  components: {
    NO2Map,
    Footer
  }
}
</script>
