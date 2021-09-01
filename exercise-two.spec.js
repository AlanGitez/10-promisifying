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
const estrofas = fs
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
    xit("loggea la estrofa uno y la estrofa dos en cualquier orden pero loggea 'done' cuando ambos hayan terminado (ignora errores)", function (done) {
      exercise.problemA();
      setTimeout(function () {
        expect(blue).to.have.been.called.with(estrofas[0]);
        expect(blue).to.have.been.called.with(estrofas[1]);
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(2);
        done();
      }, 500);
    });
  });

  describe("problemB", function () {
    xit("loguea todas las estrofasen cualquier orden y loggea 'done' cuando todas hayan terminado (ignora errores)", function (done) {
      this.timeout(3000);
      exercise.problemB();
      setTimeout(function () {
        estrofas.forEach(function (stanza) {
          expect(blue).to.have.been.called.with(stanza);
        });
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(estrofas.length);
        done();
      }, 2000);
    });
  });

  describe("problemC", function () {
    xit("loguea todas las estrofas en el poema dos, *en orden* y loggea 'done' cuando hayan terminado todas (ignorá errores)", function (done) {
      this.timeout(3000);
      exercise.problemC();
      setTimeout(function () {
        estrofas.forEach(function (stanza, index) {
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
    xit("loguea todas las estrofas en el poema dos *en orden* asegurandote de fallar para cualquier error y logueando un 'done' cuando todas hayan terminado", function (done) {
      this.timeout(3000);
      exercise.problemD();
      setTimeout(function () {
        blueCalls.forEach(function (callArgs, index) {
          expect(callArgs[0]).to.equal(estrofas[index]);
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
        if (blueCalls.length !== estrofas.length) {
          expect(loggedDoneCall.priorNumMagentaCalls).to.equal(1);
        }
        done();
      }, 2000);
    });
  });
});
