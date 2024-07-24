/**
 *
 */

/**
 * Modularisation sous Node JS
 * - (Par défaut) CommonJS (CJS) basée sur la méthode module.require() et la propriété module.exports
 * - Native ECMAScript Modules (ESM) basée sur les mots-clés du language import et export
 * Dans le cadre de se cours on se limitera essentiellement à CJS (qui est le comportement par défaut)
 **/

// Exemple de modularisation CJS :
/**
 * const valeurDuExports = module.require('./exemple1-module.js');
 */
// La méthode require est référencée dans l'objet global de node
// On peut y accéder directement sans indiquer l'objet module
const valeurDuExports = require('./exemple1-module.js');

console.log(valeurDuExports);

/**
 * Valeur de sortie :
 * {
 *   laValeur1: 'Ceci est une première valeur à exporter',
 *   laFonction1: [Function: fonction1],
 *   laValeurEstVrai1: true
 * }
 */

/**
 * Initialisation d'un projet avec npm
 * - npm init : permet de créer un fichier package.json de méta-données
 *              (informations) à propos du projet. Ce fichier permet
 *              entre autre de faire le suivi des modules complémentaire
 *              que nécessite le projet. Il permet également de définir
 *              des scripts de démarrage du projet ou pour d'autres type
 *              d'opération (à utiliser 1 seule fois pour initialiser
 *              le projet).
 * - npm install : permet d'installer automatiquement les package référencés
 *              dans le fichier package.json ou d'installer manuellement
 *              des packages référencés sur npmjs.com. Par exemple :
 *              -> npm install :
 *                     --> installe les modules indiqués dans le package.json
 *                     --> installe les dépendances indiqués dans le package-lock.json
 *              -> npm install uuid :
 *                     --> Installe le module uuid et ses dépendances
 *                     --> Créé un fichier package-lock.json qui contient
 *                         la liste des dépendances et leurs versions
 *                     --> Mettre à jour le fichier package.json avec
 *                         le nom/version du module uuid installé.
 * Note :
 * - la version de module indiquée dans le package.json respecte
 *   la notation standard semver : https://semver.org/lang/fr/
 * - l'installation créé ou met à jour le dossier <node_modules>.
 * - si le module peut-être utilisé en ligne de commande, le binaire
 *   ou le script exécutable est installé dans le dossier <node_modules/.bin>
 *   On peut exécuter le script adapté à son environnement de travail
 *   en indiquant le chemin absolu vers le script ou en utilisant la commande
 *   compagnon de npm : npx <nom du script>. Par exemple :
 *     -->  npx uuid
 * - le dossier <node_modules> n'a pas besoin d'être copié SI on transfère
 *   le projet sur un autre environnement. npm peut REinstaller les modules
 *   requis en se basant sur le contenu du fichier package-lock.json (si il
 *   est présent) et à défaut du fichier package.json
 * - Pour désinstaller un module : npm remove <nom du module>
 * - Liste des commandes npm : https://docs.npmjs.com/cli/v8/commands/npm
 * - Alternative à npm : yarn, https://yarnpkg.com/
*/

/**
* Sous Node JS on peut utiliser les éléments de syntaxe récent et pris
* en charge issus des dernières spécifications ECMAScript.
* On a (presque) pas de préoccupation de compatibilité entre les plateforme
* concernant l'utilisation du language ECMASScript/JavaScript.
*/

// Exemple de d'élèments de syntaxe dont l'usage est fréquent :
/**
* Mot-clés try, catch, throw
* - bloc try { ... } catch(uneException) { ... } permet d'indiquer un code à
*   exécuter qui est susceptible de planter et le code à exécuter si le code
*   du try plante.
* -le mot clé throw permet de faire planter le code.
*/

// throw "Va voir ailleurs si j'y suis"; le code plantera à cette ligne

try {
 // ici un code qui est susceptible de planter

} catch(uneException) {
 // uneException : généralement ça contient un objet du type Error (un objet
 // natif de JavaScript qui contient la description de l'erreur, le message
 // d'erreur et la trace - la liste des fonctions qui ont été appelées et
 // qui ont aboutie à cette erreur)

 // ici on peut écrire une gestion personnalisée de l'erreur :
 // - Soit on affiche un message d'erreur personnalisé à la place du
 //   du message d'erreur contenu dans uneException
 // - Et/Ou on effectue une opération avant de faire planter le programme
 // - Et/Ou on produit une valeur pard défaut et on laisse le programme
 //   continuer son exécution
 // - Et/Ou on fait planter le code avec le mot clé throw
}

/**
* Retour sur les promesses
*/
const fonctionQuiEffectueUneOperationAsynchrone = function(fonctionDuThen, fonctionDuCatch) {
 // L'écriture dans un fichier est asynchrone. Cette opération se terminera
 // à une date indéterminée après l'exécution du code principal (le temps dépend
 // du volume de données à écrire et des performances générale de la machine).
 require('node:fs').writeFile('./test.txt','exemple', function(eventuelleErreur){
   if (eventuelleErreur) {
     fonctionDuCatch(eventuelleErreur);
   } else {
     fonctionDuThen(desDonnees);
   }
 });
}
// ou alors :
const executeurAsychrone = new Promise(fonctionQuiEffectueUneOperationAsynchrone);

executeurAsychrone.then(function fonction1(unArgument){});

executeurAsychrone.catch(function fonction2(unArgument){})
// Que fait l'exécuteur asynchrone :
// il exécute la fonction fonctionQuiEffectueUneOperationAsynchrone comme suit :
// fonctionQuiEffectueUneOperationAsynchrone(function fonction1(unArgument){},function fonction2(unArgument){});

/** 
* Version sans variable intermédiaire :
new Promise(function(fonctionDuThen, fonctionDuCatch) {
 require('node:fs').writeFile('./test.txt','exemple', function(eventuelleErreur){
   if (eventuelleErreur) {
     fonctionDuCatch(eventuelleErreur);
   } else {
     fonctionDuThen(desDonnees);
   }
 });
})
.then(function fonction1(unArgument){})
.catch(function fonction2(unArgument){})
**/

/**
* Exemple d'opération asynchrone 
*/

//DNS 

//nslookup ifocop.fr

const listeDesServeursDNS = moduleDNS.getServers();

console.log(listeDesServeursDNS);

const aExecuterSuiteAUneReponse =  function(eventuelleErreur, lesAdressesIPv4Obtenues) {
  // Cette fonction est un callback : c'est à dire une fonction exécutée
  // quand une réponse est obtenue dans le futur.
  console.log('Reponse reçue');

}

console.log('Avant d\'envoyer la requête DNS.');

moduleDNS.resolve4('ifocop.fr', aExecuterSuiteAUneReponse); //exécution de la méthode qui effectue une résolution DNS

console.log('Après avoir envoyé la requête DNS.');