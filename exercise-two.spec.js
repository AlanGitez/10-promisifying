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
const ejercicio = require("./exercise-two");
const dirpath = path.join(__dirname, "poema-dos");
const estrofas = fs
  .readdirSync(dirpath)
  .filter(function (filename) {
    return filename[0] !== ".";
  })
  .map(function (filename) {
    return fs.readFileSync(path.join(dirpath, filename)).toString();
  });

describe("Ejercicio dos (del poema-dos)", function () {
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

  describe("problemaA", function () {
    it("loguea la estrofa uno y la estrofa dos en cualquier orden y loguea 'done' cuando ambos hayan terminado (ignora errores)", function (done) {
      ejercicio.problemaA();
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

  describe("problemaB", function () {
    it("loguea todas las estrofas en cualquier orden y loguea 'done' cuando todas hayan terminado (ignora errores)", function (done) {
      this.timeout(3000);
      ejercicio.problemaB();
      setTimeout(function () {
        estrofas.forEach(function (estrofa) {
          expect(blue).to.have.been.called.with(estrofa);
        });
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(estrofas.length);
        done();
      }, 2000);
    });
  });

  describe("problemaC", function () {
    it("loguea todas las estrofas en el poema dos, *en orden* y loguea 'done' cuando todas hayan terminado (ignora errores)", function (done) {
      this.timeout(3000);
      ejercicio.problemaC();
      setTimeout(function () {
        estrofas.forEach(function (estrofa, index) {
          const callArgs = blueCalls[index];
          expect(callArgs[0]).to.equal(estrofa);
        });
        const loggedDoneCalls = getLoggedDoneCalls();
        expect(loggedDoneCalls).to.have.length(1);
        const loggedDoneCall = loggedDoneCalls[0];
        expect(loggedDoneCall.priorNumBlueCalls).to.equal(8);
        done();
      }, 2000);
    });
  });

  describe("problemaD", function () {
    it("loguea todas las estrofas en el poema dos *en orden* asegurándose de capturar cualquier error y logueando 'done' cuando todas hayan terminado", function (done) {
      this.timeout(3000);
      ejercicio.problemaD();
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
