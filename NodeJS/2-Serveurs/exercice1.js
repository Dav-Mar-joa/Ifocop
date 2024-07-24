/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 100.50.25.12
   - Port : 6666

   Donne l'URL : http://100.50.25.12:6666
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide.

  Attention, vous devez pensez à retourner dans l'en-tête de votre réponse HTTP
  le Mime Type correct (pour le HTML, il s'agit du Mime Type text/html)
**/
const fs = require('node:fs');
const moduleHTTP = require('node:http');

const serveurHTTP = moduleHTTP.createServer();
serveurHTTP.on('request', function(objetQuiRepresentLaRequete, objetQuiRepresenteLaReponse) {

  console.log('Requête reçue');
  console.log('URL Recue dans la requête :', objetQuiRepresentLaRequete.url);

  let typeDeContenu = 'text/html';
  let  corpsDeReponseEnOctets = Buffer.from('<!DOCTYPE html><html><head><title>Réponse</title></head><body><h1>Coucou dans le html !! </h1></body></html>');

  objetQuiRepresenteLaReponse.writeHead(200, {
    'Content-Length': corpsDeReponseEnOctets.length, // nombre d'octets que j'envoie au navigateur
    'Content-Type': typeDeContenu, // le type mime de la donnée que j'envoie au navigateur

  });
  objetQuiRepresenteLaReponse.end(corpsDeReponseEnOctets)
})

  // On envoie les en-tête de réponse HTTP
  
serveurHTTP.listen(8888, function(){
  console.log('Serveur démarré et identifié avec le port 8888');
})

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
