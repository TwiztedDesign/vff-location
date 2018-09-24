# 🌎 VFF Location extension 🌎
![MIT License](https://img.shields.io/github/license/TwiztedDesign/vff.svg)


# Usage
Add vff-location.js to your project 

    <script src="https://rawgit.com/TwiztedDesign/vff-location/master/dist/vff-location.js"></script>

## Supported Methods
* mine - Get the current location
* intersects - Return true or false, if the query params intersect the target geo of the event
* contains - Return true or false if the target geo of the event contains the current location

### Mine
Return object with the current location of the device.
It using 'navigator.geolocation' and the user needs to permit on his browser to share location.

You can use callback or promises. Both supported.
```javascript
vff.location.mine((err, coords) => {
    .....
    });
```

```javascript
vff.location.mine().then((coords) => {
    .....
    }).error((err) => {
        ...
    });
```


The returned object looks like:
```
{
    accuracy: 30
    altitude: null
    altitudeAccuracy: null
    heading: null
    latitude: 32.2086025
    longitude: 34.904941799999996
    speed: null
}
 ```
 
 
### Intersects
Return true or false by checking if the geo area in the query params intersect the target geo of the event.
In case one of them does not exist it returns false.

```javascript
vff.location.intersects(data);
```
### Contains
Return true or false if the target geo of the event contains the current location
It using vff.location.mine() to get the current location.

You can use callback or promises. Both supported.
```javascript
vff.location.contains((err,result) => {
    .....
    });
```

```javascript
vff.location.contains(data).then((result)=> {
    .....
    }).error((err) => {
        ...
    });
```

### usage examples
To check out the examples, open examples/basic/index.html in your browser
![Alt Text](http://g.recordit.co/xNOObdNRhg.gif)

## Tests
Run tests:

    npm test 

## 🌎 Cheers 🌎 

