(() => {
  'use strict';
  const postDataForm = document.getElementById('post-data-form');

  const postData = (event) => {
    event.preventDefault();

    const formData = new FormData(postDataForm);
    console.log('formData: ', formData);
    console.log('formData.entries(): ', formData.entries());
    console.log('formData.entries().next(): ', formData.entries().next());

    const jsonData = {};

    formData.append('userId', 42);

    for (const [key, value] of formData.entries()) {
    console.log(entry);
      jsonData[key] = value;
    }

    console.log('jsonData: ', jsonData);
    const strData = JSON.stringify(jsonData);

    console.log('strData: ', strData);

    const xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://jsonplaceholder.typicode.com/posts',
      true
    );

    const contentType = 'application/json; charset=UTF-8';
    xhr.setRequestHeader('Content-type', contentType);
    xhr.send(strData);

    xhr.addEventListener('readystatechange', (_event) => {
      if (xhr.readyState = 4 && xhr.DONE) {
        console.log('response: ', xhr.response);
        const parsedResponse = JSON.parse(xhr.responseText);
        if (Object.keys(parsedResponse).length) {
          console.log(parsedResponse);
          // Insérer ici la logique pour afficher les données reçues dans le DOM...
        }
      }
    })
  }
  postDataForm.addEventListener('submit', postData);

});