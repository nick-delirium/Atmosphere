<template>
  <div class="hello">
    <div style="width: 800px; height: 480px" id="mapContainer"></div>
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
      function moveToStP(map, coords){
        
        map.setCenter({lat: coords[0].loc.lt, lng: coords[0].loc.ln});
        map.setZoom(10);
      }
      //Step 1: initialize communication with the platform
      let platform = new H.service.Platform({
        app_id: 'j4o3XiGsSiUtrrUyy1jp',
        app_code: 'rXPXKkeiuAB4YtVt1zdeqg',
        useCIT: true,
        // useHTTPS: true
      });
      let defaultLayers = platform.createDefaultLayers();

      //Step 2: initialize a map  - not specificing a location will give a whole world view.
      let map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.normal.map);

      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      let mapEvents = new H.mapevents.MapEvents(map);
      let behavior = new H.mapevents.Behavior(mapEvents);

      // Create the default UI components
      let ui = H.ui.UI.createDefault(map, defaultLayers);

      // Now use the map as required...
      moveToStP(map, this.markers);

      //console.log(this);
      let coords = {}, marker = [], geomarker = [];
      for(let i = 1; i < this.markers.length; i++) {
        coords = {lat: this.markers[i].loc.lt, lng: this.markers[i].loc.ln},
        // data = {},
        marker[i] = new H.map.Marker(coords, {listeners: {
          tap: function (evt) {
            console.log("AAAAAAAAAAAAAAA")
          },
          pointerenter: function (evt) {
            console.log("HEHEHEHEHE");
            console.log(evt.target);
            var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
              content: "fufufuf" 
            })
          }
        }
        })
        
        
        
        // marker[i].addEventListener('dbltap', function (evt) {
        //     console.log("AAAAAAAAAAAAAAA");
        //     console.log(evt.target.b); //.target.getData());
        //     // map.setZoom(20);
        //     map.setCenter(evt.target.b);
        // })
        marker[i].addEventListener('tap', function (evt) {
            // window.setTimeout(300);
            console.log("HEHEHEHEHE");
            console.log(evt.target);
            marker[i].bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
            content: "fufufuf" 
            //evt.target.getData()
          });
          map.setZoom(16);
          map.setCenter(evt.target.b);
          ui.addBubble(marker[i].bubble);
          });
        
        
        
        geomarker[i] = new H.geo.Point(this.markers[i].loc.lt, this.markers[i].loc.ln);
        console.log(coords)
        map.addObject(marker[i]);
      }

      var linestring =  new H.geo.LineString();
      
     for (let i=1; i<geomarker.length; i++) {
       linestring.pushPoint(geomarker[i]);
     }

     console.log(linestring);
      var polygon = new H.map.Polygon(linestring, {
      style: {
        strokeColor: '#05A',
        fillColor: 'rgba(0, 240, 190, 0.4)',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'miter',
        miterLimit: 10,
        lineDash: [ ],
        lineDashOffset: 0
        }
      }
);
      map.addObject(polygon);
      //     style: {
      //       fillColor: '#FFFFCC',
      //       strokeColor: '#829',
      //       lineWidth: 8
      //     }

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
