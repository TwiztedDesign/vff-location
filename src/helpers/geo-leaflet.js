import * as L from 'leaflet';

var geoHelpers = {
    getBound: function(points){
        let pointsArr = points.split(',');
        let metadata1 = L.latLng(pointsArr[1], pointsArr[0]);
        let metadata2 = L.latLng(pointsArr[3], pointsArr[2]);
        return L.latLngBounds(metadata1, metadata2);
    }
};

module.exports = geoHelpers;