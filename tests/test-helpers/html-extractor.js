import commandGenerator from '../../services/command-generator-service';
<<<<<<< HEAD
const exec = require('child-process-promise').exec;
=======
>>>>>>> Add scraper service.

class HtmlExtractor {
  constructor() {

  }

  extract() {
    let bashCommand = commandGenerator.generateCommand('wolfram');

    return exec(bashCommand);
  }
}

export default new HtmlExtractor();
