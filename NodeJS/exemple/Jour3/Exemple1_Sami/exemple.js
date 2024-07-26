/**
 * - Comment renvoyer des contenus de fichiers au client ?
 * - Peut-t-on ou non utiliser use strict sur un script Node (à priori non) ?
*/

// Liste des ports à ne pas utiliser pour identifier un logiciel serveur :
// - https://superuser.com/questions/188058/which-ports-are-considered-unsafe-by-chrome
const moduleFS   = require('node:fs');
const moduleURL  = require('node:url');
const moduleHTTP = require('node:http');
const modulePATH   = require('node:path');

const serveurHTTP = moduleHTTP.createServer();


const envoyerReponseHTTP = function(unObjetQuiCorrespondALaResponse, codeStatut, contentLength, contentType, contenuReponse) {
  // Méthode .writeHead permet d'écrire les EN-TETE DE REPONSE HTTP
  unObjetQuiCorrespondALaResponse.writeHead(codeStatut, {
    'Content-Length': contentLength,
    'Content-Type': contentType
  });
  // Méthode .write permet d'écrire le CORPS DE REPONSE HTTP
  unObjetQuiCorrespondALaResponse.write(contenuReponse, () => {
    // Méthode .end permet de COUPER LA CONNEXION TCP/IP
    // (arrêter l'échange avec le client)
    unObjetQuiCorrespondALaResponse.end();
  })
}

