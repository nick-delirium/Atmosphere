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
      this.toxics = response.data;
      var query = response.data;      
      console.log(query);
      // console.log(this.toxics);
      //console.log(this.toxics);
      (function () {
        'use strict';
        var platform = new H.service.Platform({
          'app_id': 'xxkQMf84Rb3cKA0fF8Du',
          'app_code': '3oHkXZJOAtM3jtOvDuGd0g' 
        });
        //var for layers
        var defaultLayers = platform.createDefaultLayers({lg: 'rus'});

        //greated map
        var map = new H.Map(
          document.getElementById('mapContainer'),
          defaultLayers.normal.map,
          {
            zoom: 10,
            center: { lat: 59.939095, lng: 30.315868},
          }
        );

        //add standard event map
        var mapEvents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapEvents);

        //map UI
        var ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');
        var mapSettings = ui.getControl('mapsettings');
        var zoom = ui.getControl('zoom');
        var scalebar = ui.getControl('scalebar');
          
        mapSettings.setAlignment('top-right');
        zoom.setAlignment('middle-right');
        scalebar.setAlignment('top-right');	

        //parse Json
        function getData(ready, url){
          var request = new XMLHttpRequest();
          request.open('GET', url, true);
          request.onreadystatechange = function(){
            if(this.readyState == 4 && this.status !=404) {
              ready(this.responseText);
            }
          }
          request.send();
        };

        //style
        var no2 = {
          strokeColor: 'rgba(0, 229, 255, 0)',
          fillColor: 'rgba(244,67,54, 0.6)'
        };

        var no = {
          strokeColor: 'rgba(0, 229, 255, 0)',
          fillColor: 'rgba(156,39,176, 0.6)'
        };

        var so2 = {
          strokeColor: 'rgba(0, 229, 255, 0)',
          fillColor: 'rgba(33,150,243, 0.6)'
        };

        var co = {
          strokeColor: 'rgba(0, 229, 255, 0)',
          fillColor: 'rgba(205,220,57)'
        };

        //utl to JSON
        var urlPollution = 'json/pollution.json';

        //group circle to visualisation
        var no2Group = new H.map.Group();
        map.addObject(no2Group);

        var noGroup = new H.map.Group();
        map.addObject(noGroup);

        var so2Group = new H.map.Group();
        map.addObject(so2Group);

        var coGroup = new H.map.Group();
        map.addObject(coGroup);
        //get json and add circle on croup
        //console.log("aaaaaaaaaa", JSON.parse(query, ''));
        //getData(function(query){
          pollution = JSON.parse(query, '');
          console.log(pollution);
          for(i = 0; i < pollution.length; i++){
            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseInt(pollution[i].no2)*1000, {style: no2});

            no2Group.addObject(circle);

            console.log(pollution);
            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseInt(pollution[i].no)*1000, {style: no});

            noGroup.addObject(circle);

            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseInt(pollution[i].so2)*1000, {style: so2});

            so2Group.addObject(circle);

            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseInt(pollution[i].co)*1000, {style: co});

            coGroup.addObject(circle);
            
          };

       // }, urlPollution);
      })
      ()
  }
)}
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
