var toto;
var titi;
titi = 99;

/** Création d'un objet littéral */
// On utilise les {}
var boite;

boite = {
  toto: "sel", // propriété (c'est à dire une variable dans un objet)
  titi: 100, // propriété (c'est à dire une variable dans un objet)
  tata: function () {}, // méthode (c'est une propriété d'un objet qui contient une fonction)
  tonton: true, // propriété (c'est à dire une variable dans un objet)
  "ceci est un emplacement dans un objet avec @ dans le nom": 1337, // propriété (c'est à dire une variable dans un objet)
  tutu: {
    toto: {
      titi: {
        tutu: "poivre",
        tonton: function () {},
      },
    },
  },
}; // Notation Objet (Littéral) en JavaScript

// Utiliser une variable :
titi + 2; // 101

/** Utiliser une propriété : */
// 2 possibilités pour pointer vers une propriété :
// 1. Avec le .
boite.titi; // 100 - pointe vers la valeur
boite.tata; // function () {} - pointe vers la valeur
boite.tata(); // exécute la fonction
boite.tutu.toto.titi.tutu; // "poivre" - pointe vers la valeur
// boite."ceci est un emplacement dans un objet avec @ dans le nom"; interdit, est contraire aux règles de syntaxe
// boite.ceci est un emplacement dans un objet avec @ dans le nom; interdit, est contraire aux règles de syntaxe
// 2. Avec les []
boite["titi"]; // 100 - pointe vers la valeur
boite["tata"]; // function () {} - pointe vers la valeur
boite["tata"](); // exécute la fonction
boite["ceci est un emplacement dans un objet avec @ dans le nom"]; // 1337 - pointe vers la valeur
boite["tutu"]["toto"]["titi"]["tutu"]; // "poivre" - pointe vers la valeur

// On peut mélanger les 2 syntaxes (même si c'est moche)
boite["tutu"].toto.titi["tutu"]; // "poivre" - pointe vers la valeur

/** Ajouter une propriété ou un méthode à l'intérieur d'un objet :*/
// On peut procéder par assignation directe :
boite.nouvelEmplacement = "Nouvelle valeur";
boite.nouvelleMethode = function () {};
boite["autre Emplacement"] = "Autre Valeur";
/** Supprimer une propriété d'un objet */
// Utilisation du mot-clé delete
delete boite.nouvelEmplacement;

/** Note de référence */
var autreBoite;

// On assigne ce que contient boite à autreBoite
autreBoite = boite;
// On modifie la propriété toto dans autreBoite
autreBoite.toto = "poivre";
// On constate qu'on retrouve cette valeur à partir de boite
boite.toto;
("poivre");
// La variable boite ET la variable autreBoite pointent donc
// toutes les 2 vers le même objet.
// On peut donc en déduire que c'est 2 variable contiennent
// l'adresse de l'objet (on appelle çe une REFERENCE) en mémoire.
// et donc qu'on peut pointer vers des propriétés et des méthodes
// du même objet à partir de ces 2 variable.

// Exemple d'utilisation référence (référence circulaire) :
var capitaine = {
  // Objet qui représente Kirk
  nom: "Kirk",
  prenom: "James Tiberius",
};

var second = {
  // Objet qui représente Spock
  nom: "Spock",
  prenom: "Jean-Michel",
};

var vaisseau = {
  // Objet qui représente l'Enterprise
  nom: "Enterprise",
  equipage: [capitaine, second],
};

capitaine.sonVaisseau = vaisseau;
second.sonVaisseau = vaisseau;

vaisseau.nom; // "Enterprise"
vaisseau.equipage[0].nom; // "Kirk"

// Les références circulaires permettent de pointer sur
// les (sous)objets à l'infini :
// - vaisseau.equipage[0] contient une référence à l'objet représentant Kirk
// - vaisseau.equipage[0].sonVaisseau contient une référence à l'objet représentant l'Enterprise
// - vaisseau.equipage[0].sonVaisseau.equipage[1] contient une référence à l'objet représentant Spock
vaisseau.equipage[0].sonVaisseau.equipage[0].nom; // "Kirk"
vaisseau.equipage[0].sonVaisseau.equipage[1].sonVaisseau.nom; // "Enterprise"

