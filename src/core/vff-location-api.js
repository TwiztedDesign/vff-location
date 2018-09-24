const geoHelpers = require('../helpers/geo-leaflet');

const vffLocationApi = {
    // Working with W3C Geolocation API
    mine: function(callback, options) {
        callback = callback || function() {};

        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position, error) => {
                    window.console.log(position);
                    resolve(position.coords);
                    return callback(error, position.coords);
                }, options);
            }else{
                reject('no permissions');
                return callback('no permissions',null);
            }
        });
    },

    // Is data.metadata.targetGeo intersect with vff.getQueryParams()._targetgeo
    intersects: function(data) {
        let isIntersects = false;
        if ((data.metadata && data.metadata.targetGeo) &&
            (window.vff.getQueryParams() && window.vff.getQueryParams()._targetgeo)) {
            isIntersects = geoHelpers.intersects(data.metadata.targetGeo,window.vff.getQueryParams()._targetgeo);
        }
        return isIntersects;
    },

    // Is my location in data.metadata.targetGeo
    contains: function(data,callback) {
        callback = callback || function() {};

        return new Promise((resolve, reject) => {
            let isContains = false;
            if (data.metadata && data.metadata.targetGeo) {
                this.mine().then(function(coords){
                    let answer = geoHelpers.contains(coords, data.metadata.targetGeo);
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


