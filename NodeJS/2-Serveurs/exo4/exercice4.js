/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 31.42.53.64
   - Port : 5555
   - Ressource : /accueil

  Donne l'URL : http://31.42.53.64:5555/home
**/

/**
  Exercices :

  1.
  Créez deux fichiers HTML valides : home.html et about.html

  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP
  - le contenu du fichier home.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /accueil
  - le contenu du fichier about.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /apropos
**/

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const myServer = http.createServer();

myServer.on('request', (requestHTTP, responseHTTP) => {
  let contentType = 'text/html';
  let responseOctets;
  let code = 200;

  // Détermine le chemin du fichier à servir en fonction de l'URL
  let filePath;
  switch(requestHTTP.url) {
    case '/index':
      filePath = './index.html';
      break;
    case '/accueil':
      filePath = './home.html';
      break;
    case '/apropos':
      filePath = './about.html';
      break;
    default:
      filePath = './404.html';
      code = 404;
  }

  // Résolution du chemin absolu du fichier
  const fullPath = path.resolve(__dirname, filePath);

  try {
    responseOctets = fs.readFileSync(fullPath);
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    responseHTTP.writeHead(500, {'Content-Type': 'text/plain'});
    responseHTTP.end('Erreur serveur');
    return;
  }

  // Envoie la réponse HTTP
  responseHTTP.writeHead(code, {
    'Content-Length': responseOctets.length,
    'Content-Type': contentType,
  });
  responseHTTP.end(responseOctets);
});

myServer.listen(8888, () => {
  console.log('It\'s alive! ALIVE!');
});


/**
  Exercices :

  2. Créez un fichier HTML valide : 404.html

  Votre serveur HTTP doit retourner dans sa réponse HTTP le contenu du fichier
  404.html si l'URL utilisé pour effectuer la requête HTTP ne contient pas la
  ressource /accueil ou /apropos.

  N'oubliez pas de préciser le code 404 dans les en-têtes de la réponse HTTP.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
