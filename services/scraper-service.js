import htmlExtractor from '../tests/test-helpers/html-extractor';
import dataExtractor from './data-extractor';
var countries = require('../countries.json').countries.split(' | ');
var async = require('async');

var getHtml = function(county)
{
  return function(callback){
    console.log(county);
    return htmlExtractor.extract(county).then((value) => {
      return dataExtractor.extract(value, county).then((value) => {
        callback();
      })
    })
    .catch((err) => {
      console.log(err);
      callback();
    })
  }
}


class ScraperService {
  constructor() {

  }

  scrape() {
    var tasks = [];
    countries.forEach(function(county){
      tasks.push(getHtml(county));
    });

    async.series(tasks, function(){
      console.log('123');
    })
  }
}

export default new ScraperService();
