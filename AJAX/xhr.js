window.document.addEventListener('DOMContentLoaded', () => {
  // console.log('xhr: ', xhr);
  const resultDiv = document.getElementById('display-data');
  const getDataBtn = document.getElementById('get-data');
  const getAllDataBtn = document.getElementById('get-all-data');
  const getPostsForm = document.getElementById('get-post-form');
  const postDataForm = document.getElementById('post-data-form');
  let postId = 1;

  // Fonction pour récupérer un post après l'autre, de façon incrémentale
  const getOnePost = (_event) => {
    resultDiv.innerText = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    xhr.send();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.DONE && xhr.readyState === 4) {
        const jsonData = JSON.parse(xhr.responseText);

        const postDivElt = document.createElement('div');
        const postTitle = document.createElement('h3');
        const postBody = document.createElement('p');
        const spaceElt = document.createElement('br');
        const separator = document.createElement('hr');

        postTitle.innerText = jsonData.title;
        postBody.innerText = jsonData.body;

        postDivElt.append(postTitle, spaceElt, postBody, separator);
        resultDiv.appendChild(postDivElt);

        postId++;
      } else {
        if (xhr.status === 404 || xhr.onerror) {
          postId = 1;
          resultDiv.innerText = '';
        }
      }
    });
  };

  const getData = (_event) => {
    resultDiv.innerText = '';
    // On commence par créer une instance de XMLHttpRequest, à l'aide de son constructeur,
    // et que l'on stocke dans une variable que l'on nomme comme on le souhaite, ici : 'xhr'.
    const xhr = new XMLHttpRequest();
    // console.log('xhr: ', xhr);

    // Une fois l'objet xhr instancié, on démarre les préparatifs de communication avec une API
    // en utilisant la méthode .open() à laquelle on fournit deux paramètres : la méthode HTTP
    // (aussi appelée : verbe HTTP) ainsi que l'URL vers la ressource distante à laquelle nous
    // souhaitons avoir accès.
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();

    // Ensuite, nous ajoutons un événement d'écoute sur l'objet xhr afin de déterminer à quel
    // moment nous allons pouvoir utiliser les données récupérées depuis l'API distante. On peut
    // utiliser l'événement 'readystatechange' et s'assurer que l'état (readyState) est à 4, ou bien
    // utiliser directement l'événement 'load' qui ne se déclence que lorsque la requête s'est conclue
    // avec succès.
    xhr.addEventListener('readystatechange', () => {
      // console.log('xhr.readyState: ', xhr.readyState);
      // On vérifie que la requête s'est terminée et que l'état est bien 4, soit 'success'...
      if (xhr.DONE && xhr.readyState === 4) {
        // console.log('xhr.response: ', xhr.response);
        // console.log('xhr.responseText: ', xhr.responseText);
        // console.log('xhr.responseType: ', xhr.responseType);
        // console.log('xhr.responseXML: ', xhr.responseXML);

        // Les données récupérées, bien que représentant un document JSON, sont présentées au
        // format chaîne de caractères, aussi nous devons les transformer afin qu'elles 
        // reprennent leur forme d'origine : un document JSON...
        const jsonData = JSON.parse(xhr.responseText);
        // console.log('jsonData: ', jsonData);

        // Dans le cadre de cette requête, nous récupérons un tableau de messages, donc pour
        // pouvoir utiliser ces données, nous devons itérer sur l'objet récupérer au moyen d'une
        // boucle : forEach, for...of, etc...
        jsonData.forEach(post => {
          // Dans la boucle, nous créons les éléments à ajouter au DOM, peuplons leurs valeurs textuelles
          // et les ajoutons au DOM...
          const postDivElt = document.createElement('div');
          const postTitle = document.createElement('h3');
          const postBody = document.createElement('p');
          const spaceElt = document.createElement('br');
          const separator = document.createElement('hr');

          postTitle.innerText = post.title;
          postBody.innerText = post.body;

          postDivElt.append(postTitle, spaceElt, postBody, separator);
          resultDiv.appendChild(postDivElt);
        })
      }
    });
  };

  // Fonction permettant de récupérer un post spécifique en fonction d'une valeur soumise par
  // l'utilisateur au moyen d'un formulaire
  const getSpecificPost = (event) => {
    resultDiv.innerHTML = '';
    event.preventDefault();
    const xhr = new XMLHttpRequest();

    let specificPostId = undefined;
    console.log('getPostsForm: ', getPostsForm);

    // Afin de pouvoir exploiter les données transmises par l'utilisateur au moyen
    // du formulaire, nous allons créer un objet de type FormData en utilisant le constructeur
    // FormData() auquel nous fournissons en argument la référence à notre formulaire que nous
    // avons au préalable stockée dans la variable 'getPostsForm'...
    const formData = new FormData(getPostsForm);
    console.log('formData: ', formData);

    // Les objets de type FormData contiennent des méthodes permettant d'intéragir avec les données,
    // notamment 'get()', 'getAll()' et 'entries()'.
    specificPostId = formData.get('postId');
    // specificPostId = formData.getAll('postId')[0];

    console.log('formData.get() :', formData.get('interest'));
    console.log('formData.getAll() :', formData.getAll('interest'));

    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts/${specificPostId}`);
    xhr.send();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.DONE && xhr.readyState === 4) {
        const jsonData = JSON.parse(xhr.responseText);

        if (
          undefined !== jsonData.title &&
          undefined !== jsonData.body
        ) {
          const postDivElt = document.createElement('div');
          const postTitle = document.createElement('h3');
          const postBody = document.createElement('p');
          const spaceElt = document.createElement('br');
          const separator = document.createElement('hr');

          postTitle.innerText = jsonData.title;
          postBody.innerText = jsonData.body;

          postDivElt.append(postTitle, spaceElt, postBody, separator);
          resultDiv.appendChild(postDivElt);
        } else {
          resultDiv.innerText = 'Aucun post ne correspond à ce numéro.';
        }
      } else {
        if (xhr.status === 404 || xhr.onerror) {
          resultDiv.innerHTML = "";
        }
      }
    });
  }

  const postData = (event) => {
    event.preventDefault();

    const formData = new FormData(postDataForm);
    console.log('formData: ', formData);
    console.log('formData.entries(): ', formData.entries());
    console.log('formData.entries().next(): ', formData.entries().next());

    const jsonData={}

    formData.append('userId', 33);

    for (entry of formData.entries()) {
      console.log(entry);
      jsonData[entry[0]]=entry[1]
      Object.defineProperty(jsonData,entry[0],{
        value:entry[1],
        writable:false
      })

    }
    console.log("jsonData",jsonData)

    const strData = JSON.stringify(jsonData)

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://jsonplaceholder.typicode.com/posts/`,true);

    const contentType = 'application/json; charset=UTF-8';

    xhr.setRequestHeader('Content-type', contentType);

    xhr.send(strData);

    xhr.addEventListener('readystatechange', (_event) => {
      if (xhr.readyState = 4 && xhr.DONE) {
        const parsedResponse = JSON.parse(xhr.responseText);
        if (Object.keys(parsedResponse).length) {
          console.log(parsedResponse);
        }
      }
    })
  }

  getAllDataBtn.addEventListener('click', getData);
  getDataBtn.addEventListener('click', getOnePost);
  getPostsForm.addEventListener('submit', getSpecificPost);
  postDataForm.addEventListener('submit', postData);

})