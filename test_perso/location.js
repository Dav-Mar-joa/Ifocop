const jours = [
    "Dimanche", 
    "Lundi", 
    "Mardi", 
    "Mercredi", 
    "Jeudi", 
    "Vendredi", 
    "Samedi"
];

const mois = [
    "Janvier", 
    "Février", 
    "Mars", 
    "Avril", 
    "Mai", 
    "Juin", 
    "Juillet", 
    "Août", 
    "Septembre", 
    "Octobre", 
    "Novembre", 
    "Décembre"
];

navigator.geolocation.getCurrentPosition((position)=>{
    const latitude =position.coords.latitude
    const longitude=position.coords.longitude
    console.log("latitiude :" +latitude)
    console.log("longitude :" +longitude)

    var lat = document.getElementById("lat")
    var lon = document.getElementById("lon")
    lat.textContent= "Latitude : " + latitude
    lon.textContent= "Longitude : " + longitude
})

const dateJour = new Date()
const min = dateJour.getMinutes()
const hour = dateJour.getHours()
const day = dateJour.getDay()
const nbDay = dateJour.getDate()
const month = dateJour.getMonth()

var affichageDate = document.getElementById("dateDuJour")

affichageDate.textContent=jours[day] +" "+ nbDay+" "+ mois[month]+ " " + hour+ "h" +" "+ min + "min"