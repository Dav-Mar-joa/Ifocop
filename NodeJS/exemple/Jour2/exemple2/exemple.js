const fs = require('node:fs');
const moduleHTTP = require('node:http');
//@voir : https://nodejs.org/api/http.html

const serveurHTTP = moduleHTTP.createServer();
//@voir : https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

// Ici on peut décider de répondre à une requête HTTP envoyé par un navigateur.
// Pour répondre à une requête on utiliser l'évènement 'request' d'un objet
// de type httpServer.
// .on() est la méthode pour associer un gestionnaire d'évènement à un évènement
// pris en charge par l'objet considéré. @voir : https://nodejs.org/api/http.html#event-request
serveurHTTP.on('request', function(objetQuiRepresentLaRequete, objetQuiRepresenteLaReponse) {
  // Cette fonction est exécuté quand le serveur reçoit une requête HTTP
  console.log('Requête reçue');
  console.log('URL Recue dans la requête :', objetQuiRepresentLaRequete.url);


  let typeDeContenu = 'text/raw';
  let corpsDeReponseEnOctets = Buffer.from('Coucou depuis le maroc.');

  if ( objetQuiRepresentLaRequete.url === '/david' ) {
    corpsDeReponseEnOctets = Buffer.from('Coucou David depuis le maroc.');
  }


  if ( objetQuiRepresentLaRequete.url === '/monsieur/bouboule.jpg' ) {
    corpsDeReponseEnOctets = fs.readFileSync('C:\\Users\\virtuoworks\\Desktop\\images.jpg');
    typeDeContenu = 'image/jpeg'
  }

  if ( objetQuiRepresentLaRequete.url === '/truc/bidule' ) {
    typeDeContenu = 'text/html';
    corpsDeReponseEnOctets = fs.readFileSync('./fichiers/toto.batman');
    let texte = corpsDeReponseEnOctets.toString('utf-8');
    texte = texte.replace('heureDuJour', Date.now());
    corpsDeReponseEnOctets = Buffer.from(texte);
  }

  // On envoie les en-tête de réponse HTTP
  objetQuiRepresenteLaReponse.writeHead(200, {
    'Content-Length': corpsDeReponseEnOctets.length, // nombre d'octets que j'envoie au navigateur
    'Content-Type': typeDeContenu, // le type mime de la donnée que j'envoie au navigateur
  });

  // On envoie le contenu de la réponse HTTP
  objetQuiRepresenteLaReponse.write(corpsDeReponseEnOctets, function(){
    // A la fin de l'envoi du contenu de la réponse HTTP,
    // on termine la connexion :
    objetQuiRepresenteLaReponse.end();
  });
});


serveurHTTP.listen(1234, function(){
  // 1234 est le numéro de port identifiant le serveur
  // fonction à exécuter une fois le serveur démarré
  console.log('Serveur démarré et identifié avec le port 1234');
  // si le port est déjà utilisé, c'est à dire qu'un serveur est DEJA démarré
  // avec ne numéro de port on obtient l'erreur suivante :
  //   Error: listen EADDRINUSE: address already in use :::1234
})
//@voir : https://nodejs.org/api/http.html#serverlisten hérite de la méthode .listen de l'objet natif net
//@voir : https://nodejs.org/api/net.html#serverlisten
