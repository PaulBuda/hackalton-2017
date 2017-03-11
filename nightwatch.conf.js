var appRoot = require('app-root-path');

var SELENIUM_CONFIGURATION = {
  start_process: true,
  server_path: appRoot + '/node_modules/selenium-standalone/.selenium/selenium-server/3.0.0-server.jar',
  host: '127.0.0.1',
  port: 4444,
  "cli_args" : {
    "webdriver.chrome.driver" :  appRoot + "/node_modules/selenium-standalone/.selenium/chromedriver/2.26-x64-chromedriver"
  }
};

var CHROME_CONFIGURATION = {
  browserName: 'chrome',
  javascriptEnabled: false,
  acceptSslCerts: true,
  chromeOptions: {
    prefs: {
      download: {
        prompt_for_download: false,
        directory_upgrade: true,
        default_directory: appRoot + '/temp/'
      }
    }
  }
};

var DEFAULT_CONFIGURATION = {
  launch_url: 'http://localhost',
  selenium_port: 4444,
  selenium_host: 'localhost',
  desiredCapabilities: CHROME_CONFIGURATION
};

var ENVIRONMENTS = {
  default: DEFAULT_CONFIGURATION
};

module.exports = {
  src_folders: ['./tests'],
  output_folder : "./tests/test-reports",
  selenium: SELENIUM_CONFIGURATION,
  test_settings: ENVIRONMENTS
};
