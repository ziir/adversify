/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var AM = require('../modules/account-manager.js');
  mongoose.set('debug', true);

var PM = {};

module.exports = PM;

PM.updateAccount = AM.updatePublisher;

PM.autoLogin = AM.autoLoginPublisher;

PM.login = AM.loginPublisher;

PM.get = AM.getPublisher;

PM.getProfile = AM.getPublisherProfile;

PM.setPassword = PM.setPassword;
