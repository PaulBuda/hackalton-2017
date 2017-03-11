import commandGenerator from '../../services/command-generator-service';
const exec = require('child-process-promise').exec;
import fs from 'fs';

class HtmlExtractor {
  constructor() {

  }

  extract(county) {
    let bashCommand = commandGenerator.generateCommand('wikipedia', county);

    return exec(bashCommand).then(() => {
      var html = fs.readFileSync('./temp/' + county.split(' ').join('-') + '.txt', 'utf8');
      return Promise.resolve(JSON.parse(html));
    });
  }
}

export default new HtmlExtractor();
