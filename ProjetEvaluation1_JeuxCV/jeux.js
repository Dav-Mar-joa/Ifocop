
import variables from './variables.js';
console.log(variables)
import * as qSelectors from './qSelectors.js';
window.addEventListener('DOMContentLoaded', () => {
    
    window.onkeydown = function (event) {
      var code = event.keyCode;
      if (code === 13) { 
          qSelectors.qSelectors.game.addEventListener("click", function () {
            qSelectors.qSelectors.startingIndex.style.display = "none";
            console.log("cpt clic"+variables.compteurDeClic)
                setInterval(itemVisible, 2000);
          });
        }    

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

      qSelectors.qSelectors.compteurDePoints.innerText = "Nb de skills : " + variables.compteurDeClic;
      qSelectors.qSelectors.dplImageGlobal.style.bottom = 0.2 * variables.hauteurEcran + "px";

      if (variables.compteurDeClic > 200 && variables.compteurDeClic < 300) {
        qSelectors.qSelectors.fondJeux.src = "./fond/fond.png";
        qSelectors.qSelectors.couleurOiseau.querySelector("img").src = "./sprite/spriteBirds.png";
        qSelectors.qSelectors.couleurOiseau2.querySelector("img").src = "./sprite/spriteBirds.png";
      }

      if (variables.compteurDeClic >= 300) {
        qSelectors.qSelectors.fondJeux.src = "./fond/fond_2.png";
          if(variables.backgroundFinishItem==1){
          qSelectors.qSelectors.fondJeux.src = "./fond/backgroundFinish.png";
          console.log("dans la condition de fin")
          qSelectors.qSelectors.fondJeux.style.zIndex=300
          qSelectors.qSelectors.dplImageGlobal.classList.add("masqueInvisible")
          couleurOiseau.classList.add("masqueOiseauInvisible")
          couleurOiseau2.classList.add("masqueOiseauInvisible")
          qSelectors.qSelectors.compteurDePoints.classList.add("compteurDePointsInvisible")

          qSelectors.qSelectors.itemsCompetences.style.display="block"
          document.querySelector("#titreCompetences").classList.add("titreCompetencesVisible");
          
        }
        qSelectors.qSelectors.fondJeux.style.transform = "scaleX(-1)";
        if(variables.compteurDeClic>450){
          qSelectors.qSelectors.dplImageGlobalChaudron.classList.add("masqueChaudronVisible")
        }
        
        var dplGlobalPourcentage = Math.round(
          (variables.dplXGlobal / variables.largeurEcran) * 100
        );

        if (qSelectors.qSelectors.dplImage.style.transform == "") {

          if (dplGlobalPourcentage > -50 && dplGlobalPourcentage < 22) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.3 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 22 && dplGlobalPourcentage < 55) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.45 * variables.hauteurEcran + "px";
          }

          if (dplGlobalPourcentage >= 55 && dplGlobalPourcentage < 95 ) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.68 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 90 && dplGlobalPourcentage < 120 ) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.3 * variables.hauteurEcran + "px";
          }
        } else {

          if (dplGlobalPourcentage > -50 && dplGlobalPourcentage < 25) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.3 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 25 && dplGlobalPourcentage < 58) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.45 * variables.hauteurEcran + "px";
          }
          if (dplGlobalPourcentage >= 60 && dplGlobalPourcentage < 110) {
            qSelectors.qSelectors.dplImageGlobal.style.top = 0.68 * variables.hauteurEcran + "px";
          }
        }
      }

      switch (code) {
        case 37: // gauche
          moveLeft(qSelectors.qSelectors.dplImage, qSelectors.qSelectors.dplImageGlobal);
          break;
        case 39: // droite
          moveRight(qSelectors.qSelectors.dplImage, qSelectors.qSelectors.dplImageGlobal);
          break;
        case 32: // saut barre espace
          jump(qSelectors.qSelectors.dplImageGlobal, qSelectors.qSelectors.dplImage);
        case 38: // saut touche du haut
          jump2(qSelectors.qSelectors.dplImageGlobal, qSelectors.qSelectors.dplImage);
          break;
      }

      for (var i = 0; i < variables.objetCollision.length; i++) {
        checkCollision(qSelectors.qSelectors.dplImageGlobal,
          document.querySelector(variables.objetCollision[i]));
        }

      checkCollision2(qSelectors.qSelectors.dplImageGlobal,qSelectors.qSelectors.dplImageGlobalChaudron);

    };


    // en dehors de la zone oneClick sinon si je garde en mémoire le nombre de touche appuyé sur le clavier puis il ouvre n fois le CV après appuye sur le boutton CV
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

    function itemVisible(){
      var itemApparent = Math.floor(Math.random()*variables.objetCollision.length)
      var objetASaisir=document.querySelector(variables.objetCollision[itemApparent])
      console.log('rrrrrrrrrrrr'+variables.compteurDeClic)
      if(variables.compteurDeClic<450){
       objetASaisir.style.display="block"
        setTimeout(() => {
        objetASaisir.style.display="none"
        }, 4000); 
      }
      else{
        objetASaisir.style.display="none"
      }
        
      }
    function moveChaudron() {
      // var dplImageChaudron = document.querySelector("#imageChaudron");
      // var dplImageGlobalChaudron =
      //   document.querySelector("#containerChaudron");
      variables.dplXGlobalGlobal = 800;
      variables.dplXGlobalChaudron += variables.vitesseChaudron;
      variables.dplXChaudron -= 180;
      qSelectors.qSelectors.dplImageGlobalChaudron.style.transition = "top 0.5s linear";

      // Appliquer les positions mises à jour aux éléments
      qSelectors.qSelectors.dplImageChaudron.style.left = variables.dplXChaudron + "px";
      qSelectors.qSelectors.dplImageGlobalChaudron.style.right = variables.dplXGlobalChaudron + "px";

      // Réinitialisation lorsque l'oiseau sort de l'écran à gauche
      if (variables.dplXChaudron <= -620) {
        variables.dplXChaudron = 0;
      }
    }

    setInterval(moveChaudron, 80);

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

      if (variables.dplXGlobal < 0) {
        variables.dplXGlobal = variables.largeurEcran * variables.constanteAjustementLargeurEcran;
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }
    }

    function changeDirection() {
      variables.direction = Math.floor(Math.random() * 100);
    }
    setInterval(changeDirection, 2000);

    function changeHauteur() {
      variables.hauteur = Math.floor(Math.random() * 10);
    }
    setInterval(changeHauteur, 500);

    function moveOiseau() {
      // var dplImageOiseau = document.querySelector("#imageOiseau");
      // var dplImageGlobalOiseau = document.querySelector("#containerOiseau");

      if (variables.direction % 2 == 0) {
        qSelectors.qSelectors.dplImageOiseau.style.transform = "";
        variables.dplXGlobalOiseau += variables.vitesseOiseau;
        variables.dplXOiseau -= 156;
      } else {
        qSelectors.qSelectors.dplImageOiseau.style.transform = "scaleX(-1)";
        variables.dplXGlobalOiseau -= variables.vitesseOiseau;
        variables.dplXOiseau -= 159;
      }

      if (variables.hauteur < 4) {
        if (parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau.style.top) > 150) {
          qSelectors.qSelectors.dplImageGlobalOiseau.style.top =
            parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau.style.top || "0") -
            0.2 * variables.hauteurEcran +
            "px";
        } else {
          qSelectors.qSelectors.dplImageGlobalOiseau.style.top =
            parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau.style.top || "0") +
            0.01 * variables.hauteurEcran +
            "px";
        }
      }
      if (variables.hauteur >= 4 && variables.hauteur < 7) {
      }
      if (variables.hauteur > 9) {
        qSelectors.qSelectors.dplImageGlobalOiseau.style.top =
          parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau.style.top || "0") - 0.01 * variables.hauteurEcran +"px";

      }

      qSelectors.qSelectors.dplImageGlobalOiseau.style.transition = "top 0.5s linear";
      qSelectors.qSelectors.dplImageOiseau.style.left = variables.dplXOiseau + "px";
      qSelectors.qSelectors.dplImageGlobalOiseau.style.left = variables.dplXGlobalOiseau + "px";

      if (variables.dplXOiseau <= -950) {
        variables.dplXOiseau = 0;
      }

      if (
        variables.dplXGlobalOiseau >
        variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau
      ) {
        variables.dplXGlobalOiseau = 0;
        qSelectors.qSelectors.dplImageGlobalOiseau.style.left = variables.dplXGlobalOiseau + "px";
      }

      if (variables.dplXGlobalOiseau < 0) {
        variables.dplXGlobalOiseau =
          variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau;
        qSelectors.qSelectors.dplImageGlobalOiseau.style.right = variables.dplXGlobalOiseau + "px";
      }
    }
    setInterval(moveOiseau, 80);

    function moveOiseau2() {
      // var dplImageOiseau2 = document.querySelector("#imageOiseau2");
      // var dplImageGlobalOiseau2 =
      //   document.querySelector("#containerOiseau2");

      if (variables.direction2 % 2 == 0) {
        qSelectors.qSelectors.dplImageOiseau2.style.transform = "";
        variables.dplXGlobalOiseau2 += variables.vitesseOiseau2;
        variables.dplXOiseau2 -= 156;
      } else {
        qSelectors.qSelectors.dplImageOiseau2.style.transform = "scaleX(-1)";
        variables.dplXGlobalOiseau2 -= variables.vitesseOiseau2;
        variables.dplXOiseau2 -= 159;
      }

      if (variables.hauteur2 < 4) {
        if (parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau2.style.top) > 250) {
          qSelectors.qSelectors.dplImageGlobalOiseau2.style.top =
            parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau2.style.top || "0") -
            0.1 * variables.hauteurEcran +
            "px";
        } else {
          qSelectors.qSelectors.dplImageGlobalOiseau2.style.top =
            parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau2.style.top || "0") +
            0.01 * variables.hauteurEcran +
            "px";
        }
      }
      if (variables.hauteur2 >= 4 && variables.hauteur2 < 7) {
      }
      if (variables.hauteur2 > 9) {
        qSelectors.qSelectors.dplImageGlobalOiseau2.style.top =
          parseFloat(qSelectors.qSelectors.dplImageGlobalOiseau2.style.top || "0") -
          0.01 * variables.hauteurEcran +
          "px";
      }

      qSelectors.qSelectors.dplImageGlobalOiseau2.style.transition = "top 0.5s linear";

      qSelectors.qSelectors.dplImageOiseau2.style.left = variables.dplXOiseau2 + "px";
      qSelectors.qSelectors.dplImageGlobalOiseau2.style.left = variables.dplXGlobalOiseau2 + "px";

      if (variables.dplXOiseau2 <= -950) {
        variables.dplXOiseau2 = 0;
      }

      if (
        variables.dplXGlobalOiseau2 >
        variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau
      ) {
        variables.dplXGlobalOiseau2 = 0;
        qSelectors.qSelectors.dplImageGlobalOiseau2.style.left = variables.dplXGlobalOiseau2 + "px";
      }

      if (variables.dplXGlobalOiseau2 < 0) {
        variables.dplXGlobalOiseau2 =
          variables.largeurEcran * variables.constanteAjustementLargeurEcranOiseau;
        qSelectors.qSelectors.dplImageGlobalOiseau2.style.right = variables.dplXGlobalOiseau2 + "px";
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
        // dplImageGlobal.style.top = "100px";
        dplImageGlobal.style.left = variables.dplXGlobal + "px";
      }
      // dplImageGlobal.style.transition = "top 0.6s linear";
    }
  

    function jump(dplImageGlobal, dplImage) {
      var rect = dplImageGlobal.getBoundingClientRect();
      var dplImage = document.querySelector("#image");
      var initialTop = rect.top;
      const initialTop2 = initialTop;
      // var jumpHeight = 600;
      var jumpHeight = 450;
      var finalTop = initialTop2 - jumpHeight;

      if (!isJumping) {
        isJumping = true

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
        isJumping=false
      }, 400);
    }
      // dplImageGlobal.style.top = initialTop2 + "px";
    }

    var isJumping = false;
    function jump2(dplImageGlobal) {
      var rect = dplImageGlobal.getBoundingClientRect();
      const initialTop = rect.top;

      var jumpHeight = 200;
      var finalTop = initialTop - jumpHeight;
      if (!isJumping) {
        isJumping = true;
        dplImageGlobal.style.top = finalTop + "px";
        setTimeout(function () {
          dplImageGlobal.style.top = initialTop + "px";
          isJumping = false;
        }, 300);
      }
    }
    function jump3(dplImageGlobal) {
      var rect = dplImageGlobal.getBoundingClientRect();
      var initialTop = rect.top;

      var jumpHeight = 200;
      var finalTop = initialTop - jumpHeight;
      dplImageGlobal.style.top = finalTop + "px";
      setTimeout(function () {
        dplImageGlobal.style.top = initialTop + "px";
      }, 300);
    }

    function checkCollision(dplImageGlobal, dplImageX) {
      var rect1 = dplImageGlobal.getBoundingClientRect();
      var rect2 = dplImageX.getBoundingClientRect();
      console.log('zzzzzzzzzzzzzzz'+variables.compteurDeClic)

      

      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top + 80 < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        dplImageX.style.display = "none";
        if(dplImageX.id=="CoinsA" || dplImageX.id=="CoinsC"|| dplImageX.id=="CoinsD"){
          variables.compteurDeClic += 1;
        }

        if(dplImageX.id=="sword" || dplImageX.id=="fireBall"){
          variables.compteurDeClic += 10;
        }

        if(dplImageX.id=="magicPotions" ){
          variables.compteurDeClic += 100;
        }

        if(dplImageX.id=="bouclier" || dplImageX.id=="papyrus2"){
          variables.compteurDeClic += 15;
        }
        
        if(dplImageX.id=="CoinsB" || dplImageX.id=="CoinsB1")
      {
        variables.compteurDeClic=0
        setTimeout(() => {
          // var compteurDePoints = document.querySelector("#compteurDePoints");
          qSelectors.qSelectors.compteurDePoints.style.background="red"
          qSelectors.qSelectors.compteurDePoints.style.color="white"
          qSelectors.qSelectors.compteurDePoints.style.animation="borderPulseButton 0.7s infinite"
          
        }, 10);
        
      }
      qSelectors.qSelectors.compteurDePoints.style.background="rgb(210, 217, 202)"
      qSelectors.qSelectors.compteurDePoints.style.color="purple"
      qSelectors.qSelectors.compteurDePoints.style.animation=""
     
      }
    }

    function checkCollision2(dplImageGlobal, dplImageGlobalChaudron) {
      var rect1 = dplImageGlobal.getBoundingClientRect();
      var rect2 = dplImageGlobalChaudron.getBoundingClientRect();
     
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top + 80 < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        qSelectors.qSelectors.dplImageGlobalChaudron.style.display = "none";
        qSelectors.qSelectors.fondJeux.src = "./fond/backgroundFinish.png";
        variables.backgroundFinishItem=1
        dplImageGlobal.style.display="none"
        qSelectors.qSelectors.dplImageGlobalOiseau.style.display="none"
        qSelectors.qSelectors.dplImageGlobalOiseau2.style.display="none"
        qSelectors.qSelectors.compteurDePoints.style.display="none"
        qSelectors.qSelectors.titreCompetences.style.display="flex"
        qSelectors.qSelectors.containerToBeContinue2.style.display = "block";

        setTimeout(() => {
          qSelectors.qSelectors.itemsCompetences.style.display="block"
          
        }, 2000);
        setTimeout(() => {
          qSelectors.qSelectors.javaScript.style.display="block"
        }, 3000);
        setTimeout(() => {
          qSelectors.qSelectors.typeScript.style.display="block"
        }, 4000);
        setTimeout(() => {
          qSelectors.qSelectors.mongoDB.style.display="block"
        }, 5000);


        setTimeout(() => {
          qSelectors.qSelectors.html.style.display="block"
        }, 6000);
        setTimeout(() => {
          qSelectors.qSelectors.css.style.display="block"
        }, 7000);
        setTimeout(() => {
          qSelectors.qSelectors.json.style.display="block"
        }, 8000);


        setTimeout(() => {
          qSelectors.qSelectors.angular.style.display="block"
        }, 9000);
        setTimeout(() => {
          qSelectors.qSelectors.nodeJs.style.display="block"
        }, 10000);
        setTimeout(() => {
          qSelectors.qSelectors.vueJS.style.display="block"
        }, 11000);

        setTimeout(() => {
          qSelectors.qSelectors.jQuery.style.display="block"
        }, 12000);
        setTimeout(() => {
          qSelectors.qSelectors.react.style.display="block"
        }, 13000);
        setTimeout(() => {
          qSelectors.qSelectors.git.style.display="block"
        },14000);

        setTimeout(() => {
          qSelectors.qSelectors.containerToBeContinue.style.display = "block";
        },15000);
       
      }
      
    }
  });