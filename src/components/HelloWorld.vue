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
      app_id: 'j4o3XiGsSiUtrrUyy1jp',
      app_code: 'rXPXKkeiuAB4YtVt1zdeqg',
      useCIT: true,
      
      });
      
    function moveMapToBerlin(map){
  map.setCenter({lat:52.5159, lng:13.3777});
  map.setZoom(14);
}





/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform

var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map  - not specificing a location will give a whole world view.
var map = new H.Map(document.getElementById('mapContainer'),
  defaultLayers.normal.map);

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
moveMapToBerlin(map);
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
