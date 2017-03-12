var htmlParser = require('./html-parser');
var fs = require('fs');
var util = require('util');
class DataExtractor {
  constructor() {

  }

  extract(html, figure) {
    var numberOfTrs = htmlParser.getNumberOfElements(html[0], 'table.infobox tr');

    var object = {};

    for (var i=1 ; i <= numberOfTrs ; ++i) {
      var key = htmlParser.parseData(html[0], util.format('table.infobox tr:nth-of-type(%d) th', i)).split('\n')[0].split('• ');
      if (key[0].length == 0){
        key = key[1];
      } else {
        key = key[0];
      }
      var val = htmlParser.parseData(html[0], util.format('table.infobox tr:nth-of-type(%d) td', i)).split('\n')[0];
      object[key] = val;
    }

    fs.writeFileSync('./db/'+figure.split(' ').join('-')+'.json', JSON.stringify(object));

    return Promise.resolve(null);
  }
}

export default new DataExtractor();
