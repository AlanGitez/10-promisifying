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

'use strict';

const Promise = require('bluebird'),
	exerciseUtils = require('./utils');

const readFile = exerciseUtils.readFile,
	promisifiedReadFile = exerciseUtils.promisifiedReadFile,
	blue = exerciseUtils.blue,
	magenta = exerciseUtils.magenta;

const args = process.argv.slice(2).map(function(st) {
	return st.toUpperCase();
});

module.exports = {
	problemaA: problemaA,
	problemaB: problemaB,
	problemaC: problemaC,
	problemaD: problemaD,
	problemaE: problemaE,
	problemaF: problemaF
};

// Itera sobre cada problema como argumento del command-line para luego ser procesado.
args.forEach(function(arg) {
	const problema = module.exports['problema' + arg];
	if (problema) problema();
});

function problemaA() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. Logueá, en versión Promesas, el poema-uno, estrofa-uno. Ignorá errores.
   *
   */

	// Versión Promesas
	// [Escribí tu código acá]

	promisifiedReadFile('./poema-uno/estrofa-01.txt').then((data) => blue(data));
}

function problemaB() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. Logueá, en versión Promesas, el poema-uno, estrofa-dos y estrofa-tres, en cualquier orden. Ignorá errores.
   *  
   *
   */

	// Versión Promesas
	// [Escribí tu código acá]
	promisifiedReadFile('poema-uno/estrofa-02.txt').then((data) => blue(data));
	promisifiedReadFile('poema-uno/estrofa-03.txt').then((data) => blue(data));
}

// promisifiedReadFile("./el-perdedor.txt")
// .then(data => console.log(data))
function problemaC(done) {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Leé y logueá, en versión Promesas, el poema-uno, estrofa-dos. Luego, leé y mostrá por consola
   *    estrofa-tres. Cuando ambas hayan terminado, logueá 'done'. Ignorá errores.
   * 
   * *Tip*: Los specs esperarán la palabra exacta 'done' para pasar el test. 
   *    Prestá atención a las mayúsculas y minúsculas porque es case sensitive.
   *
   */

	// Versión Promesas
	// [Escribí tu código acá]
	// *Tip*: No hace falta anidar los `.then`.

	//  VERSION PENSADA 100% POR NOSOTROS.

	// promisifiedReadFile("poema-uno/estrofa-02.txt")
	// .then(estrofa2 => blue(estrofa2))
	// .then(()=> console.log(done))
	// promisifiedReadFile("poema-uno/estrofa-03.txt")
	// .then(estrofa3 => blue(estrofa3));

	promisifiedReadFile('poema-uno/estrofa-02.txt')
		.then((estrofa2) => {
			blue(estrofa2);
			return promisifiedReadFile('poema-uno/estrofa-03.txt');
		})
		.then((data) => blue(data));
}

function problemaD() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. Logueá, en versión Promesas, el poema-uno, estrofa-cuatro o un error (si llegara a ocurrir).
   *
   */

	// Versión Promesas
	// [Escribí tu código acá]
	promisifiedReadFile('poema-uno/wrong-file-name.txt').then((data) => blue(data)).catch((err) => magenta(err));
}

function problemaE() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Leé y logueá, en versión Promesas, el poema-uno, estrofa-tres.
   * Luego, leé y logueá la estrofa-cuatro o un error (si llegara a ocurrir) para cualquiera de las lecturas.
   *
   */

	// Versión Promesas
	// [Escribí tu código acá]
	promisifiedReadFile('poema-uno/estrofa-03.txt')
		.then((estrofa3) => {
			blue(estrofa3);
			return promisifiedReadFile('poema-uno/wrong-file-name.txt');
		})
		.then((estrofa4) => {
			blue(estrofa4);
			console.log(done);
		})
		.catch((err) => magenta(err));
}

function problemaF() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. Leé y logueá, en versión Promesas, el poema-uno, estrofa-tres.
   * Luego, leé y logueá la estrofa-cuatro o un error (si llegara a ocurrir) para cualquiera de las lecturas.
   * *Recordá*: Siempre logueá 'done' al finalizar.
   *
   */
  
	// Versión Promesas
	// [Escribí tu código acá]

  promisifiedReadFile("poema-uno/estrofa-03.txt")
    .then((estrofa3) =>{ 
      blue(estrofa3)
      return promisifiedReadFile("poema-uno/wrong-file-name.txt");
    })
    .then(estrofa4 => blue(estrofa4))
    .catch((err) => magenta(err))
    .then(()=> console.log("done"))
}
