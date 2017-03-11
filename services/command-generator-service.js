import util from 'util';

class CommandGenerator {
  constructor() {

  }

  generateCommand(scraperName, county) {
    return util.format('NODE_URL="%s" node_modules/nightwatch/bin/nightwatch --group %s',
      county.split(' ').join('_'),
      scraperName);
  }
}

export default new CommandGenerator();
