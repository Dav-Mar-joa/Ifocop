const prompt = require('prompt-sync')();

var nombres=[1,2,3,7,11];

// On demande à l'utilisateur à un nombre pour multiplier les différentes entrées du tableau : si il ne fournit pas ce nombre entre 2 et 1000, on repose la question

//avec le nombre foucni, on multiplie chaque indice du tableau et le resultat de chaque opération est placé dans un nouvel ,indice, par exemple [1,2,3,7,11,2,4,6,14,22] puis "1-2-3-7-11-2-4-6-14-77"

let number =0;


while((isNaN(number) || typeof number== "string") || (number<2 ||number>1000)){
    number = parseInt(prompt("Veuillez entrez un nombre : "));
}
console.log( "nombre = " +number)
let originalLength = nombres.length;
for(let i=0;i<originalLength;i++){
    let newNumber=nombres[i]*number;
    console.log("newNumber = "+newNumber)
    nombres.push(newNumber)
}
console.log(nombres)
let assemblage="";
for(let i=0;i<nombres.length;i++){
    assemblage+=nombres[i]
    if(i<nombres.length-1){
        assemblage+=" - "
    }
        
}
console.log(assemblage)
let assemblage2=""

for(var i=0;i<nombres.length;i++){
    var finTexte="";
    if(nombres[i+1]) finTest=" - "
    assemblage2 +=nombres[i] + finTexte
}

console.log("Seconde maniere : " +assemblage2 )



// alert("nombres")






