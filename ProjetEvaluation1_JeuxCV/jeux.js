
import variables from './variables.js';
console.log(variables)
import qSelectors from './qSelectors.js';
window.addEventListener('DOMContentLoaded', () => {
let seconds = 0;    
    window.onkeydown = function (event) {
      var code = event.keyCode;

    if (code === 13) { 
          debutJeux()
        }  
    // Fonction restart qui rafraichit la page pour recommencer le jeux 

    restartGame()

    // Affichage du titre et lors du clic sur "Règle" affichcage des règles à la place (toggle) 

    affichageDesRegles()

    // Premiertableau avec les data à afficher 

    conditionInitales()

    // Second tableau avec les data à afficher + changement de la couleur des oiseaux 

    conditionLevel2()

    // Troisième tableau avec les data à afficher 

    conditionLevel3()

      switch (code) {
        case 37: // gauche
          moveLeft(qSelectors.dplImage, qSelectors.dplImageGlobal);
          break;
        case 39: // droite
          moveRight(qSelectors.dplImage, qSelectors.dplImageGlobal);
          break;
        case 32: // saut barre espace
          jump(qSelectors.dplImageGlobal, qSelectors.dplImage);
        case 38: // saut touche du haut
          jump2(qSelectors.dplImageGlobal, qSelectors.dplImage);
          break;
      }

    collison()

    };

    function debutJeux () {
      qSelectors.game.addEventListener("click", function () {
        qSelectors.startingIndex.style.display = "none";

        var timer = setInterval(function() {
          seconds++;
          if(seconds<60){
            document.getElementById('timer').innerText = "Temps : " + seconds + " sec";
          }
          else{
            let minutes = Math.floor(seconds / 60);
            let secondsBis = seconds % 60;
            document.getElementById('timer').innerText = "Temps : " +minutes+" min "+ secondsBis + " sec";
          }
      }, 1000);
    // Génération des coordonnées X et Y des itmes à afficher avc intervalle toutes les 2sc
              setInterval(itemVisible, 2000);
        });
    }

    function restartGame (){
      qSelectors.restart.addEventListener("click",function () {
            location.reload();
        })
    }

    function conditionInitales(){
      qSelectors.dplImageGlobal.style.top = 0.49 * variables.hauteurEcran + "px";
    // Premier tableau avec les data à afficher
      qSelectors.fondJeux.src = "./fond/fond_3.png";
      qSelectors.compteurDePoints.innerText = "Nb de skills : " + variables.compteurDeClic;
      qSelectors.compteurDePointsRestant.innerText = "Niveau suivant "+" \u2794"+ " "+variables.level1
      qSelectors.dplImageGlobal.style.bottom = 0.2 * variables.hauteurEcran + "px";
      qSelectors.couleurOiseau.querySelector("img").src = "./sprite/spriteBirdsRed.png";
        qSelectors.couleurOiseau2.querySelector("img").src = "./sprite/spriteBirdsRed.png";
    }

    function conditionLevel2(){
      if (variables.compteurDeClic > variables.level1 && variables.compteurDeClic < variables.level2) {
        qSelectors.compteurDePointsRestant.innerText = "Niveau suivant  : " +variables.level2
        qSelectors.fondJeux.src = "./fond/fond.png";
        qSelectors.couleurOiseau.querySelector("img").src = "./sprite/spriteBirds.png";
        qSelectors.couleurOiseau2.querySelector("img").src = "./sprite/spriteBirds.png";
      }
    }

    function conditionLevel3(){
      
      if (variables.compteurDeClic >= variables.level2) {
        qSelectors.compteurDePointsRestant.innerText = "Niveau suivant  : " +variables.level2Fin
         qSelectors.fondJeux.src = "./fond/fond_2.png"
       ;
          if(variables.backgroundFinishItem==1){
          qSelectors.fondJeux.src = "./fond/backgroundFinish.png";
          qSelectors.fondJeux.style.zIndex=300
          qSelectors.dplImageGlobal.classList.add("masqueInvisible")
          qSelectors.couleurOiseau.classList.add("masqueOiseauInvisible")
          qSelectors.couleurOiseau2.classList.add("masqueOiseauInvisible")
          qSelectors.compteurDePoints.classList.add("compteurDePointsInvisible")

          qSelectors.itemsCompetences.style.display="block"
          document.querySelector("#titreCompetences").classList.add("titreCompetencesVisible");
          
        }
        qSelectors.fondJeux.style.transform = "scaleX(-1)";
    //Arrivé a un stade de points affiche du chaudron final 
        if(variables.compteurDeClic>variables.level2Fin){
          qSelectors.dplImageGlobalChaudron.classList.add("masqueChaudronVisible")
        }
        
        var dplGlobalPourcentage = Math.round(
          (variables.dplXGlobal / variables.largeurEcran) * 100
        );

    // Determination des conditions limites en Y en fonction de la postions du personnage

        if (qSelectors.dplImage.style.transform == "") {

          if (dplGlobalPourcentage > -50 && dplGlobalPourcentage < 22) {
            qSelectors.dplImageGlobal.style.top = 0.25 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 22 && dplGlobalPourcentage < 55) {
            qSelectors.dplImageGlobal.style.top = 0.41 * variables.hauteurEcran + "px";
          }

          if (dplGlobalPourcentage >= 55 && dplGlobalPourcentage < 95 ) {
            qSelectors.dplImageGlobal.style.top = 0.62 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 90 && dplGlobalPourcentage < 120 ) {
            qSelectors.dplImageGlobal.style.top = 0.25 * variables.hauteurEcran + "px";
          }
        } else {

          if (dplGlobalPourcentage > -50 && dplGlobalPourcentage < 25) {
            qSelectors.dplImageGlobal.style.top = 0.25 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 25 && dplGlobalPourcentage < 58) {
            qSelectors.dplImageGlobal.style.top = 0.41 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 60 && dplGlobalPourcentage < 110) {
            qSelectors.dplImageGlobal.style.top = 0.62 * variables.hauteurEcran + "px";
          }
        }
      }
    }
    
    function collison(){
      for (var i = 0; i < variables.objetCollision.length; i++) {
        checkCollision(qSelectors.dplImageGlobal,
          document.querySelector(variables.objetCollision[i]));
        }

      checkCollision2(qSelectors.dplImageGlobal,qSelectors.dplImageGlobalChaudron);
    }

    // En dehors de la zone oneClick sinon on garde en mémoire le nombre n de touche appuyée sur le clavier puis il ouvre n fois le CV après avant appuyé sur le boutton CV
    var cv = document.querySelector("#CV");
      cv.addEventListener("click", function () {
        var linkedInUrl="https://www.linkedin.com/in/david-joaquim-martins/"
        window.open(linkedInUrl, "_blank");
        var pdfUrl = "./CV/DavidMartinsCV.pdf";
        window.open(pdfUrl, "_blank");
        
      });

      var cv2 = document.querySelector("#CV2");
      cv2.addEventListener("click", function () {
        var linkedInUrl="https://www.linkedin.com/in/david-joaquim-martins/"
        window.open(linkedInUrl, "_blank");
        var pdfUrl = "./CV/DavidMartinsCV.pdf";
        window.open(pdfUrl, "_blank");
        
      });

    // Affichage du titre et lors du clic sur "Règle" affichcage des règles à la place (toggle) 

    function affichageDesRegles(){
      var rules = document.querySelector("#rules");
      rules.addEventListener("click", function () {
        var titre = document.querySelector(".imageIndexPerso")
        var titreDisplay = window.getComputedStyle(titre).getPropertyValue('display');
        var regle = document.querySelector(".indexRules")
        var regleDisplay = window.getComputedStyle(regle).getPropertyValue('display');

        if(titreDisplay=="none"){
              titre.style.display="flex"
        }
        else{
              titre.style.display="none"
        }

        if(regleDisplay=="none"){
              regle.style.display="block"
        }
        else{
              regle.style.display="none"
        }
          
      });
    }

    // Fonction d'affichage "ramdom" des items + "ramdom" position en X et "ramdom" position en Y

    function itemVisible(){
      var itemApparent = Math.floor(Math.random()*variables.objetCollision.length)
      var objetASaisir=document.querySelector(variables.objetCollision[itemApparent])

      var top = Math.round(Math.random()*variables.hauteurEcran*0.7)
      var left= Math.round(Math.random()*variables.largeurEcran -0.1*variables.largeurEcran)
  
      objetASaisir.style.top = top + 'px';
      objetASaisir.style.left = left + 'px';
    
      if(variables.compteurDeClic<variables.level2Fin){
       objetASaisir.style.display="block"
        setTimeout(() => {
        objetASaisir.style.display="none"
        }, 4000); 
      }
      else{
        objetASaisir.style.display="none"
      }
        
      }

    //  Fonction sprite pour l'item final après obtention d'un nimbre de points définis pour finir la partie
    function moveChaudron() {
      variables.dplXGlobalGlobal = 800;
      variables.dplXGlobalChaudron += variables.vitesseChaudron;
      variables.dplXChaudron -= 180;
      qSelectors.dplImageGlobalChaudron.style.transition = "top 0.5s linear";

    //  Appliquer les positions mises à jour aux éléments
      qSelectors.dplImageChaudron.style.left = variables.dplXChaudron + "px";
      qSelectors.dplImageGlobalChaudron.style.right = variables.dplXGlobalChaudron + "px";

      if (variables.dplXChaudron <= -620) {
        variables.dplXChaudron = 0;
      }
    }

    // évolution continue du sprite 

    setInterval(moveChaudron, 80);

    // fonction mouvement de gauche   

    function moveLeft(dplImage, dplImageGlobal) {
      dplImage.style.transform = "scaleX(-1)";
      variables.dplXGlobal -= variables.vitesse;
      variables.dplX -= 233;
      dplImage.style.left = variables.dplX + "px";
      dplImageGlobal.style.left = variables.dplXGlobal + "px";

      if (variables.dplX < -1250) {
        variables.dplX = 0;
        dplImage.style.left = variables.dplX + "px";
      }

    // Si dépacement du de la largeur de l'écran -*> personnage arrive coté droit avec une constante d'ajustement

      if (variables.dplXGlobal < 0) {
        variables.dplXGlobal = variables.largeurEcran * variables.constanteAjustementLargeurEcran;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }
    }

    // Fonction pour créer une entrée pour gérer un mouvement aléatoire droite  / gauche de l'oiseau 1 

    function changeDirection() {
      variables.direction = Math.floor(Math.random() * 100);
    }

    // Génération toute les 2sc de l'entrée pourle mouvement droite / gauche de l'oiseau 1
    setInterval(changeDirection, 2000);

    // Fonction pour créer une entrée pour gérer un mouvement aléatoire haut / constant / bas de l'oiseau 1 

    function changeHauteur() {
      variables.hauteur = Math.floor(Math.random() * 10);
    }
    // Génération toute les 0.5 sc de l'entrée pour le mouvement haut / constant / bas de l'oiseau 1  
    setInterval(changeHauteur, 500);

    // Fonction du mouveau du sprite oiseau ( avec mouvement aléatoire haut -> bas et inversement + droite / gauche)  

    function moveOiseau() {
 
      if (variables.direction % 2 == 0) {
        qSelectors.dplImageOiseau.style.transform = "";
        variables.dplXGlobalOiseau += variables.vitesseOiseau;
        variables.dplXOiseau -= 156;
      } else {
        qSelectors.dplImageOiseau.style.transform = "scaleX(-1)";
        variables.dplXGlobalOiseau -= variables.vitesseOiseau;
        variables.dplXOiseau -= 159;
      }

      if (variables.hauteur < 4) {
        if (parseFloat(qSelectors.dplImageGlobalOiseau.style.top) > 150) {
          qSelectors.dplImageGlobalOiseau.style.top =
            parseFloat(qSelectors.dplImageGlobalOiseau.style.top || "0") -
            0.2 * variables.hauteurEcran +
            "px";
        } else {
          qSelectors.dplImageGlobalOiseau.style.top =
            parseFloat(qSelectors.dplImageGlobalOiseau.style.top || "0") +
            0.01 * variables.hauteurEcran +
            "px";
        }
      }
      if (variables.hauteur >= 4 && variables.hauteur < 7) {
      }
      if (variables.hauteur > 9) {
        qSelectors.dplImageGlobalOiseau.style.top =
          parseFloat(qSelectors.dplImageGlobalOiseau.style.top || "0") - 0.01 * variables.hauteurEcran +"px";

      }

      qSelectors.dplImageGlobalOiseau.style.transition = "top 0.5s linear";
      qSelectors.dplImageOiseau.style.left = variables.dplXOiseau + "px";
      qSelectors.dplImageGlobalOiseau.style.left = variables.dplXGlobalOiseau + "px";

      if (variables.dplXOiseau <= -950) {
        variables.dplXOiseau = 0;
      }

      if (
        variables.dplXGlobalOiseau >
        variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau
      ) {
        variables.dplXGlobalOiseau = 0;
        qSelectors.dplImageGlobalOiseau.style.left = variables.dplXGlobalOiseau + "px";
      }

      if (variables.dplXGlobalOiseau < 0) {
        variables.dplXGlobalOiseau =
          variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau;
        qSelectors.dplImageGlobalOiseau.style.right = variables.dplXGlobalOiseau + "px";
      }
    }
    setInterval(moveOiseau, 80);

    function moveOiseau2() {

      if (variables.direction2 % 2 == 0) {
        qSelectors.dplImageOiseau2.style.transform = "";
        variables.dplXGlobalOiseau2 += variables.vitesseOiseau2;
        variables.dplXOiseau2 -= 156;
      } else {
        qSelectors.dplImageOiseau2.style.transform = "scaleX(-1)";
        variables.dplXGlobalOiseau2 -= variables.vitesseOiseau2;
        variables.dplXOiseau2 -= 159;
      }

      if (variables.hauteur2 < 4) {
        if (parseFloat(qSelectors.dplImageGlobalOiseau2.style.top) > 250) {
          qSelectors.dplImageGlobalOiseau2.style.top =
            parseFloat(qSelectors.dplImageGlobalOiseau2.style.top || "0") -
            0.1 * variables.hauteurEcran +
            "px";
        } else {
          qSelectors.dplImageGlobalOiseau2.style.top =
            parseFloat(qSelectors.dplImageGlobalOiseau2.style.top || "0") +
            0.01 * variables.hauteurEcran +
            "px";
        }
      }
      if (variables.hauteur2 >= 4 && variables.hauteur2 < 7) {
      }
      if (variables.hauteur2 > 9) {
        qSelectors.dplImageGlobalOiseau2.style.top =
          parseFloat(qSelectors.dplImageGlobalOiseau2.style.top || "0") -
          0.01 * variables.hauteurEcran +
          "px";
      }

      qSelectors.dplImageGlobalOiseau2.style.transition = "top 0.5s linear";

      qSelectors.dplImageOiseau2.style.left = variables.dplXOiseau2 + "px";
      qSelectors.dplImageGlobalOiseau2.style.left = variables.dplXGlobalOiseau2 + "px";

      if (variables.dplXOiseau2 <= -950) {
        variables.dplXOiseau2 = 0;
      }

      if (
        variables.dplXGlobalOiseau2 >
        variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau
      ) {
        variables.dplXGlobalOiseau2 = 0;
        qSelectors.dplImageGlobalOiseau2.style.left = variables.dplXGlobalOiseau2 + "px";
      }

      if (variables.dplXGlobalOiseau2 < 0) {
        variables.dplXGlobalOiseau2 =
          variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau;
        qSelectors.dplImageGlobalOiseau2.style.right = variables.dplXGlobalOiseau2 + "px";
      }
    }
    function changeDirection2() {
      variables.direction2 = Math.floor(Math.random() * 100);
    }
    setInterval(changeDirection2, 3000);

    function changeHauteur2() {
      variables.hauteur2 = Math.floor(Math.random() * 10);
    }
    setInterval(changeHauteur2, 500);

    setInterval(moveOiseau2, 80);

    function moveRight(dplImage, dplImageGlobal) {
      dplImage.style.transform = "";
      variables.dplXGlobal += variables.vitesse;
      variables.dplX -= 233;
      dplImage.style.left = variables.dplX + "px";
      dplImageGlobal.style.left = variables.dplXGlobal + "px";

      if (variables.dplX < -1300) {
        variables.dplX = 0;
        dplImage.style.left = variables.dplX + "px";
      }

      if (variables.dplXGlobal > variables.largeurEcran * variables.constanteAjustementLargeurEcran) {
        variables.dplXGlobal = 0;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }
    }
  
    function jump(dplImageGlobal, dplImage) {
      var rect = dplImageGlobal.getBoundingClientRect();
      var dplImage = document.querySelector("#image");
      var initialTop = rect.top;
      const initialTop2 = initialTop;
      // var jumpHeight = 600;
      var jumpHeight = 450;
      var finalTop = initialTop2 - jumpHeight;

      if (!variables.isJumping) {
        variables.isJumping = true

      dplImageGlobal.style.top = finalTop + "px";
      if (dplImage.style.transform == "scaleX(-1)") {
        variables.dplXGlobal -= 8 * variables.vitesse;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";

        if (variables.dplXGlobal < 0) {
        variables.dplXGlobal = variables.largeurEcran * variables.constanteAjustementLargeurEcran;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }

      }
      if (dplImage.style.transform == "") {
        variables.dplXGlobal += 8 * variables.vitesse;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";

        if (variables.dplXGlobal > variables.largeurEcran * variables.constanteAjustementLargeurEcran) {
        variables.dplXGlobal = 0;
        // dplImageGlobal.style.top = "100px";
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }

      }
      setTimeout(function () {
        dplImageGlobal.style.top = initialTop2 + "px";
        variables.isJumping=false
      }, 400);
    }
      // dplImageGlobal.style.top = initialTop2 + "px";
    }

    function jump2(dplImageGlobal) {
      var rect = dplImageGlobal.getBoundingClientRect();
      const initialTop = rect.top;

      var jumpHeight = 200;
      var finalTop = initialTop - jumpHeight;
      if (!variables.isJumping) {
        variables.isJumping = true;
        dplImageGlobal.style.top = finalTop + "px";
        setTimeout(function () {
          dplImageGlobal.style.top = initialTop + "px";
          variables.isJumping = false;
        }, 300);
      }
    }

    function checkCollision(dplImageGlobal, dplImageX) {
      var rect1 = dplImageGlobal.getBoundingClientRect();
      var rect2 = dplImageX.getBoundingClientRect();

      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top + 80 < rect2.bottom &&
        rect1.bottom > rect2.top
      ) 

      // Compteurs des points en fonction de la collision du personnage avec  l'Id + sons  
      
      {
        dplImageX.style.display = "none";
        if(dplImageX.id=="CoinsA" || dplImageX.id=="CoinsC"|| dplImageX.id=="CoinsD"){
          variables.compteurDeClic += 1;
          var coinsSound=document.getElementById("Points-music")
          coinsSound.play()
        }

        if(dplImageX.id=="sword" || dplImageX.id=="fireBall"){
          variables.compteurDeClic += 10;
          var swordSound=document.getElementById("Points-music")
          swordSound.play()
        }

        if(dplImageX.id=="magicPotions" ){
          variables.compteurDeClic += 100;
          var magicPotionsSound=document.getElementById("Points-music")
          magicPotionsSound.play()
        }

        if(dplImageX.id=="bouclier" || dplImageX.id=="papyrus2"){
          variables.compteurDeClic += 25;
          var bouclierSound=document.getElementById("Points-music")
          bouclierSound.play()
        }
        
        if(dplImageX.id=="CoinsB" || dplImageX.id=="CoinsB1")
      {
        variables.compteurDeClic=0
        setTimeout(() => {

      // Modification du visuel "compteurs de points " avec collision avec les 2 items " remise a zéros des points"

          qSelectors.compteurDePoints.style.background="red"
          qSelectors.compteurDePoints.style.color="white"
          qSelectors.compteurDePoints.style.animation="borderPulseButton 0.7s infinite"
          var coinsBSound=document.getElementById("remisZero-music")
          coinsBSound.play()
          
        }, 10);
        
      }
      qSelectors.compteurDePoints.style.background="rgb(210, 217, 202)"
      qSelectors.compteurDePoints.style.color="purple"
      qSelectors.compteurDePoints.style.animation=""
     
      }
    }

    function checkCollision2(dplImageGlobal, dplImageGlobalChaudron) {
      var rect1 = dplImageGlobal.getBoundingClientRect();
      var rect2 = dplImageGlobalChaudron.getBoundingClientRect();

    // Fonction collision avec le chaudron 
     
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top + 80 < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {

      // Après collision avec le chaudron "point final" du jeu --> 
        // Changement du décor + non affichage des oiseaux / nb score / etc ...
        var chaudronSound=document.getElementById("remisZero-music")
        chaudronSound.play()
        qSelectors.dplImageGlobalChaudron.style.display = "none";
        qSelectors.fondJeux.src = "./fond/backgroundFinish.png";
        variables.backgroundFinishItem=1
        dplImageGlobal.style.display="none"
        qSelectors.dplImageGlobalOiseau.style.display="none"
        qSelectors.dplImageGlobalOiseau2.style.display="none"
        qSelectors.compteurDePoints.style.display="none"
        qSelectors.compteurDePointsRestant.style.display="none"
        timer.style.display="none"
        qSelectors.titreCompetences.style.display="flex"
        qSelectors.containerToBeContinue2.style.display = "block";

      // Affichage temporisé des différents items language / méthodologue / etc ...

        setTimeout(() => {
          qSelectors.itemsCompetences.style.display="block"
          
        }, 2000);
        setTimeout(() => {
          qSelectors.javaScript.style.display="block"
        }, 3000);
        setTimeout(() => {
          qSelectors.typeScript.style.display="block"
        }, 4000);
        setTimeout(() => {
          qSelectors.mongoDB.style.display="block"
        }, 5000);


        setTimeout(() => {
          qSelectors.html.style.display="block"
        }, 6000);
        setTimeout(() => {
          qSelectors.css.style.display="block"
        }, 7000);
        setTimeout(() => {
          qSelectors.json.style.display="block"
        }, 8000);


        setTimeout(() => {
          qSelectors.angular.style.display="block"
        }, 9000);
        setTimeout(() => {
          qSelectors.nodeJs.style.display="block"
        }, 10000);
        setTimeout(() => {
          qSelectors.vueJS.style.display="block"
        }, 11000);

        setTimeout(() => {
          qSelectors.jQuery.style.display="block"
        }, 12000);
        setTimeout(() => {
          qSelectors.react.style.display="block"
        }, 13000);
        setTimeout(() => {
          qSelectors.git.style.display="block"
        },14000);

        setTimeout(() => {
          qSelectors.containerToBeContinue.style.display = "block";
        },15000);
       
      }
      
    }
  });