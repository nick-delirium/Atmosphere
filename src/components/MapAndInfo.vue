<template>
  <div class="hello" style='margin: 0 20px'>
    <div class='row'>
      <div class='col-md-8' style='background-color:grey; padding:0!important'>
        <div style=" height: 600px; border: 1px solid rgba(52,58,64,1)" id="mapContainer"></div>
        </div>
      <div class='col-md-4'>
        <div class='bubble b-top'>
          <h4>Средние значения по ЛО</h4>
          <ul class='text-left'>
            <li>CO ПДК {{median.co.toFixed(3)}} <span v-if="median.no>1" class='alert'> <i class="fas fa-exclamation"></i> Превышение ПДК</span></li> <br>
            <li>NO ПДК {{median.no.toFixed(3)}} <span v-if="median.no>1" class='alert'> <i class="fas fa-exclamation"></i> Превышение ПДК</span></li> <br>
            <li>NO<i><sub>2</sub></i> ПДК {{median.no2.toFixed(3)}} <span v-if="median.no2>1" class='alert'> <i class="fas fa-exclamation"></i> Превышение ПДК</span></li> <br>
            <li>SO<i><sub>2</sub></i> ПДК {{median.so2.toFixed(3)}} <span v-if="median.no>1" class='alert'> <i class="fas fa-exclamation"></i> Превышение ПДК</span></li> <br>
          </ul>
        </div>
        <div class="bubble b-bottom">
          <h4>Данные о районе</h4> 
          <p>Не очень много текста</p></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as jsn from '../assets/saint-petersburg.json';
export default {
  name: 'MapAndInfo',
  data() {
    return{
      "markers": {},
      "toxics": {},
      "median": {"co":0, "no":0, "no2":0, "so2":0}
    }
  },

mounted() {
    axios.get('http://localhost:8085/api/toxic')
    .then(response => {
      this.toxics = response.data;
      var query = response.data;
      var obj = {"co":0, "no": 0, "no2": 0, "so2":0};
      query.forEach((item, i, items) => {
        item.co = item.co.replace(/,/g, '.');
        item.no = item.no.replace(/,/g, '.');
        item.no2 = item.no2.replace(/,/g, '.');
        item.so2 = item.so2.replace(/,/g, '.');
        obj.co += Number(item.co);
        obj.no += Number(item.no);
        obj.no2 += Number(item.no2);
        obj.so2 += Number(item.so2);
        return obj;
      });
      this.median.co = obj.co/query.length;
      this.median.no = obj.no/query.length;
      this.median.no2 = obj.no2/query.length;
      this.median.so2 = obj.so2/query.length;
      
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
        // var panorama = ui.getControl('panorama');
        const button = new Button();
        button.setAlignment('top-left');
        ui.addControl('button',button)
        
        mapSettings.setAlignment('top-right');
        zoom.setAlignment('middle-right');
        scalebar.setAlignment('top-right');	
        // panorama.setAlignment('top-left');

        //style
        var no2 = {
          strokeColor: 'rgba(0, 229, 255, 0.1)',
          fillColor: 'rgba(244,67,54, 0.6)'
        };

        var no = {
          strokeColor: 'rgba(0, 229, 255, 0.1)',
          fillColor: 'rgba(156,39,176, 0.6)'
        };

        var so2 = {
          strokeColor: 'rgba(0, 229, 255, 0.1)',
          fillColor: 'rgba(33,150,243, 0.6)'
        };

        var co = {
          strokeColor: 'rgba(0, 229, 255, 0.1)',
          fillColor: 'rgba(205,220,57, 0.6)'
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
          
          let pollution = query;
          let PolyStyle = [];
          let koef = 1500; // circle radius multiplier
          for(let i = 0; i < pollution.length; i++){
            PolyStyle[i] = {
              no2: parseFloat(pollution[i].no2.replace(/,/, '.')) > 0.5 ? parseFloat(pollution[i].no2.replace(/,/, '.')) > 1 ? "red" : "yellow" : "green",
              no: parseFloat(pollution[i].no.replace(/,/, '.')) > 0.5 ? parseFloat(pollution[i].no.replace(/,/, '.')) > 1 ? "red" : "yellow" : "green",
              so2: parseFloat(pollution[i].so2.replace(/,/, '.')) > 0.5 ? parseFloat(pollution[i].so2.replace(/,/, '.')) > 1 ? "red" : "yellow" : "green",
              co: parseFloat(pollution[i].co.replace(/,/, '.')) > 0.5 ? parseFloat(pollution[i].co.replace(/,/, '.')) > 1 ? "red" : "yellow" : "green"
            }
            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseFloat(pollution[i].no2.replace(/,/, '.'))*koef, {style: no2});

            no2Group.addObject(circle);

            
            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseFloat(pollution[i].no.replace(/,/, '.'))*koef, {style: no});

            noGroup.addObject(circle);

            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseFloat(pollution[i].so2.replace(/,/, '.'))*koef, {style: so2});

            so2Group.addObject(circle);

            var circle = new H.map.Circle({lat: pollution[i].location.lt, lng: pollution[i].location.ln}, parseFloat(pollution[i].co.replace(/,/, '.'))*koef, {style: co});

            coGroup.addObject(circle);
            
          };
          // console.log(jsn)
          // debugger;
          var reader = new H.data.geojson.Reader('https://raw.githubusercontent.com/sylenien/megahack/master/src/assets/saint-petersburg.json', {
            style: {fillColor:'#191919'}});
          // let layer = new Geojson(jsn);
          // map.addObject(layer)

          reader.parse();
          // Assumption: map already exists
          map.addLayer(reader.getLayer());

          // 'saint-petersburg.json'

       // }, urlPollution);
  }
)}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.H_overlay{
  padding-left: 0px;
  padding-right: 0px;
  text-transform: lowercase;
}
.H_overlay div{
  text-transform: capitalize;
}

.H_rdo_buttons .H_active, .H_rdo li.H_active {
    background: #4A5B65;
    border-radius: 0em;
}
.bubble{
  padding: 15px 15px 15px;
  border-radius: 15px;
  border: 1px solid #4A5B65;
  background-color: #f7f7f7;
  margin-bottom: 30px;
  transition: all .2s ease-in-out;
  box-shadow: 0 0 20px rgba(0,0,0,.4);
}
@media (max-width: 900px){
  .b-top{
    margin-top: 30px;
  }
}
.bubble:hover{
  background-color: #f0f0f0;
  box-shadow: 0 0 20px rgba(0,0,0,.6);
}
.alert{
  color: red
}
</style>
