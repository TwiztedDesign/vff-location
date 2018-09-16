var results = document.querySelector('#results');
var mymap;

function initMap(){
    mymap = L.map('mapid',{drawControl: true}).setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");

    L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap).bindPopup("I am a polygon.");

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);

    L.Map.include({
        'clearLayers': function () {
            mymap.eachLayer(function (layer) {
                if(!layer._url) {
                    mymap.removeLayer(layer);
                }
            });
        }
    });
}

function myLocationExamples() {
    let mineCallback = document.createElement("div");
    vff.location.mine((err, coords) => {
        mineCallback.innerText = `Dear VFF, callback... ${coords.latitude} and ${coords.longitude}`;
    });
    results.appendChild(mineCallback);

    let minePromise = document.createElement("div");
    vff.location.mine().then(function (coords) {
        minePromise.innerText += `Dear VFF, promise... ${coords.latitude} and ${coords.longitude}`;
    });
    results.appendChild(minePromise);

    let high = document.createElement("div");
    vff.location.mine().then(function (coords) {
        high.innerText += `Dear VFF, promise with settings... ${coords.latitude} and ${coords.longitude}`;
    }, {enableHighAccuracy: true});
    results.appendChild(high);
}

function clearAll() {
    results.innerHTML = '';
    mymap.clearLayers();
}

//My location example
var myLocationBtn = document.getElementById('myLocationBtn');
myLocationBtn.onclick = function() {
    clearAll();
    vff.location.mine().then(function(coords){
        myLocationExamples();
        mymap.setView([coords.latitude, coords.longitude], 12,{"animate":true});
        myLocation = L.marker([coords.latitude, coords.longitude]).addTo(mymap)
            .bindPopup("<b>My Location</b>").openPopup();
    });
};

//Bounds
var boundsBtn = document.getElementById('boundsBtn');
boundsBtn.onclick = function() {
    clearAll();
    vff.location.mine().then(function(coords){
        let constValue = 0.005;
        mymap.setView([coords.latitude, coords.longitude], 12,{"animate":true});

        //bounds 1
        // define rectangle geographical bounds
        var bounds1 = [[coords.latitude - constValue, coords.longitude + constValue], [coords.latitude + constValue, coords.longitude - constValue]];
        // create an orange rectangle
        L.rectangle(bounds1, {color: "#ff7800", weight: 1}).addTo(mymap);
        // zoom the map to the rectangle bounds
        mymap.fitBounds(bounds1);

        let constValue2 = 0.01;
        //bounds 2
        var bounds2 = [[coords.latitude + constValue2, coords.longitude + constValue2], [coords.latitude, coords.longitude]];
        // create an blue rectangle
        L.rectangle(bounds2, {color: "#9b87ff", weight: 1}).addTo(mymap);
        // zoom the map to the rectangle bounds
        mymap.fitBounds(bounds2);

        let data = {
            metadata:{
                targetGeo:`${coords.latitude + constValue2},${coords.longitude + constValue2},${coords.latitude},${coords.longitude}`
            }
        };

        vff._queryParams = {
            _targetgeo:`${coords.latitude - constValue},${coords.longitude + constValue},${coords.latitude + constValue},${coords.longitude- constValue}`
        };
        let result = vff.location.intersects(data);
        console.log(result);
    });
};

//contains
var containsBtn = document.getElementById('containsBtn');
containsBtn.onclick = function() {
    clearAll();
    vff.location.mine().then(function(coords){
        let constValue = 0.005;
        mymap.setView([coords.latitude, coords.longitude], 12,{"animate":true});

        //bounds 1
        // define rectangle geographical bounds
        var bounds1 = [[coords.latitude - constValue, coords.longitude + constValue], [coords.latitude + constValue, coords.longitude - constValue]];
        // create an orange rectangle
        L.rectangle(bounds1, {color: "#ff7800", weight: 1}).addTo(mymap);
        // zoom the map to the rectangle bounds
        mymap.fitBounds(bounds1);

        let constValue2 = 0.01;
        //bounds 2
        var bounds2 = [[coords.latitude + constValue2, coords.longitude + constValue2], [coords.latitude, coords.longitude]];
        // create an blue rectangle
        L.rectangle(bounds2, {color: "#9b87ff", weight: 1}).addTo(mymap);
        // zoom the map to the rectangle bounds
        mymap.fitBounds(bounds2);

        let data = {
            metadata:{
                targetGeo:`${coords.latitude + constValue2},${coords.longitude + constValue2},${coords.latitude},${coords.longitude}`
            }
        };

        vff._queryParams = {
            _targetgeo:`${coords.latitude - constValue},${coords.longitude + constValue},${coords.latitude + constValue},${coords.longitude- constValue}`
        };
        let result = vff.location.intersects(data);
        console.log(result);
    });
};

// boundsBtn.click();
initMap();