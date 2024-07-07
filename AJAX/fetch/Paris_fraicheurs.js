
  window.document.addEventListener('DOMContentLoaded', () => {
    const lat= document.getElementById('resultLat');
    const adress = document.getElementById('resultAdress');
    const lon = document.getElementById('resultLon');
    const arrondissement = document.getElementById('result2Arrondissement')
    const adresse = document.getElementById('result2Adresse')
    const getButton = document.getElementById('get-data');
    const getButton2 = document.getElementById('get-all-data');
    const postDataForm = document.getElementById('post-data-form');
    const userId = 95;
    let counter = 1;
  
    getButton.addEventListener('click', async (_event) => {
      const method = 'GET';
    //    = `https://jsonplaceholder.typicode.com/posts/${counter}`;
    const fetchUrl = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=1';
    // const fetchUrl2 = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records'

  
      try {
        const response = await fetch(fetchUrl, { method });
        const jsonData = await response.json();
        console.log(jsonData)
  
        if (Object.keys(jsonData).length) {
          counter++;
          lat.innerHTML += jsonData.results[0].geo_point_2d.lat;
          lon.innerHTML += jsonData.results[0].geo_point_2d.lon;
          adress.innerHTML += jsonData.results[0].adresse;
        } else {
          counter = 1;
          lat.innerHTML = 'Aucune donnée';
          lon.innerHTML = 'Réessayez ultérieurement.';
          adress.innerHTML = 'Réessayez ultérieurement.';
        }
      } catch (error) {
        console.error(error);
      }
    });
    getButton2.addEventListener('click', async (_event) => {
      const method = 'GET';
    //    = `https://jsonplaceholder.typicode.com/posts/${counter}`;
    const fetchUrl = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records'

  
      try {
        const response = await fetch(fetchUrl, { method });
        const jsonData = await response.json();
        console.log(jsonData)
  
        if (Object.keys(jsonData).length) {
          counter++;
          console.log("results"+jsonData.results)
          for(let i=0;i<jsonData.results.length;i++){

        
          // arrondissement.innerHTML = jsonData.results[i].arrondissement;
          // adresse.innerHTML = jsonData.results[i].adresse;

          const h3=document.createElement("h3");
          const p=document.createElement("p");

          h3.innerText=jsonData.results[i].arrondissement;
          p.innerText=jsonData.results[i].adresse;

          document.getElementById("display-data").append(h3,p)
        }
        } else {
          counter = 1;
          arrondissement.innerHTML = 'Aucune donnée';
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    // postDataForm.addEventListener('submit', async (event) => {
    //   event.preventDefault();
    //   const resultDiv = document.getElementById('display-post-result');
  
    //   const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
  
    //   const formData = new FormData(postDataForm);
    //   const jsonData = {};
    //   formData.append('userId', userId);
  
    //   for (const [key, value] of formData.entries()) {
    //     console.log(`{ clé: ${key}, valeur: ${value} }`);
    //     console.log(key, value);
    //     jsonData[key] = value;
    //   }
  
    //   try {
    //     const response = await fetch(apiUrl, {
    //       method: 'POST',
    //       body: JSON.stringify(jsonData),
    //       headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     });
    //     const jsonResponse = await response.json();
  
    //     const postDivElt = document.createElement('div');
    //     const postTitle = document.createElement('h3');
    //     const postBody = document.createElement('p');
    //     const spaceElt = document.createElement('br');
    //     const separator = document.createElement('hr');
  
    //     postTitle.innerText = jsonResponse.title;
    //     postBody.innerText = jsonResponse.body;
  
    //     postDivElt.append(postTitle, spaceElt, postBody, separator);
    //     resultDiv.appendChild(postDivElt);
    //     postDataForm.reset();
    //   } catch (error) {
    //     // En temps normal, la gestion des erreurs serait plus poussée...
    //     console.error(error);
    //   }
    // });
  });
  
  
  