const fs = require('fs');
const path = require('path');

const baseUrl = 'https://en.wikipedia.org/wiki/';

const oneSecond = 1000;
const oneMinute = 60 * oneSecond;

module.exports = {
  '@tags': ['wikipedia'],

  'Get Html After Ajax Call' : function (client) {
    var url = baseUrl + process.env.NODE_URL;

    client
      .windowMaximize()
      .url(url)
      .pause(oneSecond)
      .waitForElementVisible('table.infobox', oneMinute)
      .source(function(res){
        var htmls = [];
        htmls.push(res.value)
        fs.writeFileSync('./temp/' + process.env.NODE_URL.split('_').join('-') + '.txt', JSON.stringify(htmls));
      })
      .end();
  }
}
