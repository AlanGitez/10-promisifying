'use strict';

const Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

const readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

const args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemaA: problemaA,
  problemaB: problemaB,
  problemaC: problemaC,
  problemaD: problemaD,
  problemaE: problemaE
};

// Corre cada problema dado como un argumento del command-line para procesar.
args.forEach(function(arg){
  const problema = module.exports['problema' + arg];
  if (problema) problema();
});

function problemaA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. Logueá, en versión Promesas, el poema-dos, estrofa-uno y estrofa-dos en cualquier orden. Ignorá errores.
   *    Logueá 'done' cuando ambos hayan terminado.
   *    Las Promesas serán evaluadas en paralelo. Es decir, corren en simultáneo.
   *
   */

  // Versión Callback
  async.each(['poema-dos/estrofa-01.txt', 'poema-dos/estrofa-02.txt'],
    function (filename, eachDone) {
      readFile(filename, function (err, estrofa) {
        console.log('-- A. callback version --');
        blue(estrofa);
        eachDone();
      });
    },
    function (err) {
      console.log('-- A. callback version done --');
    }
  );

  // Versión Promesas
  // [Escribí tu código acá]

}

function problemaB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. Logueá, en versión Promesas, todas las estrofas en poema-dos, en cualquier orden. Ignorá errores.
   *    Logueá 'done' cuando todas hayan terminado.
   *    *Recordá*: Las Promesas serán evaluadas en paralelo. Es decir, corren en simultáneo.
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poema-dos/' + 'estrofa-0' + n + '.txt';
  });

  // Versión Callback
  async.each(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, estrofa) {
        console.log('-- B. callback version --');
        blue(estrofa);
        eachDone();
      });
    },
    function (err) {
      console.log('-- B. callback version done --');
    }
  );

  // Versión Promesas
  // [Escribí tu código acá]

}

function problemaC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Leé y logueá, en versión Promesas, todas las estrofas en el poema-dos, *en orden*. Ignorá errores.
   *    Logueá 'done' cuando hayan terminado todas.
   *    *Importante*: Las lecturas ocurren en serie. Es decir, una comienza cuando la anterior
   *    haya terminado.
   *
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poema-dos/' + 'estrofa-0' + n + '.txt';
  });

  // Versión Callback
  async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, estrofa) {
        console.log('-- C. callback version --');
        blue(estrofa);
        eachDone();
      });
    },
    function (err) {
      console.log('-- C. callback version done --');
    }
  );

  // Versión Promesas
  // [Escribí tu código acá]

}

function problemaD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. Logueá, en versión Promesas, todas las estrofas en el poema-dos *en orden*.
   *    Asegurate de capturar cualquier error.
   *    Logueá 'done' cuando todas hayan terminado.
   asegurandote
   *    de fallar para cualquier error y logueando un 'done' cuando todas
   *    hayan terminado
   *    *Importante*: Las lecturas ocurren en serie. Es decir, una comienza cuando la anterior
   *    haya terminado.
   *
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poema-dos/' + 'estrofa-0' + n + '.txt';
  });
  const randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // Versión Callback
  async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, estrofa) {
        console.log('-- D. callback version --');
        if (err) return eachDone(err);
        blue(estrofa);
        eachDone();
      });
    },
    function (err) {
      if (err) magenta(err);
      console.log('-- D. callback version done --');
    }
  );

  // Versión Promesas
  // [Escribí tu código acá]

}

function problemaE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Creá una versión promisificada de `fs.writeFile`.
   *
   */

  const fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // [Escribí tu código acá]
  }
}
