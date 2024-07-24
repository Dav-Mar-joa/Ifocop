// Mise à jour -> update

// REVENIR SUR LA BASE DE DONNEES "newyork"
`use newyork`

// QUESTION 1 : COMMENT MODIFIER LES RESTAURANTS DONT LA CUISINE EST "hamburger" POUR LEUR AJOUTER UN CHAMP "healthy_food" ayant pour valeur 2 ?

db.restaurants.updateMany(
    {cuisine:/Hamburgers/i},
    {
        $set:{healthy_food:2}
    }
    ,
    { upsert: true }
)

// QUESTION 2 : COMMENT DEFINIR LE CHAMP "healthy_food" A 9 POUR LES RESTAURANTS VEGETARIENS (vegetarian) ?

db.restaurants.updateMany(
    {cuisine:/vegetarian/i},
    {
        $set:{healthy_food:9}
    }
)
// QUESTION 3 : COMMENT VERIFIER QUE TOUS LES RESTAURANTS ONT BIEN UN TABLEAU "grades" ?

const total = db.restaurants.find().count()
//const nbGrades = db.restaurants.find({ grades: { $exists: true } }).count()
const nbGrades = db.restaurants.find({ grades: { $type: 4 } }).count()

if(total === nbGrades){print(" Tous les resto ont des grades")}
else {print(" Tous les resto n'ont pas tous des grades")}

// QUESTION 4: COMMENT SUPPRIMER LE CHAMP "building" DES RESTAURANTS SITUES DANS LE "Bronx" ET AJOUTER UN BOOLEEN A true ?
db.restaurants.updateMany(
    {borough:/bronx/i},
    {
        $unset:{"address.building":""},
        $set:{BOOLEEN:true}
    }
)
// VERIFIER QUE LE CHAMP "building" N'EST PLUS PRESENT ET QUE VOTRE BOOLEEN EST BIEN PRESENT ET A true...

const nbBuilding = db.restaurants.find({building:{$exists:true}}).count()
//const nbBOOLEEN = db.restaurants.find({BOOLEEN:{$exists:true}}).count()
print("nbBuilding"+nbBuilding)
print("nbBOOLEEN "+nbBOOLEEN )
const nbBOOLEEN = db.restaurants.find({BOOLEEN:{$type:4}}).count()

// QUESTION 5 : COMMENT AJOUTER UN CHAMP "rating" A 5 POUR TOUS LES RESTAURANTS ?

db.restaurants.updateMany(
    {},
    {
        $set :{rating:5}
    }
)

// QUESTION 6 : COMMENT MULTIPLIER LE CHAMP "rating" PAR 2 POUR LES RESTAURANTS SITUES DANS LE "Queens" ?

db.restaurants.updateMany(
    {borough:/queens/i},
    {
        $mul: { rating:  2} 

    }
)

// QUESTION 7 : COMMENT TROUVER TOUS LES RESTAURANTS DE "Brooklyn" ?

db.restaurants.find(
    {borough:/Brooklyn/i}
)

// QUESTION 7-a : COMMENT LIMITER LES RESULTATS A 100 ENTREES ?

db.restaurants.find(
    {borough:/Brooklyn/i}
).limit(100)


// QUESTION 7-b : COMMENT APPLIQUER UN count() ?

db.restaurants.find(
    {borough:/Brooklyn/i}
).limit(100).count()

// QUESTION 7-c : COMMENT APPLIQUER UN size() ?

db.restaurants.find(
    {borough:/Brooklyn/i}
)

// QUestion 7-d : QUELLE EST LA DIFFERENCE ENTRE .count() ET .size() ?



// QUESTION 8 : COMMENT AJOUTER UNE ENTREE AU TABLEAU "grades" POUR LE RESTAURANT "Tu-Lu'S Gluten-Free Bakery" ?
const date2=new Date()
db.restaurants.updateOne(
    {name:/Tu-Lu'S Gluten-Free Bakery/i},
    {
    $push:{grades: {
        date : date2,
        grade:'D',
        score:15
    }}
    }
)

// VERIFIER QUE L'AJOUT A ETE REUSSI...
    

// QUESTION 9 : COMMENT MODIFIER LE CHAMP "rating" POUR TOUS LES DOCUMENTS POUR QU'IL SOIT EGAL A LA MOYENNE ARITHMETIQUE DES GRADES ?
// indice : créer un curseur et le manipuler avec une boucle forEach.

const allRestaurants3=db.restaurants.find()

allRestaurants3.forEach(oneRestaurant=>{
    // print(oneRestaurant.name)
    var sum=0
    var compteur=0
    var ratingNote=0
    oneRestaurant.grades.forEach(grade=>{
        // print(grade.score)
        sum+=grade.score
        compteur++
    })
    ratingNote=sum/compteur
    // print("sum"+sum)
    // print("compteur"+compteur)
    // print("ratingNote"+ratingNote)
    db.restaurants.updateOne(
        {_id:oneRestaurant._id},
    
        {$set:{rating: ratingNote}
        }
    )

    })

    db.restaurants.find(
       
    )

// VERIFIER...

// QUESTION 10 : QUEL EST LE RESTAURANT QUI A LA MEILLEURE MOYENNE ?

db.restaurants.find({},{grades:1,name:1,rating:1,_id:0}).sort({rating:-1}).limit(1)
    
