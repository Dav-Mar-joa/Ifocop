// SUPPRESSION DE DOCUMENT(S)

// db.collection.deleteOne(query, options)
// db.collection.deleteMany(query, options)

// IMPORTER LE FICHIER "seas.json"
`mongoimport --db mondial --collection seas --file seas.json`
// mongoimport --db mondial --collection seas --file "C:\Users\850_G5\Documents\Formation_Dot_Net\Ifocop\MongoDB\seas.json"
`use mondial`


// SUPPRESSION DE TOUS LES ENREGISTREMENTS (= TOUS LES DOCUMENTS DANS LA COLLECTION) :
db.seas.deleteMany({})


// IMPORTER A NOUVEAU AVANT DE POURSUIVRE...



// QUESTION 1 : COMMENT SUPPRIMER L'OCEAN ATLANTIQUE ?

db.seas.deleteOne({
    name:/sea-Atlantic/i
})

// QUESTION 2 : COMMENT SUPPRIMER LES MERS BORDANT L'OCEAN ATLANTIQUE ?

db.seas.deleteMany({
    bordering:/atlanti/i
})

// QUESTION 3 : QUELLE EST LA MER LA PLUS PROFONDE ?
var deeptDepth=0
db.seas.find().forEach((oneOcean)=>{
   if(deeptDepth<parseInt(oneOcean.depth)) {
    deeptDepth=oneOcean.depth
   }
})

//


// QUESTION 4 : COMMENT AJOUTER L'ETENDUE D'EAU "Océan Atlantique" ?

db.seas.insert({"secureName": "sea-Atlantic",
    "country": "F E GBZ IS IRL GB P AG BS BDS CDN USA C WD DOM RH WG KN WL WV TT RA BR RCH ROU FGU GUY SME YV RIM MA WSA ANG RCB NAM ZRE BEN WAN RT RSA CI GH CAM GQ G CV RG LB WAG SN GNB WAL NLSM SMAR SBAR STP PR AXA GUAD MART BVIR MNTS VIRG HELX FALK SPMI BERM TUCA SVAX GROX FARX",
    "bordering": "sea-Mittelmeer sea-Channel sea-Irische_See sea-Nordsee sea-NorwegianSea sea-Greenlandsea sea-LabradorSea sea-Golf_von_Mexiko sea-Caribbean sea-Indic",
    "name": "Atlantic Ocean",
    "depth": 9219
    }

)

// QUESTION 5 : COMMENT AJOUTER UN TABLEAU "myArray" A TOUTES LES MERS ?   

db.seas.updateMany(
    {},
    {$set : {myArray:[]}}

)

// QUESTION 6 : QUELLE EST LA PROFONDEUR CUMULEE DE TOUTES LES MERS ?

db.seas.aggregate([
    {
    $group :{
        _id:"plouf",
        prof:{$sum : "$depth"}
    }
}
])
