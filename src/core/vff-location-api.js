import * as L from 'leaflet';
var geoHelpers = require('../helpers/geo-leaflet');

var vffLocationApi = {

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
            let metadataBounds = geoHelpers.getBound(data.metadata.targetGeo);
            let queryParamBounds = geoHelpers.getBound(window.vff.getQueryParams()._targetgeo);

            isIntersects = queryParamBounds.intersects(metadataBounds);
        }
        return isIntersects;
    },

    // Is my location in data.metadata.targetGeo
    contains: function(data,callback) {
        callback = callback || function() {};

        return new Promise((resolve, reject) => {
            let isContains = false;
            if (data.metadata && data.metadata.targetGeo) {
                let metadataBounds = geoHelpers.getBound(data.metadata.targetGeo);
                this.mine().then(function(coords){
                    let myLocation = L.latLng(coords.latitude, coords.longitude,coords.altitude);
                    let answer = metadataBounds.contains(myLocation);
                    resolve(answer);
                    return callback(answer);
                },function(err){
                    reject(err);
                    return callback(err,null);
                });
            }else{
                resolve(isContains);
                return callback(isContains);
            }
        });
    }
};

module.exports = vffLocationApi;


