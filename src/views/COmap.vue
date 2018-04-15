<template>
  <div class="home">
    <h3 style='margin-top:20px;'>Карта экологической обстановки Санкт-Петербурга</h3>
    <hr class='Hr'>
    <COMap />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import COMap from '@/components/COMap.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'COmap',
  components: {
    COMap,
    Footer
  }
}
</script>
