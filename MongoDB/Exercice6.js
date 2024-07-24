/* LES RESTAURANTS DE NEW YORK */

// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il se trouve l'executable mongoimport

`mongoimport --db newyork --collection restaurants --file "C:\Users\virtuoworks\Desktop\Mongo\Données\restaurants.json"`

// SE PLACER DANS LA BASE DE DONNEES 'newyork' :
`use newyork`

// QUESTION 1 : COMBIEN Y A-T-IL DE RESTAURANTS DANS LA COLLECTION ?
// mongoimport --db restaurant --collection NY --file "C:\Users\850_G5\Documents\Formation_Dot_Net\Ifocop\MongoDB\restaurants.json"
db.restaurants.count()

// QUESTION 2 : COMMENT TROUVER LES RESTAURANTS QUI SONT SITUES DANS LA RUE "Morris Park Ave" :
db.restaurants.find({"address.street":/Morris Park Ave/gmi})

// QUESTION 2-a : AVEC EN PLUS CEUX QUI SE SITUENT DANS LA RUE "Morris Park Avenue" ?
// Attention ici, bien que l'on souhaite obtenir les restaurants dont l'adresse est Morris Park Avenue
// AINSI QUE ceux dont l'adresse est Morris Park Ave, c'est bien l'opérateur $or qu'il faut utiliser,
// et non pas $and...
db.restaurants.find({$or:[{"address.street":/Morris Park Ave/gmi},{"address.street":/Morris Park Avenue/gmi}]})

// QUESTION 2-b : COMMENT RETROUVER CES DEUX RESULTATS EN UTILISANT SIMPLEMENT UNE REGEXP (ET EVENTUELLEMENT LES ORTHOGRAPHES ALTERNATIVES EN MINUSCULES VIA LE FLAG "i" (insensitive)) ?



// QUESTION 3 : COMMENT AFFICHER UNIQUEMENT (SANS "_id") LES CHAMPS "borough", "cuisine" et "address" ?
db.restaurants.find({},{borough:1,cuisine:1,address:1,_id:0})

// QUESTION 4 : COMMENT TROUVER LA LISTE DES RESTAURANTS SITUES A "Staten Island" ET QUI FONT DES "hamburgers" OU de la "bakery" ?
// QUESTION 4-a : AVEC L'OPERATEUR $or :
db.restaurants.find({$or : [{borough:/Staten Island/i,cuisine:/hamburger/i},{borough:/Staten Island/i,cuisine:/bakery/i}]}).count()

// QUESTION 4-b : AVEC UN $and IMPLICITE :
db.restaurants.find(
    {borough:/Staten Island/i,
    $or:[
        {cuisine:/hamburger/i},
        {cuisine:/bakery/i}
    ]    
    },
    {borough:1,name:1,cuisine:1,_id:0}
)


// QUESTION 4-c : AVEC L'OPERATEUR $in :

db.restaurants.find(
    {
    $or:[
        {cuisine:/hamburger/i},
        {cuisine:/bakery/i}
    ],
    borough:{ $in:[/Staten Island/i]}    
    },
    {borough:1,name:1,cuisine:1,_id:0}
)


// QUESTION 5 : COMMENT PARCOURIR UN CURSEUR VIA UNE BOUCLE while ?
// On peut ici utiliser la méthode javascript hasNext() qui permet de déterminer si le cursor contient
// encore des documents ou non : https://docs.mongodb.com/manual/reference/method/cursor.hasNext/

const allRestaurants=db.restaurants.find().limit(50)
while (allRestaurants.hasNext()) {
    printjson(allRestaurants.next());
 }


// QUESTION 6 : COMMENT PARCOURIR UN CURSEUR VIA UNE BOUCLE forEach ?

const allRestaurants2=db.restaurants.find().limit(50)
allRestaurants2.forEach(oneRestaurant=>{
    print(oneRestaurant.name)
})


// QUESTION 7 : QUEL EST LE TYPE DE RESTAURANT LE PLUS REPRESENTE ?
// Vous pouvez le faire en vanillaJS

const allRestaurants3=db.restaurants.find()
const cuisines=[]
var cuisineTest=""
allRestaurants3.forEach(oneRestaurant=>{
    cuisineTest=oneRestaurant.cuisine
    if(cuisines.indexOf(cuisineTest)==-1)
        cuisines.push(cuisineTest)   
}) 
print(cuisines)

let nbRestaurants=0
let cuisineMax=""

cuisines.forEach(oneCuisine => {
    if (db.restaurants.countDocuments({cuisine:oneCuisine})> nbRestaurants){
        nbRestaurants=db.restaurants.countDocuments({cuisine:oneCuisine});
        cuisineMax = oneCuisine
    }
})

print(cuisineMax + " - " + nbRestaurants)


db.restaurants.aggregate([
    {$match : {}},
    {$group : {_id : "$cuisine",nbResto : {$sum : 1}}},
    {$sort : { nbResto : -1}},
    {$limit : 1}

])

