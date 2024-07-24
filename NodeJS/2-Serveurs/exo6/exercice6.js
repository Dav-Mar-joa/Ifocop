/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.2.1.0
   - Port : 4321
   - Ressource : /ville/paris.html

   Donne l'URL : http://10.2.1.0:4321/ville/paris.html
**/
const fs = require('node:fs');
const http = require('node:http');
const path= require('node:path');
const myServer = http.createServer();
myServer.on('request', function(requestHTTP, responseHTTP) {

  let contentType = '';
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
      // case '/endGame.png':
      // responseOctets = fs.readFileSync('./endGame.png');
      // // texte = responseOctets.toString('utf-8');
      // responseOctets = Buffer.from(responseOctets);
      // console.log(requestHTTP.url)
      // laRequeteExiste = true
      // break;
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

    var extension = path.extname(nouvelleRequette)
    if(extension=="") extension="html"
    switch(extension){
      case '.html' : contentType = 'text/html'; break
      case '.css' : contentType = 'text/css'; break
      case '.js' : contentType = 'application/javascript'; break
      case '.jpeg' : contentType = 'image/jpeg'; break
      case '.jpg' : contentType = 'image/jpeg'; break
      case '.png' : contentType = 'image/png'; break
      case '.pdf' : contentType = 'application/pdf'; break
      case '.gif' : contentType = 'image/gif'; break
      default: contentType = 'application/octet-stream'; // Default case
    }

    responseOctets = fs.readFileSync('.'+requestHTTP.url);
    // texte = responseOctets.toString('utf-8');
    responseOctets = Buffer.from(responseOctets);
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
  console.log('Server port : 8888 -> OK');
});

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Votre serveur HTTP doit gérer différents Mime Types. Vous devez faire en sorte
  que le Mime Type soit conforme à l'extension obtenue à partir de la ressource
  dans l'URL.

  Par exemple :
  - Si l'URL est http://10.2.1.0:4321/photo.jpeg (et que le fichier photo.jpeg
    existe)
  - Alors l'en-tête de la réponse HTTP doit contenir Content-Type : image/jpeg

  Vous devez gérer les Mime Types des formats de fichier suivant :
    css, js, jpeg, png, pdf, gif.

  La liste des Mime Types autorisés est disponible ici :
    http://www.iana.org/assignments/media-types/media-types.xhtml
**/

/**
  2. Utiliser votre serveur HTTP pour "servir" votre projet Front End (sur le
    réseau local).

  Pensez à utiliser l'onglet réseau des outils de développement de votre
  navigateur Internet pour vérifier que vous arrivez bien à télécharger toutes
  les ressources exigées par votre projet.

  Ajoutez la gestion des Mime Types manquants si nécessaire...
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
