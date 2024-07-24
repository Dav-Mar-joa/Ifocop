// Utilisation du module FileSystem
// @voir : https://nodejs.org/docs/latest-v20.x/api/fs.html

const objetNatifFileSystem = require('node:fs');

/**
 *  Ecriture ASynchrone
 */
console.log('Ecriture Asynchrone :','Avant de tenter de créer le fichier');

// Le moteur N'ATTEND PAS la fin de l'écriture dans le fichier avant de passer à la suite
objetNatifFileSystem.writeFile(
  './toto.txt', // le chemin vers le fichier à créer
  'Ceci est un texte à mettre dans un fichier', // les données à écrire
  { encoding: 'utf-8'}, // un objet d'options avec ici uniquement l'encodage du texte
  function(peutEtreUneErreur){
    console.log('Ecriture Asynchrone :',"Erreur :", peutEtreUneErreur);
    console.log('Ecriture Asynchrone :',"Fin de l'écriture du fichier");
  }, // une fonction qui SERA exécuté quand l'écriture sera terminée ou en cas d'erreur
);

// Cette instruction est exécutée IMMEDIATEMENT après la précédente
console.log('Ecriture Asynchrone :',`Après l'écriture du fichier`);

/**
 *  Ecriture Synchrone
 */
console.log('Ecriture Synchrone :', 'Avant de tenter de créer le fichier');

// Le moteur ATTEND la fin de l'écriture dans le fichier avant de passer à la suite
const peutEtreUneErreur = objetNatifFileSystem.writeFileSync(
  './toto.txt', // le chemin vers le fichier à créer
  'Ceci est un texte à mettre dans un fichier', // les données à écrire
  { encoding: 'utf-8'}, // un objet d'options avec ici uniquement l'encodage du texte
)

// Ces instructions sont exécutées une fois que la précédente est COMPLETEMENT terminée
console.log('Ecriture Synchrone :',"Erreur :", peutEtreUneErreur);
console.log('Ecriture Synchrone :',"Fin de l'écriture du fichier");

console.log('Ecriture Synchrone :',`Après l'écriture du fichier`);