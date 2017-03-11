var selenium = require ('selenium-standalone');
var async = require ('async');

function installSelenium (done)  {
  selenium.install({
    // You can put here browser and selenium preferences
    // By default
    // selenium >>  https://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
    // chromedriver >> https://chromedriver.storage.googleapis.com/2.24/chromedriver_mac64.zip
    // firefox >> https://github.com/mozilla/geckodriver/releases/download/v0.10.0/geckodriver-v0.10.0-macos.tar.gz
    version: '3.0.0',
    drivers: {
      chrome: {
        version: '2.26'
      }
    },
    logger: function(message) {
      console.log(message)
    }
  }, function(err) {
    return done(err);
  });
}

installSelenium(function () {
  console.log('gata');
});
