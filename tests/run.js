
'use strict';

var url = 'http://encuestame.org/demo/home';
var wd = require('wd');
require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var browser = wd.remote('localhost', 9515);
browser.init({
	browserName: "chrome",
	chromeOptions: {
		"androidPackage": "com.android.chrome"
	}
}, function () {
	browser.get(url, function () {
		browser.title(function (err, title) {
			title.should.include('Encuestame');
			browser.saveScreenshot("home.png", function(err, filePath) {
				browser.elementByCssSelector('.type-filter > li > a:first-child', function (err, el) {
					browser.clickElement(el, function () {
						/* jshint evil: true */
							browser.eval("window.location.href", function (err, href) {
								href.should.include('view=tweetpoll');
								browser.saveScreenshot("tweetpoll.png", function(err, filePath) {
									browser.elementByCssSelector('.tags > a:first-child', function (err, el) {
										browser.clickElement(el, function () {
											console.log("********************1");
												browser.setAsyncScriptTimeout(6000, function(){
													console.log("********************2");
													browser.saveScreenshot("hashtag.png", function(err, filePath) {
														browser.quit();
													});
												});
											console.log("********************3");
										//});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});