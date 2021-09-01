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
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  const problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loguea el poema dos estrofa uno y estrofa dos en cualquier orden
   *    pero loguea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  async.each(['poem-two/estrofa-01.txt', 'poem-two/estrofa-02.txt'],
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

  // promise version
  // ???

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loguea todas las estrofas en poema dos, en cualquier orden y loguea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'estrofa-0' + n + '.txt';
  });

  // callback version
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

  // promise version
  // ???

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loguea todas las estrofas en el poema dos, *en orden* y
   *    loguea 'done' cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
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

  // promise version
  // ???

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loguea todas las estrofas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done' cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'estrofa-0' + n + '.txt';
  });
  const randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
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

  // promise version
  // ???

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  const fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu código aquí
  }
}
