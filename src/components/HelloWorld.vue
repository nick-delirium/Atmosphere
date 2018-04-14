<template>
  <div class="hello">
    <div class='row'>
      <div class='col-md-8' style='background-color:grey;'>
        <div style="width: 800px; height: 600px" id="mapContainer"></div>
        </div>
      <div class='col-md-4'>
        <div class='bubble'>x</div>
        <div class="bubble">x</div>
      </div>
      
    </div>
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
      "markers": {},
      "toxics": {}
    }
  },
  mounted() {
    axios.get('http://localhost:8085/api/toxic')
    .then(response => {
      // this.toxics = response.data;
      query = response.data;      
      console.log(this.toxics);
      
    
    
    (function () {
      'use strict';

      // Initialize communication with the platform, to access your own data, change the values below
      // https://developer.here.com/documentation/geovisualization/topics/getting-credentials.html

      // We recommend you use the CIT environment. Find more details on our platforms below
      // https://developer.here.com/documentation/map-tile/common/request-cit-environment-rest.html

      const platform = new H.service.Platform({
        app_id: 'j4o3XiGsSiUtrrUyy1jp',
        app_code: 'rXPXKkeiuAB4YtVt1zdeqg',
        useCIT: true,
          // useHTTPS: true
      });

      // Initialize a map
      const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
      const defaultLayers = platform.createDefaultLayers({tileSize: 256 * pixelRatio});
      const map = new H.Map(
          document.getElementsByClassName('mapContainer')[0],
          defaultLayers.normal.basenight,
          {pixelRatio}
      );
      window.addEventListener('resize', function() {
          map.getViewPort().resize();
      });

      // Make the map interactive
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      let ui = H.ui.UI.createDefault(map, defaultLayers);
      ui.removeControl('mapsettings');

      // Instantiate data lens service
      var service = platform.configure(new H.datalens.Service());

      // Get query stats
      service.fetchQueryStats(query.id, {
          stats: [
              {
                  column_stats: {
                      count_sum: ['$min', '$max', '$average'],
                      lat_avg: ['$min', '$max'],
                      lon_avg: ['$min', '$max']
                  },
                  dynamic: {
                      x: '$drop',
                      y: '$drop',
                      z: 15
                  }
              }
          ]
      }).then(({stats}) => {

          const columnStats = stats[0].column_stats;

          // Set map bounds
          map.setViewBounds(new H.geo.Rect(
              columnStats.lat_avg.$max,
              columnStats.lon_avg.$min,
              columnStats.lat_avg.$min,
              columnStats.lon_avg.$max
          ), false);

          const colorScale = d3.scaleLinear().range([
              'rgba(30, 68, 165, 0.03)',
              'rgba(87, 164, 217, 0.8)',
              'rgba(202, 248, 191, 0.8)'
          ]).domain([0,.5,1]);

          //init controls
          const bandwidthCtl = new Slider(10);

          let bandwidth = [{
                  value: 0.5,
                  zoom: 4
              },
              {
                  value: 4,
                  zoom: 17
              }
          ];

          const provider = new H.datalens.QueryTileProvider(
              service, {
                  queryId: query.id,
                  tileParamNames: {
                      x: 'x',
                      y: 'y',
                      z: 'z'
                  }
              }
          );

          const layer = new H.datalens.HeatmapLayer(
              provider, {
                  rowToTilePoint: function(row) {
                      return {
                          x: row.tx,
                          y: row.ty,
                          value: row.count_sum,
                          count: 1
                      };
                  },
                  bandwidth: bandwidth,
                  valueRange: {
                      value: columnStats.count_sum.$average,
                      zoom: 4
                  },
                  colorScale
              }
          );

          map.addLayer(layer);

          //init legend panel
          const panel = new Panel('Density map');
          const bandwidthLabel = new Label();
          const colorLegend = new ColorLegend(colorScale);
          ui.addControl('panel', panel);
          panel.addChild(bandwidthLabel);
          panel.addChild(bandwidthCtl);
          panel.addChild(colorLegend);

          //connect ui with layer
          function updatePanel() {
              let bandwidthCoeff = bandwidthCtl.getValue() >=1 ? bandwidthCtl.getValue()/10: 1;
              bandwidth[0].value = bandwidthCoeff * 0.5;
              bandwidth[1].value = bandwidthCoeff * 4;
              bandwidthLabel.setHTML(`bandwidth: ${bandwidthCoeff}px`);
          }
          updatePanel();
          layer.addEventListener('update', updatePanel);
          panel.addEventListener('change', () => layer.redraw());

      });

      }());
    
    
    
    
    
    
    
    });

/*
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
    
      */
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
