var appRoot = require('app-root-path').path;
var path = require('path');
var async = require('async');
var questionsWritter = require(path.join(appRoot, 'services', 'questions-writter'));

var countries = require(appRoot + '/countries.json').countries.split(' | ');

var countriesData = [];

var capitalsName = [];

var loadCounty = function(county) {
  return function(callback){
      try {
        var countyName = county.split(' ').join('-');
        var countyData = require(path.join(appRoot, 'db', countyName));
        countyData['Language'] = countyData['Official languages'];
        countyData['Name'] = countyName;
        countyData['InternetTLD'] = countyData['Internet TLD']
        countriesData.push(countyData);
      } catch (e) {

      }
      return callback();
  }
}

function loadData() {
  var tasks = [];

  countries.forEach(function(county){
    tasks.push(loadCounty(county));
  });

  async.series(tasks, function(){
    async.series([
      function(callback){
        questionsWritter.processQuestions(countriesData, 'Capital', callback);
      },
      function(callback){
        questionsWritter.processQuestions(countriesData, 'Capital-Multiple', callback);
      },
      function(callback){
        questionsWritter.processQuestions(countriesData, 'Language', callback);
      },
      function(callback){
        questionsWritter.processQuestions(countriesData, 'Language-Multiple', callback);
      },
      function(callback){
        questionsWritter.processQuestions(countriesData, 'Currency-Multiple', callback);
      },
      function(callback){
        questionsWritter.processQuestions(countriesData, 'InternetTLD-Multiple', callback);
      }
    ], function(){
      console.log('done');
    })

  });
}

loadData();
