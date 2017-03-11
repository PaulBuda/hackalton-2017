import scraperService from './services/scraper-service';

function Start() {
  scraperService.scrape().then((value) => {
    console.log(value);
  });
}

Start();
