<template>
  <div class="home">
    <h3 style='margin-top:20px;'>Карта экологической обстановки Санкт-Петербурга</h3>
    <hr class='Hr'>
    <SO2Map />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import SO2Map from '@/components/SO2Map.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'SO2map',
  components: {
    SO2Map,
    Footer
  }
}
</script>
