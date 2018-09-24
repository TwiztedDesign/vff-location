import * as L from 'leaflet';

const geoHelpers = {
    getBound: function(points){
        let pointsArr = points.split(',');
        let metadata1 = L.latLng(pointsArr[1], pointsArr[0]);
        let metadata2 = L.latLng(pointsArr[3], pointsArr[2]);
        return L.latLngBounds(metadata1, metadata2);
    },

    intersects: function(area1, area2){
        let area1Bounds = geoHelpers.getBound(area1);
        let area2Bounds = geoHelpers.getBound(area2);

        return area1Bounds.intersects(area2Bounds);
    },

    contains: function(coords, area) {
        let areaBounds = geoHelpers.getBound(area);
        let location = L.latLng(coords.latitude, coords.longitude,coords.altitude);
        return areaBounds.contains(location);
    }
};

module.exports = geoHelpers;