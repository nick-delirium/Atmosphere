<template>
  <div class="home">
    <h3 style='margin-top:20px;'>Карта загрязнений Санкт-Петербурга</h3>
    <hr class='Hr'>
    <NOMap />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NOMap from '@/components/NOMap.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'NOmap',
  components: {
    NOMap,
    Footer
  }
}
</script>
