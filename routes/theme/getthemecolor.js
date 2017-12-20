var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var themeModule = require('../../modules/theme');
var authModule = require('../../modules/auth');
var route = new Route('get', '/getthemecolor');
module.exports = route;

// public route
route.setPublic();

// get Theme Color list 
route.use(function (req, res, next) {
   return themeModule.getThemeColor().then(function(color){
    if (color) {
        var colors = {
            "isSuccess": 1,
            "message": "Success",
            "data": color
        }
        return res.json(colors);
    } else {
        var colors = {
            "isSuccess": 0,
            "message": "Error",
            "data": []
        }
        return res.json(colors);
    }
   });
});
