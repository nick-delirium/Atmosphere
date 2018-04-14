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
<<<<<<< HEAD
      
    })
    .catch(error => console.log(error))
    
      function moveMapToBerlin(map, coords){
        console.log(coords)
        map.setCenter({lat: coords.loc.lt, lng: coords.loc.ln});
=======
      function moveMapToBerlin(map, coords){
        map.setCenter({lat: coords[0].loc.lt, lng: coords[0].loc.ln});
>>>>>>> c56ab503c5da4ba23e611640a089fe292e638d1d
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
      let coords = {lat: this.markers[1].loc.lt, lng: this.markers[1].loc.ln},
      marker = new H.map.Marker(coords);
      console.log(coords)
      map.addObject(marker);
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
