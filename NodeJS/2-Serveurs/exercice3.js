/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 1.2.3.4
   - Port : 7777

  Donne l'URL : http://1.2.3.4:7777
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de
  réponse en format HTML obtenu à partir du contenu d'un fichier.

  Vous devez donc créer un fichier HTML valide à coté de votre programme.

  A chaque requête HTTP reçue, vous utiliserez les méthodes asynchrones de
  l'objet FileSystem de Node JS pour lire et obtenir le contenu de votre fichier
  HTML. Puis, vous produirez une réponse HTTP contenant le contenu du fichier
  HTML.
**/
// const nfs = require('node:fs')
const moduleHTTP=require('node:http')
const objetNatifFileSystem = require('node:fs');
const serveurHTTP=moduleHTTP.createServer()
var corpsDeReponseEnOctets= ""

serveurHTTP.on('request', function(objetQuiRepresentLaRequete, objetQuiRepresenteLaReponse) {
  console.log("Serveur lancé")
  console.log('URL Recue dans la requête :', objetQuiRepresentLaRequete.url);

  var codeStatut=200;
  let typeDeContenu = 'text/html';
  var path="./exo3.txt"
  objetNatifFileSystem.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }
   corpsDeReponseEnOctets= Buffer.from(data);
   objetQuiRepresenteLaReponse.writeHead(codeStatut, {
  'Content-Length': corpsDeReponseEnOctets.length, // nombre d'octets que j'envoie au navigateur
  'Content-Type': typeDeContenu, // le type mime de la donnée que j'envoie au navigateur
  })
  objetQuiRepresenteLaReponse.end(corpsDeReponseEnOctets)
  })
})

serveurHTTP.listen(8888, function(){
  console.log('Serveur démarré et identifié avec le port 8888');
})


/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
