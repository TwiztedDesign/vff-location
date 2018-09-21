/**=============== Examples =================**/
// require('./examples/vff-title-element');
var vffLocationApi = require('./core/vff-location-api');
/**==========================================**/

/**======= To define new vff element ==============**/
// window.vff.define(element-name, element-class);

/**======= To extend vff with new functions =======**/
window.vff.extend("location", vffLocationApi);

