// example of dataset
let pollution = [{"no2": "0,1", "no":"1,2", "so2": "1,1", "co": "0,5"}]

// calculate medium value from all aspects of pollution in percents in daily MPC
for(let i = 0; i < pollution.length; i++){
    polyStyle[i] = (parseFloat(pollution[i].no2.replace(/,/, '.'))*100+parseFloat(pollution[i].no.replace(/,/, '.'))*100+parseFloat(pollution[i].so2.replace(/,/, '.'))*100+parseFloat(pollution[i].co.replace(/,/, '.'))*100)/4
};

// create color for each element depends on % of MPC
var colorsPoly = polyStyle.map(item => item > 25 ? item > 50 ? item > 75 ? "rgba(255,0,0,0.6)":"rgba(255,125,0,0.6)":"rgba(255,255,0,0.6)":"rgba(0,255,0,0.6)");

var jsx = 'https://raw.githubusercontent.com/sylenien/megahack/master/src/assets/saint-petersburg.json'
// you need axios lib to make request
axios.get(jsx).then((response, jsx) => {
    jsx = response.data
    var reader = new H.data.geojson.Reader(jsx);
    let el = {"name":'', "coords": 0};


    let array = jsx.features.map(item => {
        return {"name": item.properties.Name, "coords": item.geometry.coordinates[0][0]}
    });

    var lineString;
    array.forEach((item, i, items) => {
    lineString = new H.geo.LineString()
    item.coords.forEach((item)=>{
        lineString.pushPoint(new H.geo.Point(item[1],item[0]));
    });
    let pol = new H.map.Polygon(lineString, {
        style: {
        fillColor: colorsPoly[i],
            strokeColor: '#829',
            lineWidth: 2
        },
        data: i
        });
        // this is the example of representing data to HTML from every polygon object we created
        pol.addEventListener('tap', function(evt) {
            let info = pollution[evt.target.getData()]
            document.getElementById('notLots').innerHTML = `
            <h4>${info.title}</h4>
            <ul class='text-left'>
              <p>Содержание вредных веществ, % от ПДК.</p>
              <li>CO: ${info.co > 1 ? info.co+"<span class='alert'> <i class='fas fa-exclamation'></i> Превышение ПДК</span>":info.co} </li> <br>
              <li>NO: ${info.no > 1 ? info.no+"<span class='alert'> <i class='fas fa-exclamation'></i> Превышение ПДК</span>":info.no}    </li> <br>
              <li>NO<i><sub>2</sub></i>: ${info.no2 > 1 ? info.no2+"<span class='alert'> <i class='fas fa-exclamation'></i> Превышение ПДК</span>":info.no2} </li> <br>
              <li>SO<i><sub>2</sub></i>: ${info.so2 > 1 ? info.so2+"<span class='alert'> <i class='fas fa-exclamation'></i> Превышение ПДК</span>":info.so2} </li> <br>
            </ul>
            `
            console.log(info);
          })
          map.addObject(pol);
        });