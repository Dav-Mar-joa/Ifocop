// Importer dans une base us, dans la collection companies le fichier companies.json
`mongoimport --db us --collection companies --file companies.json`
`use us`

// QUESTION 1 : QUELLE EST LA PLUS ANCIENNE SOCIETE DANS CETTE COLLECTION ?



// Ce traitement dépasse la mémoire max autorisée par Mongo, il faut créer un index pour pouvoir la traiter.
// QUESTION 2 : COMMENT CREER UN INDEX SUR LE CHAMP "founded_year" ?



// QUESTION 3 : QUELLE EST LA SOCIETE QUI EMPLOIE LE PLUS DE PERSONNES ?
// CONSIGNE : créez un second index sur "number_of_employees" pour augmenter l'éfficacité des requêtes...



// QUESTION 4 : QUELLE EST LA SOCIETE QUI EMPLOIE LE PLUS DE PERSONNES DANS LE "category_code" "advertising" ?



// QUESTION 5 : QUEL EST L'EFFECTIF CUMULE DES ENTREPRISES DE "category_code" "network_hosting" ?
// On regroupe les documents par networkcompanies et on additionne les valeurs de number_of_employees :


// QUESTION 6 : QUELLE ENTREPRISE EST DIRIGEE PAR "Rich Langdale" ?



// QUESTION 7 ? COMMENT SUPPRIMER LES ENTREPRISES DE "category_code" "finance" (faire une bonne action, en somme...) ?



// QUESTION 8 : COMMENT METTRE A JOUR LES ENTREPRIES DE "advertising" EN LEUR AJOUTANT UN CHAMP "likes" ?



// QUESTION 9 : COMMENT CREER UN INDEX SUR LE CHAMP "name" DE CHAQUE SOCIETE ?



// QUESTION 10 : COMMENT SUPPRIMER L'INDEX QUE L'ON VIENT JUSTE DE CREER SUR LE CHAMP "name" ?



// QUESTION 11 : COMMENT RECREER L'INDEX EN SPECIFIANT QUE LA VALEUR DOIT ETRE UNIQUE ?



// OBSERVATION : cela déclenche une erreur ; mongo ne peut pas créer l'index unique car il y a des doublons dans le nom des entreprises


// QUESTION 12 : COMMENT INSERER UJNE SOCIETE "My Little Company" EN RESPECTANT L'ORGANISATION ACTUELLE DE LA BASE DE DONNEES ?



// QUESTION 13 : COMMENT TROUVER LES SOCIETES QUI ONT UN BUREAU SITUE A MOINS DE 20km DE LA STATUE DE LA LIBERTE ?
// Stocker les coordonnées du premier bureau de chaque entreprise sour la forme d'un objet de type GeoJSON dans une propriété geometry

// "geometry": {
//   "type": "Point",
//     "coordinates": [125.6, 10.1]
// };



// QUESTION 14 : COMMENT AJOUTER UN CHAMP "phone" DANS L'ADRESSE DU PREMIER BUREAU DES SOCIETES SITUEES DANS L'ETAT DE "NY" ?




// QUESTION 15 : COMMENT CREER UNE COLLECTION "awards" PUIS Y CREER QUELQUES RECOMPENSES EN LES RELIANT A UNE SOCIETE EN UTILISANT UNE REFERENCE (au moins 6 récompenses) ?

db.awards.insertMany([
  { "value": 10, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 33, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 12, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 19, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 5, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 189, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 13, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
  { "value": 321, "company_id": ObjectId("52cdef7c4bab8bd675297d8b") },
]);

// QUESTION 16 : COMMENT CREER UNE FONCTION QUI PREND EN PARAMETRE UN "_id" ET QUI CALCULE LA MOYENNE DES AWARDS D'UNE ENTREPRISE ?

