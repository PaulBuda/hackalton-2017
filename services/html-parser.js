var appRoot = require('app-root-path').path;
var async = require('async');
var cheerio = require('cheerio');

var DataParser = function () {
  var parseData = function (body, route) {
    var $ = cheerio.load(body);

    return $(route).text().trim();
  };

  var getNumberOfElements = function (body, matchingField) {
    var $ = cheerio.load(body);

    var tags = $(matchingField).get();

    return tags.length;
  };

  return {
    parseData: parseData,
    getNumberOfElements: getNumberOfElements
  }
};

module.exports = DataParser();
