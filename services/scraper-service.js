import htmlExtractor from '../tests/test-helpers/html-extractor';

class ScraperService {
  constructor() {

  }

  scrape() {
    return htmlExtractor.extract();
  }
}

export default new ScraperService();
