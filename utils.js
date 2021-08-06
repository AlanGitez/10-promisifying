"use strict";

const fs = require("fs");
const Promise = require("bluebird");
const chalk = require("chalk");

const utils = {};

utils.readFile = function (filename, callback) {
  const randExtraTime = Math.random() * 200;
  setTimeout(function () {
    fs.readFile(filename, function (err, buffer) {
      if (err) callback(err);
      else callback(null, buffer.toString());
    });
  }, randExtraTime);
};

utils.promisifiedReadFile = function (filename) {
  return new Promise(function (resolve, reject) {
    utils.readFile(filename, function (err, str) {
      if (err) reject(err);
      else resolve(str);
    });
  });
};

utils.blue = function (text) {
  console.log(chalk.blue(text));
};

utils.magenta = function (text) {
  console.error(chalk.magenta(text));
};

utils.resetSpy = function (spy) {
  spy.__spy = {
    ...spy.__spy,
    calls: [],
    called: false,
  };
};

module.exports = utils;
