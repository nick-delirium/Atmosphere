<template>
  <div class="hello">
    <div style="width: 640px; height: 480px" id="mapContainer"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    axios.get('http://localhost:8085/api/')
    .then(response => console.log(response))
    .catch(error => console.log(error))
    var platform = new H.service.Platform({
      'app_id': 'j4o3XiGsSiUtrrUyy1jp',
      'app_code': 'rXPXKkeiuAB4YtVt1zdeqg'
      });
    
      // Obtain the default map types from the platform object
      var maptypes = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.normal.map,
      {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
