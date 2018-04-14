(function(){
    /* ___________Описание работы модуля______________
        
        Добавить слой geojson на карту: 
            var layer = new Geojson(data); - data содержит geojson данные
            map.addObject(layer);
    */ 

    class Geojson{
        constructor(geojson){
            this._geojson = geojson;

            let data_type = this._geojson.features[0].geometry.type;

            switch(data_type){
                case "Point":
                    this.objectToAdd = this.createMarker(this._geojson);
                    break;
                case "Polygon":
                    this.objectToAdd = this.createPolygon(this._geojson);
                    break;
                case "LineString":
                    this.objectToAdd =  this.createPolyline(this._geojson);
                    break;
            };

            return this.objectToAdd
        }
        createMarker(data){
            this.markerGroup = new H.map.Group();
            
            data.features.forEach((feature) => {
                
                var coords = feature.geometry.coordinates,
                    point = new H.geo.Point(coords[1], coords[0]),
                    marker = new H.map.Marker(point);
                
                this.markerGroup.addObject(marker);
            });

            return this.markerGroup
        }
        createPolyline(data){
            this.polylineGroup = new H.map.Group();
            
            data.features.forEach((feature) => {
                
                var linestring = new H.geo.LineString();
                
                feature.geometry.coordinates.forEach((coords) =>{
                    linestring.pushLatLngAlt(coords[1], coords[0])
                });

                var polyline = new H.map.Polyline(linestring);

                this.polylineGroup.addObject(polyline);
            });

            return this.polylineGroup
        }
        createPolygon(data){
            
            this.polygonGroup = new H.map.Group();

            data.forEach((feature) => {
                
                var linestring = new H.geo.LineString();
                
                feature.geometry.coordinates[0].forEach((coords) =>{
                    linestring.pushLatLngAlt(coords[1], coords[0])
                });

                var polygon = new H.map.Polygon(linestring);

                this.polygonGroup.addObject(polygon);
            });

            return this.polygonGroup
        }
    };
    Object.assign(window, {Geojson})
}())