const uneFonctionAExecuterEnCasDeRequeteRecues = function(unObjetQuiCorrespondALaRequete, unObjetQuiCorrespondALaResponse){
  console.log('Requête HTTP reçue');
  //unObjetQuiCorrespondALaRequete; // Cet argument contiendra un objet de type http.IncomingMessage
  //unObjetQuiCorrespondALaResponse;// Cet argument contiendra un objet de type http.ServerResponse
  // console.log(unObjetQuiCorrespondALaRequete);

  // Le code qu'on exécute ENTRE LA RECEPTION DE LA REQUETE HTTP et L'ENVOI
  // DE LA REPONSE HTTP s'appelle le MIDDLEWARE (code du milieu)
  let codeStatut     = 200;
  let contentLength  = 0;
  let contentType    = 'text/plain';
  let contenuReponse = '';

  console.log(unObjetQuiCorrespondALaRequete.url);
  /**
  * Un URL est composé de plusieurs parties :
  * Par exemple l'URL http://monnomdedomaine:9999/toto/titi?tonton=tutu&tata=riri#tuytuy
  * Différente parties :
  * - http                   : (obligatoire)c'est le Protocole (http ou https ou on le verra plus tard ws ou wss)
  * - monnomdedomaine        : (obligatoire) c'est l'Hôte (son nom de domaine ou son adresse ip)
  * - 9999                   : (optionnel) c'est le Port (identifiant numérique du serveur, optionnel par défaut c'est 80 en http ou 443 en https)
  * - /toto/titi             : (optionnel) c'est la Resource (par défaut la valeur c'est /)
  * - ?tonton=tutu&tata=riri : (optionnel) c'est le Query String (ce sont des données complémentaire qu'on veut envoyer au serveur)
  * - #tuytuy                : (optionnel) c'est le Fragment (généralement utilisé pour faire référence à un id html sur la page ou pour gérer l'historique de navigation)
  **/
  ///console.log(unObjetQuiCorrespondALaRequete);

  const partieRessourceDeURLSousFormeDeChaineDeCaracteres = unObjetQuiCorrespondALaRequete.url;

  //console.log(partieRessourceDeURLSousFormeDeChaineDeCaracteres); // par exemple /truc?toto=10&tata=titi#tuytuy
  // console.log(unObjetQuiCorrespondALaRequete.headers);
  const hoteEtPortUtilises = unObjetQuiCorrespondALaRequete.headers.host;
  const urlCompletSousFormeDeChaineDeCaracteres = "http://" + hoteEtPortUtilises + partieRessourceDeURLSousFormeDeChaineDeCaracteres; // par exemple http://localhost:1234/truc?toto=10&tata=titi#tuytuy
  // On va utiliser le module URL pour obtenir l'URL sous la forme d'un objet
  // @voir : https://nodejs.org/api/url.html#new-urlinput-base
  const urlSousFormeObjet = new moduleURL.URL(urlCompletSousFormeDeChaineDeCaracteres);
  //console.log(urlSousFormeObjet);


  contenuReponse = Buffer.from(`<html><head></head><body><h1>Erreur 404</h1><p>L'URL demandé (${urlCompletSousFormeDeChaineDeCaracteres}) n'existe pas</p></body></html>`)
  codeStatut     = 404;
  contentLength  = contenuReponse.length;
  contentType    = 'text/html;charset=utf8';

  // Ici je définis la ROUTE / (c'est à dire le code à exécuter pour l'URL /)
  // Si la resource dans l'URL est /
  if ('/' === urlSousFormeObjet.pathname) {
    try {
      // On construit le chemin vers le fichier titi.html
      const cheminVersLeFichierTiti       = `${__dirname}/fichiers/titi.html`;
      const cheminPropreVersLeFichierTiti = modulePATH.normalize(cheminVersLeFichierTiti);
      console.log('Chemin vers le fichier à ouvrir : ', cheminPropreVersLeFichierTiti);
      // On ouvre le fichier au chemin obtenu au dessus
      contenuReponse = moduleFS.readFileSync(cheminPropreVersLeFichierTiti);
      // On a obtenu le contenu du fichier sous forme d'octets
      codeStatut     = 200;
      contentLength  = contenuReponse.length;
    } catch(erreur) {
      console.log(erreur);
      contenuReponse = Buffer.from(`<html><head></head><body><h1>Erreur 500</h1><p>Impossible d'ouvrir le fichier correspondant à l'URL (${urlCompletSousFormeDeChaineDeCaracteres}) demandé</p></body></html>`)
      codeStatut     = 500;
      contentLength  = contenuReponse.length;
    }
  }

    // Ici je définis la ROUTE /tonton/tata (c'est à dire le code à exécuter pour l'URL /tonton/tata)
    // Si la resource dans l'URL est /tonton/tata
    if ('/tonton/tata' === urlSousFormeObjet.pathname) {
      try {
        // On construit le chemin vers le fichier kitten-sitzt-boden-768x512-2.jpeg
        const cheminVersLeFichierImage       = `${__dirname}/fichiers/images/kitten-sitzt-boden-768x512-2.jpeg`;
        const cheminPropreVersLeFichierImage = modulePATH.normalize(cheminVersLeFichierImage);
        console.log('Chemin vers le fichier à ouvrir : ', cheminPropreVersLeFichierImage);
        // On ouvre le fichier au chemin obtenu au dessus
        contenuReponse = moduleFS.readFileSync(cheminPropreVersLeFichierImage);
        // On a obtenu le contenu du fichier sous forme d'octets
        codeStatut     = 200;
        contentLength  = contenuReponse.length;
        contentType    = 'image/jpeg';
      } catch(erreur) {
        console.log(erreur);
        contenuReponse = Buffer.from(`<html><head></head><body><h1>Erreur 500</h1><p>Impossible d'ouvrir le fichier correspondant à l'URL (${urlCompletSousFormeDeChaineDeCaracteres}) demandé</p></body></html>`)
        codeStatut     = 500;
        contentLength  = contenuReponse.length;
      }
    }

    if ('/tonton/tuytuy' === urlSousFormeObjet.pathname) {
      try {
        // On construit le chemin vers le fichier kitten-sitzt-boden-768x512-2.jpeg
        const cheminVersLeFichierModele       = `${__dirname}/fichiers/riri.fifi`;
        const cheminPropreVersLeFichierModele = modulePATH.normalize(cheminVersLeFichierModele);
        console.log('Chemin vers le fichier à ouvrir : ', cheminPropreVersLeFichierModele);
        // On ouvre le fichier au chemin obtenu au dessus
        contenuReponse = moduleFS.readFileSync(cheminPropreVersLeFichierModele);
        const valeurDuPrenomDansURL = urlSousFormeObjet.searchParams.get('prenom');
        const valeurDuNomDansURL = urlSousFormeObjet.searchParams.get('nom');
        const valeurDeAgeDansURL = urlSousFormeObjet.searchParams.get('age');
        if (valeurDuPrenomDansURL && valeurDuNomDansURL && valeurDeAgeDansURL) {
          contenuDeReponseEnTexte = contenuReponse.toString().replace(/@prenom@/g, valeurDuPrenomDansURL);
          contenuDeReponseEnTexte = contenuDeReponseEnTexte.replace(/@nom@/g, valeurDuNomDansURL);
          contenuDeReponseEnTexte = contenuDeReponseEnTexte.replace(/#age#/g, valeurDeAgeDansURL);
          contenuReponse          = Buffer.from(contenuDeReponseEnTexte);
        }
        // On a obtenu le contenu du fichier sous forme d'octets
        codeStatut     = 200;
        contentLength  = contenuReponse.length;
        contentType    = 'text/html;charset=utf8';
      } catch(erreur) {
        console.log(erreur);
        contenuReponse = Buffer.from(`<html><head></head><body><h1>Erreur 500</h1><p>Impossible d'ouvrir le fichier correspondant à l'URL (${urlCompletSousFormeDeChaineDeCaracteres}) demandé</p></body></html>`)
        codeStatut     = 500;
        contentLength  = contenuReponse.length;
      }
    }

    /**
     * Quand on associe un URL à un traitement, par exemple quand j'associe
     * l'URL / au traitement qui permet d'envoyer le contenu du fichier titi.html
     * ou quand j'associe l'URL /tonton/tata au traitement qui permet le contenu
     * du fichier kitten-sitzt-boden-768x512-2.jpeg on dit qu'on définit une
     * ROUTE. Une ROUTE c'est l'association d'un URL avec un traitement spécifique
     * pour cet URL.
     */
    const typesMime = {
      ".html": "text/html;charset=utf8",
      ".webp": "image/webp",
      ".png" : "image/png",
      ".jpg" : "image/jpeg",
      ".jpeg": "image/jpeg",
      ".txt" : "text/plain",
      ".css" : "text/css",
      ".js"  : "application/javascript"
    }
    // Définition un route générique pour toutes les URL qui contiennent un
    // un nom de fichier. Il s'agit de créer un serveur de fichiers statiques
    const cheminVersUnEventuelFichier = `${__dirname}/mondossier/${urlSousFormeObjet.pathname}`
    const cheminPropreVersUnEventuelFichier   = modulePATH.normalize(cheminVersUnEventuelFichier);
    console.log('cheminPropreVersUnEventuelFichier :', cheminPropreVersUnEventuelFichier);
    try {
      contenuReponse = moduleFS.readFileSync(cheminPropreVersUnEventuelFichier);
      // On récupère l'extension en utilisant la méthode .extname() du module path
      const extensionDuFichier = modulePATH.extname(cheminPropreVersUnEventuelFichier);
      // la variable extensionDuFichier contient .html ou .webp ou .jpeg ou .ico ou ...
      if (typesMime[extensionDuFichier]) {
        // si on trouve une propriété qui à pour nom la valeur de l'extension
        // on assigne la valeur de cette propriété à la variable qui est utilisé
        // pour définir le Content-Type
        contentType    = typesMime[extensionDuFichier];
      }
      codeStatut     = 200;
      contentLength  = contenuReponse.length;
    } catch(erreur) {
      console.log(erreur);
    }

    envoyerReponseHTTP(unObjetQuiCorrespondALaResponse, codeStatut, contentLength, contentType, contenuReponse);
}

// On associe à l'évènement 'request' un gestionnaire d'évènement
// - ça veut qu'on associe une fonction à l'évènement 'request'
// - l'évènement 'request' se produit quand le serveur reçoit une requête HTTP
serveurHTTP.on('request', uneFonctionAExecuterEnCasDeRequeteRecues);


// On démarrage le serveur avec la commande : node exemple.js 1234
// On récupère le port (1234) passé en argument de démarrage.

// Lors d'un calcul avec un ou plusieurs || logiques on récupère le
// premier élément vrai (ou équivalent true / truthy)
// Lors d'un calcul avec un ou plusieurs && logiques on récupère le
// premier élément faux (ou équivalent false / falsy)
// Ici on converti le premier argument du programme en nombre.
// Si on obtient NaN (qui falsy), le résultat du calcul NaN || 80 sera 80.
// Sinon si le premier argument est un nombre, le résultat du calcul sera ce
// nombre (par exemple si l'argument est '1234', alors le calcul sera 1234 || 80
// et le résultat sera 1234)
const port = parseInt(process.argv[2]) || 80;
/* Une version verbeuse de code pour être :
let port;
if (isNaN(process.arv[2])) {
  port = 80;
} else {
  port = parseInt(process.arv[2]);
}
*/

serveurHTTP.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

/**
 * J'initialisé mon projet avec "npm init -y" (l'option -y me permet de répondre
 * oui à toutes les question et d'obtenir un fichier package.json avec des
 * valeurs par défaut)
 *
 * J'ai installé avec "npm install --save-dev nodemon" le module nodemon dans
 * les dépendances de développement de mon projet. Ce module surveille le
 * fichier démarré avec "npx nodemon exemple.js" et le recharge en cas de
 * modification.
*/





















