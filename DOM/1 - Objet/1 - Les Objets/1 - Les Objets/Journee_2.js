"use strict";
var emplacementMemoire; // undefined

// type de donnée primitif
var emplacementMemoire=10;
var emplacementMemoire="texte";
var emplacementMemoire=false;

// type de donnée complexe
var emplacementMemoire= function () {};
var emplacementMemoire= {};

// On assigne une référence pour les complexe

var monNouvelObjet ={
    prop1 : 50,
    prop2 : "texte",
    methode1 : function () {},
}


// exemple fonction constructeur

var Rono = function() {
    this.portes = 5;
    this.couleur = "blanche";
    this.puissance="2CV";
    this.aUnToitOuvrant= true;
    this.estElectrique=false;
    this.joueDeLaMusique = function(){
        alert("Beach Boys !");
    }
}

var v1 = new Rono()
var v3 = new Rono()
var v1 = new Rono()

var Rono = function(peinture) {
    this.portes = 5;
    this.couleur = peinture;
    this.puissance="2CV";
    this.aUnToitOuvrant= true;
    this.estElectrique=false;
    this.joueDeLaMusique = function(){
        alert("Beach Boys !");
    }
}

var v1 = new Rono("blanche")
var v3 = new Rono("noir")
var v1 = new Rono("vert")