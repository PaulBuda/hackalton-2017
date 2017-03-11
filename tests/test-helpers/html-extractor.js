import commandGenerator from '../../services/command-generator-service';
const exec = require('child-process-promise').exec;

class HtmlExtractor {
  constructor() {

  }

  extract() {
    let bashCommand = commandGenerator.generateCommand('wolfram');

    return exec(bashCommand);
  }
}

export default new HtmlExtractor();
