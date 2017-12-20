var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var themeModule = require('../../modules/theme');
var authModule = require('../../modules/auth');
var route = new Route('get', '/addthemecolors');
module.exports = route;

// public route
route.setPublic();
route.use(function (req, res, next) {
    return themeModule.removeAllrecord().then(function (data) {
      if (data) {
        return next();
      } else {
        return next(errors.invalid_update().withDetails("INVALID data"));
      }
    });
  });
// get item list of an order
route.use(function (req, res, next) {
  var color = [{"color":"#3377ff","themeName":"Blue","isDefault":true},
  {"color":"#ff6600","themeName":"Orange","isDefault":true},
  {"color":"#ff0000","themeName":"Red","isDefault":true},
  {"color":"#cc6699","themeName":"Other","isDefault":true}];
   themeModule.addThemeColor(color).then(function(result){
       console.log(result);
   });
});
