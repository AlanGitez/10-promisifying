"use strict";

const path = require("path");
const chai = require("chai");
const expect = chai.expect;
const fs = require("fs");
chai.use(require("chai-spies"));

const utils = require("./utils");
let { blue, magenta } = utils;

if (!utils.__spy) {
  blue = chai.spy.on(utils, "blue");
  magenta = chai.spy.on(utils, "magenta");
}

const exercise = require("./exercise-one");
const dirpath = path.join(__dirname, "poem-one");
const estrofas = fs
  .readdirSync(dirpath)
  .filter(function (filename) {
    return filename[0] !== ".";
  })
  .map(function (filename) {
    return fs.readFileSync(path.join(dirpath, filename)).toString();
  });

function exactlyOneIsTrue(boolA, boolB) {
  const onlyOne = true;
  if (boolA && boolB) {
    onlyOne = false;
  } else if (!boolA && !boolB) {
    onlyOne = false;
  }
  return onlyOne;
}


function getCall(spy, n) {
  return spy.__spy.calls[n] || [];
}

describe("exercise one (involving poem one)", function () {
  beforeEach(function () {
    utils.resetSpy(blue);
    utils.resetSpy(magenta);
  });

  let blueCalls, magentaCalls;
  beforeEach(function () {
    blueCalls = blue.__spy.calls;
    magentaCalls = magenta.__spy.calls;
  });

  describe("problemA", function () {
    xit("loguea la primer estrofa", function (done) {
      exercise.problemA();
      setTimeout(function () {
        expect(blue).to.have.been.called.with(estrofas[0]);
        done();
      }, 250);
    });
  });

  describe("problemB", function () {
    xit("loguea la estrofa dos y tres, en cualquier orden", function (done) {
      exercise.problemB();
      setTimeout(function () {
        expect(blue).to.have.been.called.with(estrofas[1]);
        expect(blue).to.have.been.called.with(estrofas[2]);
        expect(blueCalls).to.have.length(2);
        done();
      }, 500);
    });
  });

  describe("problemC", function () {
    xit("loguea la estrofa dos y después loguea la estrofa tres", function (done) {
      exercise.problemC();
      setTimeout(function () {
        const firstCallArgs = blueCalls[0];
        const secondCallArgs = blueCalls[1];
        expect(firstCallArgs[0]).to.equal(estrofas[1]);
        expect(secondCallArgs[0]).to.equal(estrofas[2]);
        expect(blueCalls).to.have.length(2);
        done();
      }, 500);
    });
  });

  describe("problemD", function () {
    xit("loguea la estrofa cuatro o un error si llega a ocurrir", function (done) {
      exercise.problemD();
      setTimeout(function () {
        const blueCalledWithStanza = getCall(blue, 0)[0] == estrofas[3];
        const magentaCalledWithError = getCall(magenta, 0)[0] instanceof Error;
        const exactlyOneOccurred = exactlyOneIsTrue(
          blueCalledWithStanza,
          magentaCalledWithError
        );
        expect(exactlyOneOccurred).to.equal(true);
        done();
      }, 250);
    });
  });

  describe("problemE", function () {
    xit("loguea la estrofa tres y después loguea la estrofa cuatro o un error si llegase a ocurrir para cualquiera de las lecturas)", function (done) {
      exercise.problemE();
      setTimeout(function () {
        const bothSucceeded = blueCalls.length === 2;
        const onlyFirstSucceeded = blueCalls.length === 1;
        const firstFailed = blueCalls.length === 0;
        if (bothSucceeded) {
          expect(blueCalls[0][0]).to.equal(estrofas[2]);
          expect(blueCalls[1][0]).to.equal(estrofas[3]);
          expect(magentaCalls).to.be.empty;
        } else if (onlyFirstSucceeded) {
          expect(blueCalls[0][0]).to.equal(estrofas[2]);
          expect(magentaCalls).to.have.length(1);
          expect(magentaCalls[0][0]).to.be.instanceof(Error);
        } else if (firstFailed) {
          expect(magentaCalls).to.have.length(1);
          expect(magentaCalls[0][0]).to.be.instanceof(Error);
        } else {
          throw Error(
            "Cannot determine how many file reads succeeded or failed"
          );
        }
        done();
      }, 500);
    });
  });

  describe("problemF", function () {
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

    xit("loguea la estrofa tres y después loguea la estrofa cuatro o loguea un error si ocurre para cualquiera de las lecturas y siempre loguea 'done' cuando todo haya terminado", function (done) {
      exercise.problemF();
      setTimeout(function () {
        const loggedDoneCalls = logList.filter(function (call) {
          return call.args.some(function (arg) {
            return /done/.test(arg);
          });
        });
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        const bothSucceeded = blueCalls.length === 2;
        const onlyFirstSucceeded = blueCalls.length === 1;
        const firstFailed = blueCalls.length === 0;
        if (bothSucceeded) {
          expect(blueCalls[0][0]).to.equal(estrofas[2]);
          expect(blueCalls[1][0]).to.equal(estrofas[3]);
          expect(magentaCalls).to.be.empty;
          expect(loggedDoneCall.priorNumBlueCalls).to.equal(2);
          expect(loggedDoneCall.priorNumMagentaCalls).to.equal(0);
        } else if (onlyFirstSucceeded) {
          expect(blueCalls[0][0]).to.equal(estrofas[2]);
          expect(magentaCalls).to.have.length(1);
          expect(magentaCalls[0][0]).to.be.instanceof(Error);
          expect(loggedDoneCall.priorNumBlueCalls).to.equal(1);
          expect(loggedDoneCall.priorNumMagentaCalls).to.equal(1);
        } else if (firstFailed) {
          expect(magentaCalls).to.have.length(1);
          expect(magentaCalls[0][0]).to.be.instanceof(Error);
          expect(loggedDoneCall.priorNumBlueCalls).to.equal(0);
          expect(loggedDoneCall.priorNumMagentaCalls).to.equal(1);
        } else {
          throw Error(
            "Cannot determine how many file reads succeeded or failed"
          );
        }
        done();
      }, 500);
    });
  });
});