// En conclusion on assigne toujours l'adresse en mémoire d'un objet à une variable.
// On appelle cette adresse une référence. A partir de la variable on pointe vers
// l'objet en utilisant cette référence. L'assignation de la variable à une autre
// variable n'entraîne pas la copie de l'objet mais la copie de la référence.

/** Les méthodes */
// Une méthode est une fonction dans une propriété d'un objet
var voiture;

var maFonction;

voiture = {
  bruit: "Vroooom !",
  coffre: {
    nom: "Rominet",
    miaule: function () {
      //alert("Vrooom !");
      // Ici on a la possibilité d'utilisé le mot-clé this
      this; // référence qui pointe vers l'objet dans lequel se trouve la méthode.
      // this pointe vers l'objet dans lequel on EXECUTE cette méthode
      //alert(this.bruit);
      //alert(this["bruit"]);

      //setTimeout(function () {
      //  alert(this.bruit); // Problème ici, this référence le contexte d'exécution
      // // this est utilisé dans la fonction qui est fournie et exécutée par
      // // le setTimeout. Donc le contexte d'exécution est l'intérieur du
      // // setTimeout. Donc this ne référence pas l'objet qui représente le chat
      // // donc this.bruit ne pointe vers la propriété bruit du chat.
      //
      //}, 1000);
      /**
       * Technique ninja traditionnelle
       */
      //var ceci = this; // On crée une variable dans la méthode miaule qui contient
      // la référence à l'objet dans lequel est exécuté la méthode
      //setTimeout(function () {
      //  // Dans cette fonction on a accès aux variables déclarées plus haut (c.f. portée des variables)
      //  alert(ceci.bruit);
      // // On peut donc utiliser la variable ceci qui contient une référence à l'objet qui correspond au chat.
      //}, 1000);

      /** Technique moderne */
      // On peut utiliser une fonction flèche.
      // Dans le cas de fonctions flèche, this ne référence PAS le contexte d'exécution
      // mais this référence le contexte de DECLARATION.
      setTimeout(() => {
        // Pour une fonction flèche on utilise PAS le mot clé function
        // Ici this référence le contexte de déclaration
        alert(this.bruit);
        // On obtient bien Miaou !
      }, 1000);
    },
  },
};

var gargantua = {
  estomac: "plein",
  mangeDeTout: function (
    unNombre,
    unTexte,
    unBooleen,
    uneFonction,
    unObjet,
    unArray
  ) {
    //...
    // Ici j’exécute la fonction fournie en tant que Quatrième argument
    uneFonction();
  },
  iciJeSuisDansMonObjet: function () {
    // Dans cette méthode, j'utilise le mot clé this
    // pour référence le contexte d'exécution (à savoir l'objet référencé dans la variable gargantua)
    // J'exécute donc la méthode mangeDeTout en lui fournissant les paramètres attendus
    this.mangeDeTout(
      34566,
      "SGDSGS",
      true,
      () => {
        // Le Quatrième paramètre est une function.
        // Je fournis une fonction flèche.
        // Dans cette fonction this référence le contexte de déclaration
        // c'est à dire là ou je l'ai écrite.
        // c'est à dire dans une méthode de l'objet référencé dans la variable gargantua.
        alert(this.estomac);
      },
      {},
      []
    );
  },
};

// J'exécute une méthode de mon objet référencé dans la variable gargantua
gargantua.iciJeSuisDansMonObjet();

var imbrication = {
  niveau: "1",
  methodeNiveau1: function () {
    var uneFonction = () => {
      alert(this.niveau1);
    };
    var unDelai = 1000;
    setTimeout(uneFonction, unDelai);
  },
  sousObjet: {
    niveau: "2",
    methodeNiveau2: function () {
      this;
    },
    sousSousObjet: {
      niveau: "3",
      methodeNiveau3: function () {
        this;
      },
    },
  },
};

imbrication.methodeNiveau1();
