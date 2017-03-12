import htmlExtractor from '../tests/test-helpers/html-extractor';
import dataExtractor from './data-extractor';
var figures = require('../figures.json').figures.split(' | ');
var async = require('async');

var getHtml = function(figure)
{
  return function(callback){
    console.log(figure);
    return htmlExtractor.extract(figure).then((value) => {
      return dataExtractor.extract(value, figure).then((value) => {
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

    console.log(figures.length);

    figures.forEach(function(figure){
      tasks.push(getHtml(figure));
    });

    async.series(tasks, function(){
      console.log('123');
    })
  }
}

export default new ScraperService();
