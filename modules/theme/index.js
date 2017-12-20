var schedule = require('node-schedule');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var themeModel = require('./models/thememodel');
var Promise = require('bluebird');
var utility = require('../../lib/utility');
var fs = require('fs');
var config = require('config');
// full selection conditions for paths
var fullPopulate = [
];

var themeModule = {};
module.exports = themeModule;
themeModule.getThemeColor = function (userId) {
    // find by id
    return themeModel.find().exec();
};

//Add Theme database
themeModule.addThemeColor = function (color) {
    console.log(color.length);
    var count = 0;
    color.forEach(function(element){
      count = count + 1;
      console.log(count);
        new themeModel(element).save();
        if(color.length == count){
          callback();
        }
    })
    function callback(){ 
        console.log("SSS");
    return themeModel.find({}).exec();
    }
};
//Remove All data of theme
themeModule.removeAllrecord = function (orderNo) {
      return themeModel.deleteMany({}).exec();
  };







