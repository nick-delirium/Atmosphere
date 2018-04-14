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
  data() {
    return{
      "markers": {}
    }
  },
  mounted() {
    axios.get('http://localhost:8085/api/markers')
    .then(response => {
      this.markers = response.data.data;
      function moveMapToBerlin(map, coords){
        map.setCenter({lat: coords[0].loc.lt, lng: coords[0].loc.ln});
        map.setZoom(10);
      }


      //Step 1: initialize communication with the platform
      var platform = new H.service.Platform({
        app_id: 'j4o3XiGsSiUtrrUyy1jp',
        app_code: 'rXPXKkeiuAB4YtVt1zdeqg',
        useCIT: true,
        // useHTTPS: true
      });
      var defaultLayers = platform.createDefaultLayers();

      //Step 2: initialize a map  - not specificing a location will give a whole world view.
      var map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.normal.map);

      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      var mapEvents = new H.mapevents.MapEvents(map);
      var behavior = new H.mapevents.Behavior(mapEvents);

      // Create the default UI components
      var ui = H.ui.UI.createDefault(map, defaultLayers);

      // Now use the map as required...
      moveMapToBerlin(map, this.markers.loc);

      //console.log(this);
      let coords = {}, marker = [0];
      for(let i = 1; i < this.markers.length; i++) {
        coords = {lat: this.markers[i].loc.lt, lng: this.markers[i].loc.ln},
        marker[i] = new H.map.Marker(coords);
        console.log(coords)
        map.addObject(marker[i]);
      }
      console.log(marker)
    })
    .catch(error => console.log(error))
    
      
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
