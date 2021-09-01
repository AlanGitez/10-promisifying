/*********** Yo explico `exerciseUtils` ********
 *
 * excersiceUtils es una variable que viene de un archivo en este repo
 * El archivo `./utils` esta en este nivel y se llama `utils.js`
 *
 * Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
 *
 * Las funciones `blue` y `magenta` para mantener tu código DRY
 *
 ***********************************************/

"use strict";

const Promise = require("bluebird"),
  exerciseUtils = require("./utils");

  const readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

  const args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  const problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loguea el poema uno estrofa uno (ignorá errores)
   *
   */

  // callback version
  readFile("poem-one/estrofa-01.txt", function (err, estrofa) {
    console.log("-- A. callback version --");
    blue(estrofa);
  });

  // promise version
  // ???
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea el poema uno estrofa dos y tres, en cualquier orden
   *    (ignora errores)
   *
   */

  // callback version
  readFile("poem-one/estrofa-02.txt", function (err, estrofa2) {
    console.log("-- B. callback version (estrofa dos) --");
    blue(estrofa2);
  });
  readFile("poem-one/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- B. callback version (estrofa tres) --");
    blue(estrofa3);
  });

  // promise version
  // ???
}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. lee & loggea el poema uno estrofa dos y *DESPUES* lee & loggea
   *    estrofa tres. Loggea 'done' cuando ambas hayan terminado. Fijate
   *    que los specs estan opinionados y espara la palabra exacta
   *    'done' (case sensitive) para ser loggeada para poder pasar
   *    (ignora errores)
   *
   */

  // callback version
  readFile("poem-one/estrofa-02.txt", function (err, estrofa2) {
    console.log("-- C. callback version (estrofa dos) --");
    blue(estrofa2);
    readFile("poem-one/estrofa-03.txt", function (err, estrofa3) {
      console.log("-- C. callback version (estrofa tres) --");
      blue(estrofa3);
      console.log("-- C. callback version done --");
    });
  });

  // promise version (no hace falta anidar los .then)
  // ???
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea el poema uno estrofa cuatro o un error si llega a ocurrir
   *
   */

  // callback version
  readFile("poem-one/wrong-file-name.txt", function (err, estrofa4) {
    console.log("-- D. callback version (estrofa cuatro) --");
    if (err) magenta(err);
    else blue(estrofa4);
  });

  // promise version
  // ???
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Lee y loggea el poema uno estrofa tres y *DESPUES* lee y loggea la
   *    estrofa cuatro o loggea un error si llegase a ocurrir para
   *    cualquiera de las lecturas
   *
   */

  // callback version
  readFile("poem-one/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- E. callback version (estrofa tres) --");
    if (err) return magenta(err);
    blue(estrofa3);
    readFile("poem-one/wrong-file-name.txt", function (err2, estrofa4) {
      console.log("-- E. callback version (estrofa cuatro) --");
      if (err2) return magenta(err2);
      blue(estrofa4);
    });
  });

  // promise version
  // ???
}

function problemF() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. Lee & loggea el poema uno estrofa tres y *DESPUES* lee y loguea la
   *    estrofa cuatro o loggea un error si ocurre para cualquiera de las
   *    lecturas y siempre loggea 'done' cuando todo haya terminado
   *
   */

  // callback version
  readFile("poem-one/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- F. callback version (estrofa tres) --");
    if (err) {
      magenta(err);
      console.log("-- F. callback version done --");
      return;
    }
    blue(estrofa3);
    readFile("poem-one/wrong-file-name.txt", function (err2, estrofa4) {
      console.log("-- F. callback version (estrofa cuatro) --");
      if (err2) magenta(err2);
      else blue(estrofa4);
      console.log("-- F. callback version done --");
    });
  });

  // promise version
  // ???
}
