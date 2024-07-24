console.log("Ceci est un fichier ecrit en JavaScript")

class voiture  {
    constructor(c,m){
        this.couleur=c,
        this.marque=m}
    }

const voitureMoi = new voiture("rouge","volvo")
console.log(voitureMoi)

const unBufferCorrespondantAunText=Buffer.from("ceci est mon texte")
console.log(unBufferCorrespondantAunText)

module.require('exemple1-module2.js')
module.require('exemple1-module3')