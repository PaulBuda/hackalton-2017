const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.wolframalpha.com/input/?i=countries';

const oneMinute = 60 * 1000;

module.exports = {
  '@tags': ['wolfram'],

  'Get Html After Ajax Call' : function (client) {
    client
      .windowMaximize()
      .url(baseUrl)
      .pause(2 * oneMinute)
      .end();
  }
}
