import util from 'util';

class CommandGenerator {
  constructor() {

  }

  generateCommand(scraperName) {
    return util.format('node_modules/nightwatch/bin/nightwatch --group %s', scraperName);
  }
}

export default new CommandGenerator();
