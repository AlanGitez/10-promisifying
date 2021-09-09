/*********** Sobre `exerciseUtils` ********
 *
 * `excersiceUtils` es una Variable que viene de un archivo en este repo.
 * 
 * El archivo `utils.js` está en este nivel y crea un `promisifiedReadFile`.
 *
 * Es importante que te fijes en él a la hora de completar este Workshop.
 *
 * Las Funciones `blue` y `magenta` sirven para mantener tu código DRY.
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
  problemaA: problemaA,
  problemaB: problemaB,
  problemaC: problemaC,
  problemaD: problemaD,
  problemaE: problemaE,
  problemaF: problemaF,
};

// Itera sobre cada problema como argumento del command-line para luego ser procesado.
args.forEach(function (arg) {
  const problema = module.exports["problema" + arg];
  if (problema) problema();
});

function problemaA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. Logueá, en versión Promesas, el poema-uno, estrofa-uno. Ignorá errores.
   *
   */

  // Versión Callback
  readFile("poema-uno/estrofa-01.txt", function (err, estrofa) {
    console.log("-- A. callback version --");
    blue(estrofa);
  });

  // Versión Promesas
  // [Escribí tu código acá]
}

function problemaB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. Logueá, en versión Promesas, el poema-uno, estrofa-dos y estrofa-tres, en cualquier orden. Ignorá errores.
   *  
   *
   */

  // Versión Callback
  readFile("poema-uno/estrofa-02.txt", function (err, estrofa2) {
    console.log("-- B. callback version (estrofa dos) --");
    blue(estrofa2);
  });
  readFile("poema-uno/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- B. callback version (estrofa tres) --");
    blue(estrofa3);
  });

  // Versión Promesas
  // [Escribí tu código acá]
}

function problemaC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Leé y logueá, en versión Promesas, el poema-uno, estrofa-dos. Luego, leé y mostrá por consola
   *    estrofa-tres. Cuando ambas hayan terminado, logueá 'done'. Ignorá errores.
   * 
   * *Tip*: Los specs esperarán la palabra exacta 'done' para pasar el test. 
   *    Prestá atención a las mayúsculas y minúsculas porque es case sensitive.
   *
   */

  // Versión Callback
  readFile("poema-uno/estrofa-02.txt", function (err, estrofa2) {
    console.log("-- C. callback version (estrofa dos) --");
    blue(estrofa2);
    readFile("poema-uno/estrofa-03.txt", function (err, estrofa3) {
      console.log("-- C. callback version (estrofa tres) --");
      blue(estrofa3);
      console.log("-- C. callback version done --");
    });
  });

  // Versión Promesas
  // [Escribí tu código acá]
  // *Tip*: No hace falta anidar los `.then`.
}

function problemaD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. Logueá, en versión Promesas, el poema-uno, estrofa-cuatro o un error (si llegara a ocurrir).
   *
   */

  // Versión Callback
  readFile("poema-uno/wrong-file-name.txt", function (err, estrofa4) {
    console.log("-- D. callback version (estrofa cuatro) --");
    if (err) magenta(err);
    else blue(estrofa4);
  });

  // Versión Promesas
  // [Escribí tu código acá]
}

function problemaE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Leé y logueá, en versión Promesas, el poema-uno, estrofa-tres.
   * Luego, leé y logueá la estrofa-cuatro o un error (si llegara a ocurrir) para cualquiera de las lecturas.
   *
   */

  // Versión Callback
  readFile("poema-uno/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- E. callback version (estrofa tres) --");
    if (err) return magenta(err);
    blue(estrofa3);
    readFile("poema-uno/wrong-file-name.txt", function (err2, estrofa4) {
      console.log("-- E. callback version (estrofa cuatro) --");
      if (err2) return magenta(err2);
      blue(estrofa4);
    });
  });

  // Versión Promesas
  // [Escribí tu código acá]
}

function problemaF() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. Leé y logueá, en versión Promesas, el poema-uno, estrofa-tres.
   * Luego, leé y logueá la estrofa-cuatro o un error (si llegara a ocurrir) para cualquiera de las lecturas.
   * *Recordá*: Siempre logueá 'done' al finalizar.
   *
   */

  // Versión Callback
  readFile("poema-uno/estrofa-03.txt", function (err, estrofa3) {
    console.log("-- F. callback version (estrofa tres) --");
    if (err) {
      magenta(err);
      console.log("-- F. callback version done --");
      return;
    }
    blue(estrofa3);
    readFile("poema-uno/wrong-file-name.txt", function (err2, estrofa4) {
      console.log("-- F. callback version (estrofa cuatro) --");
      if (err2) magenta(err2);
      else blue(estrofa4);
      console.log("-- F. callback version done --");
    });
  });

  // Versión Promesas
  // [Escribí tu código acá]
}
