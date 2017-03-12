var appRoot = require('app-root-path').path;
var path = require('path');
var fs = require('fs');
var async = require('async');
var util = require('util');

var QuestionsWritter = function() {
  var questions = [];

  var createQuestion = function(template, countyData, multiple, flag){

    return function(callback){
      var object = {};
      object.q = util.format(template, countyData.Name);
      object.a = countyData[flag];
      if (multiple.length > 0) {
        object.p = multiple;
      }
      // console.log(object);
      questions.push(object);
      callback();
    }
  }

  var processQuestions = function(countriesData, flag, done){
    var multiple = [];
    if (flag.split('-').length > 1){
      for(var i in countriesData){
        console.log(countriesData[i].Name, flag.split('-')[0], countriesData[i][flag.split('-')[0]])
        multiple.push(countriesData[i][flag.split('-')[0]]);
      }
    }

    var template = fs.readFileSync(path.join(appRoot, 'templates', 'questions-templates', flag + '.txt'), 'utf8').trim();

    var tasks = [];

    countriesData.forEach(function(countyData){
      tasks.push(createQuestion(template, countyData, multiple, flag.split('-')[0]));
    });

    async.series(tasks, function(){
      fs.writeFileSync(path.join(appRoot, 'questions', flag + '.json'), JSON.stringify(questions));
      questions = [];
      done();
    })
  }

  return {
    processQuestions:processQuestions
  };
};

module.exports = QuestionsWritter();
