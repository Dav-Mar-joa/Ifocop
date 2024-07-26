const mongodb = require('mongodb');
// @voir https://www.mongodb.com/docs/drivers/node/current/

console.log('Connexion à mongodb');
const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/exemple-connexion-nodejs-mongo');
// @voir : https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/
try {
  console.log('Selectionner la base de données');
  const database     = mongoClient.db('exemple-connexion-nodejs-mongo');
  console.log('Selectionner la collection qui nous intéresse')
  const utilisateurs = database.collection('utilisateurs');
  // @voir https://mongodb.github.io/node-mongodb-native/6.8/
  console.log('On effectue une requête find sur la collection');
  const cursor = utilisateurs.find({}, {});
  // @voir: https://mongodb.github.io/node-mongodb-native/6.8/classes/Collection.html#find
  // Exemple de 
  /*
  cursor
    .toArray() // Conversion des resultats en array
    .then((documents) => {
      // L'exécution de la ce callback permet d'afficher l'array de document trouvés
      console.log(documents);
    }).catch((error) => {
      console.log(error)
    });
  */
  utilisateurs.findOne({})
    .then((document) => {
      console.log(document);
    })
    .catch((error) => {
      console.log(error)
    });
  // @voir: https://mongodb.github.io/node-mongodb-native/6.8/classes/Collection.html#findOne

} catch(error) {
  console.log(error);
}