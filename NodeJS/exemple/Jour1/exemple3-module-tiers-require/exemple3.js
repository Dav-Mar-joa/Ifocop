/** Comment utiliser npm ?
 *
 * - On doit initialiser un fichier de description de son projet.
 *   Ce fichier a pour nom package.json. Il contient entre autre
 *   le nom du projet, son auteur, etc ainsi que la liste des module
 *   téléchargés de NPM et leurs versions.
 *   Pour créer ce fichier, on utilise la command npm init à la racine
 *   du projet (on ne fait ça qu'une fois en début de projet).
 * - On peut installer des modules avec npm install
 *   @voir https://docs.npmjs.com/cli/v6/commands/npm-install
 *   Par exemple pour installer le module uuid :
 *     npm i uuid
 *   @voir https://www.npmjs.com/package/uuid
 * - Quand un module est installé :
 *    - Le dossier node_modules est automatiquement créé
 *    - Un sous dossier pour le module est automatiquement créé
 *    - Si le module nécessite d'autres modules (dépendances), elle seront
 *      également automatiquement téléchargée et installées dans le dossier
 *      node_modules
 *    - Si le module peut être utilisé en ligne de command, le binaire sera
 *      copié dans le dossier node_modules/.bin
 *        Pour utiliser ce binaire on peut écrire  : ./node_modules/.bin/<nom du binaire>
 *        Ou utiliser l'outil npx compagnon de npm : npx <nom du binaire>
 *    - Le fichier package.json a été mis à jour avec la version de uuid installée
 *      Et un fichier package.json.lock est automatiquement créé ou mis à jour avec
 *      la version de uuid installée est surtout toutes dépendances (les modules)
 *      dont dépend uuid pour fonctionner et leur versions.
 *    - A partir du moment ou on dispose d'un fichier package.json. On peut
 *      utiliser npm install pour réinstaller les modules nécessaires au
 *      fonctionnement du projet.
*/

const leModuleUUID = require('uuid');

const unUUID = leModuleUUID.v4()

console.log('Voici un uuid :', unUUID)