import * as L from 'leaflet';

var vffLocationApi = {

    getBound: function(points){
        let pointsArr = points.split(',');
        let metadata1 = L.latLng(pointsArr[1], pointsArr[0]);
        let metadata2 = L.latLng(pointsArr[3], pointsArr[2]);
        return L.latLngBounds(metadata1, metadata2);
    },

    // Working with W3C Geolocation API
    mine: function(callback, options) {
        const func = this ? this.mine : this;
        if (callback === undefined) {
            return new Promise(function (resolve, reject) {
                func(function (err, result) {
                    err ? reject(err) : resolve(result);
                }, options);
            });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position, error) {
                callback(error, position.coords);
            }, options);
        }
    },

    // Is data.metadata.targetGeo intersect with vff.getQueryParams()._targetgeo
    intersects: function(data) {
        let isIntersects = false;
        if ((data.metadata && data.metadata.targetGeo) &&
            (window.vff.getQueryParams() && window.vff.getQueryParams()._targetgeo)) {
            let metadataBounds = this.getBound(data.metadata.targetGeo);
            let queryParamBounds = this.getBound(window.vff.getQueryParams()._targetgeo);

            isIntersects = queryParamBounds.intersects(metadataBounds);
        }
        return isIntersects;
    },

    // Is my location in data.metadata.targetGeo
    contains: function(data,callback) {
        const func = this ? this.contains : this;
        if (callback === undefined) {
            return new Promise(function (resolve, reject) {
                func(data, function(err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        }

        let isContains = false;
        if (data.metadata && data.metadata.targetGeo) {
            let metadataBounds = this.getBound(data.metadata.targetGeo);
            this.mine().then(function(coords){
                let myLocation = L.latLng(coords.latitude, coords.longitude,coords.altitude);
                callback(metadataBounds.contains(myLocation));
            });
        }else{
            callback(isContains);
        }
    }
};

module.exports = vffLocationApi;


