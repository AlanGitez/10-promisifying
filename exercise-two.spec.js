"use strict";

const path = require("path");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-spies"));

const utils = require("./utils");
let { blue, magenta } = utils;

if (!utils.blue.__spy) {
  blue = chai.spy.on(utils, "blue");
  magenta = chai.spy.on(utils, "magenta");
}

const fs = require("fs");
const exercise = require("./exercise-two");
const dirpath = path.join(__dirname, "poem-two");
const stanzas = fs
  .readdirSync(dirpath)
  .filter(function (filename) {
    return filename[0] !== ".";
  })
  .map(function (filename) {
    return fs.readFileSync(path.join(dirpath, filename)).toString();
  });

describe("exercise two (involving poem two)", function () {
  beforeEach(function () {
    utils.resetSpy(blue);
    utils.resetSpy(magenta);
  });

  let blueCalls, redCalls;
  beforeEach(function () {
    blueCalls = blue.__spy.calls;
    redCalls = magenta.__spy.calls;
  });

  const originalLog = console.log;
  let logList = [];
  before(function () {
    console.log = function (...args) {
      logList.push({
        args: args,
        priorNumBlueCalls: blue.__spy.calls.length,
        priorNumMagentaCalls: magenta.__spy.calls.length,
      });
      return originalLog.apply(console, args);
    };
  });
  beforeEach(function () {
    logList = [];
  });

  function getLoggedDoneCalls() {
    return logList.filter(function (call) {
      return call.args.some(function (arg) {
        return /done/.test(arg);
      });
    });
  }

  describe("problemA", function () {
    it("ignoring errors, logs the first and second stanza in any order, and a done message when both are complete", function (done) {
      exercise.problemA();
      setTimeout(function () {
        expect(blue).to.have.been.called.with(stanzas[0]);
        expect(blue).to.have.been.called.with(stanzas[1]);
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(2);
        done();
      }, 500);
    });
  });

  describe("problemB", function () {
    it("ignoring errors, logs all stanzas in any order, and a done message when all are complete", function (done) {
      this.timeout(3000);
      exercise.problemB();
      setTimeout(function () {
        stanzas.forEach(function (stanza) {
          expect(blue).to.have.been.called.with(stanza);
        });
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(stanzas.length);
        done();
      }, 2000);
    });
  });

  describe("problemC", function () {
    it("ignoring errors, logs all stanzas in the correct order, and a done message when all are complete", function (done) {
      this.timeout(3000);
      exercise.problemC();
      setTimeout(function () {
        stanzas.forEach(function (stanza, index) {
          const callArgs = blueCalls[index];
          expect(callArgs[0]).to.equal(stanza);
        });
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(8);
        done();
      }, 2000);
    });
  });

  describe("problemD", function () {
    it("logs all stanzas in the correct order; if an error occurs does not read the next file and instead logs the error; always logs done at the end", function (done) {
      this.timeout(3000);
      exercise.problemD();
      setTimeout(function () {
        blueCalls.forEach(function (callArgs, index) {
          expect(callArgs[0]).to.equal(stanzas[index]);
        });
        if (redCalls.length) {
          expect(redCalls.length).to.equal(1);
          expect(redCalls[0][0]).to.be.instanceof(Error);
          expect(blueCalls.length).to.be.below(8);
        }
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(blueCalls.length);
        if (blueCalls.length !== stanzas.length) {
          expect(loggedDoneCall.priorNumMagentaCalls).to.equal(1);
        }
        done();
      }, 2000);
    });
  });
});
