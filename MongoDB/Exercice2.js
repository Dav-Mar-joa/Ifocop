/*Les piscines de Paris */

// Importer nos documents dans une base de données paris, dans une collection, depius le fichier piscines_paris.json
`mongoimport --db <nom_de_la_db> --collection <nom_de_la_collection> --file <chemin/vers/le/fichier/a/importer>`

// Dans mon cas : 
`mongoimport --db paris --collection piscines --file "C:\Users\virtuoworks\Desktop\Cours mongodb\data\piscines_paris.json"`
// Ou si vous vous placez dans le dossier dans lequel vous travaillez, vous pouvez utiliser une adresse relative.
// Dans mon cas :
`mongoimport --db paris --collection piscines --file "./data/piscines_paris.json"`

// Sur PC : il est dans C:\Program Files\MongoDB\Server\5.0\bin
// Sur mac : il est dans /usr/local/opt/mongodb-database-tools/bin/
`show dbs `
`use paris`
`show collections`

// QUESTION 1 : COMMENT COMPTER LE NOMBRE D'ELEMENTS CONTENUS DANS LA COLLECTION PISCINES ?

db.piscines.count()
db.piscines.countDocument()



// QUESTION 1 bis : ET D'UNE MANIERE PLUS CONCISE ? (optionel)


// Intéressons-nous à présent à la méthode find()
// https://docs.mongodb.com/manual/reference/method/db.collection.find/ 

// db.collection.find(query, projection)


// QUESTION 2 : COMMENT FAIRE POUR AFFICHER LA LISTE DES PISCINES DU 11ème ARRONDISSEMENT DE PARIS ?

// mongoimport --db paris --collection piscines --file "C:\Users\850_G5\Documents\Formation_Dot_Net\Ifocop\MongoDB\piscines_paris.json" --jsonArray


/**
 * query: The query in MQL.
 */
db.piscines.find({zipCode: 75011})

// QUESTION 3 : COMMENT FAIRE POUR N'AFFICHER QUE LES NOM ET CODE POSTAL POUR LES PISCINES DU 11ème ARRONDISSEMENT DE PARIS ?
// indice : il faut utiliser le deuxième argument de la méthode find : la projection.

db.piscines.find(
    {zipCode: 75011}, //query
    {name:1,zipCode:1,_id:0} //query
)


// QUESTION 4 : COMMENT FAIRE POUR LIMITER LES RESULTATS A 5 (.limit(<value>)) ?
db.piscines.find({},{name:1,_id:0}).limit(5)


// QUESTION 5 : COMMENT FAIRE POUR TRIER LES RESULTATS PAR NOM PAR ORDRE ALPHABETIQUE (.sort( { "<champ>": <value (1 ou -1)> } )) ?

db.piscines.find({},{_id:0}).sort({name:1})

