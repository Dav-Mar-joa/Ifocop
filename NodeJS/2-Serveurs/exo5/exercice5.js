/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 168.192.10.168
   - Port : 5678
   - Ressource : /index.html

  Donne l'URL : http://168.192.10.168:5678/index.html
**/

/**
  Exercices :

  1. Créez un serveur HTTP qui retourne dans sa réponse HTTP le contenu du
  fichier dont le nom est le même que celui obtenu à partir de l'URL si ce
  fichier existe.

  Et, si le fichier n'existe pas le serveur HTTP retournera dans sa réponse HTTP
  le contenu du fichier 404.html que vous avez créé pour l'exercice précédent.

  Vous devrez donc reconstruire le chemin qui vous permettra d'ouvrir un fichier
  à partir de la ressource fournie dans l'URL.

  Par exemple, si l'URL est :

  - http://168.192.10.168:5678/html/contact.html (la ressource est donc
    /html/contact.html)

  Le serveur HTTP devra ouvrir et obtenir le contenu du fichier dont le chemin
  système est :
  - c:\diwjs\nodejs\app\html\contact.html (ou c:\diwjs\nodejs\app\ est mon
    dossier de travail)

  Pour obtenir le chemin vers le dossier dans lequel votre serveur s'exécute,
  vous pouvez utiliser l'objet Process vu précédemment. Et pour faire en sorte
  que les slash soient corrects, vous pouvez utiliser le module path de Node JS
  et particulièrement sa méthode .normalize() . Documentée ici :
    https://nodejs.org/api/path.html#path_path_normalize_p
**/

const fs = require('node:fs');
const http = require('node:http');
const path= require('node:path');
const myServer = http.createServer();
myServer.on('request', function(requestHTTP, responseHTTP) {

  let contentType = 'text/html';
  let responseOctets = Buffer.from('');
  let Code = 200;
  let texte = '';
  var nouvelleRequette=""
  var laRequeteExiste = false
  
  switch(requestHTTP.url) {
    case '/index.html':
      responseOctets = fs.readFileSync('./index.html');
      texte = responseOctets.toString('utf-8');
      console.log(requestHTTP.url)
      responseOctets = Buffer.from(texte);
      laRequeteExiste = true
      break;
    case '/accueil.html':
      responseOctets = fs.readFileSync('./home.html');
      texte = responseOctets.toString('utf-8');
      responseOctets = Buffer.from(texte);
      console.log(requestHTTP.url)
      laRequeteExiste = true
      break;
    case '/apropos.html':
      responseOctets = fs.readFileSync('./about.html');
      texte = responseOctets.toString('utf-8');
      responseOctets = Buffer.from(texte);
      console.log(requestHTTP.url)
      laRequeteExiste = true
      break;
    default:
      responseOctets = fs.readFileSync('./404.html');
      texte = responseOctets.toString('utf-8');
      responseOctets = Buffer.from(texte);
      Code = 404;
      console.log(requestHTTP.url)
  }
  if(laRequeteExiste == false){
    console.log("en dehors du switch : "+requestHTTP.url)
    nouvelleRequette = path.join(process.cwd(),requestHTTP.url)
    console.log("nouvelle requete : "+nouvelleRequette)
    nouvelleRequette=path.normalize(nouvelleRequette)
    console.log("nouvelle requete normalisée : "+nouvelleRequette)

    responseOctets = fs.readFileSync('.'+requestHTTP.url);
    texte = responseOctets.toString('utf-8');
    responseOctets = Buffer.from(texte);
    console.log(requestHTTP.url)

  }
  
  responseHTTP.statusCode = Code
  responseHTTP.writeHead(Code, {
    'Content-Length': responseOctets.length,
    'Content-Type': contentType,
  });
  responseHTTP.write(responseOctets, function() {
    responseHTTP.end();
  })
});
myServer.listen(8888, function() {
  console.log('It\'s alive! ALIVE!');
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
