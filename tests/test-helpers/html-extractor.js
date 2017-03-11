import commandGenerator from '../../services/command-generator-service';

class HtmlExtractor {
  constructor() {

  }

  extract() {
    let bashCommand = commandGenerator.generateCommand();

    console.log(bashCommand);

    return Promise.resolve('done');
  }
}

export default new HtmlExtractor();
