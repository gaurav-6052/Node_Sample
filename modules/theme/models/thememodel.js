var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var bcrypt = require('bcryptjs');
var plugins = require('../../../plugins');
var autopopulate = require('mongoose-autopopulate');

// bcrypt password
var hashPass = function (value) {
    return bcrypt.hashSync(value);
};
// transform
var omitPrivate = function (doc, theme) {
   
    delete theme.id;
    delete theme.__v;
    delete theme.modifiedDate;
    delete theme.createDate;
    return theme;
};

// options
var options = {
    toJSON: { virtuals: true, transform: omitPrivate },
    toObject: { virtuals: true, transform: omitPrivate }
};

// schema
var schema = new Schema({
    // Theme  information
    themeName:{type:String},
    isDefault:{type:Boolean,default:false},
    color:{type:String,default:"#ff4d4d"},
    createBy :  { type: String, trim: true, lowercase: true },
    createDate : { type: Date, default: Date.now},
    modifiedBy :  { type: String, trim: true, lowercase: true },
    modifiedDate : { type: Date, default: Date.now}
}, options);

// plugins
schema.plugin(plugins.mongooseFindPaginate);
schema.plugin(plugins.mongooseSearch, ['color']);

// autopopulate plugin
schema.plugin(autopopulate);

// model
module.exports = mongoose.model('Theme', schema);