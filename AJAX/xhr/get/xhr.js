// window.document.addEventListener('DOMContentLoaded', () => {
//     const title = document.getElementById('xhrResultTitle');
//     const body = document.getElementById('xhrResultBody');
//     const getButton = document.getElementById('xhrGet');
//     let counter = 1;
  
//     getButton.addEventListener('click', (_event) => {
//       const xhr = new XMLHttpRequest();
//       const method = 'GET';
//       const xhrUrl = `https://jsonplaceholder.typicode.com/posts/${counter}`;
  
//       xhr.open(method, xhrUrl);
//       xhr.addEventListener('readystatechange', () => {
//         if (4 === xhr.readyState) {
//           const jsonData = JSON.parse(xhr.responseText);
//           counter++;
//           title.innerHTML = jsonData.title;
//           body.innerHTML = jsonData.body;
//         }
  
        
//       });
//       xhr.send();
//     })
//   });

window.document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('xhrResultTitle');
  const body = document.getElementById('xhrResultBody');
  const getButton = document.getElementById('xhrGet');
  let counter = 1;

  getButton.addEventListener('click', (_event) => {
    const xhr = new XMLHttpRequest();
    const method = 'GET';
    const xhrUrl = `https://jsonplaceholder.typicode.com/posts/${counter}`;

    xhr.open(method, xhrUrl);
    xhr.addEventListener('readystatechange', () => {
      if (4 === xhr.readyState) {
        console.log('responseText: ', xhr.responseText);
        const jsonData = JSON.parse(xhr.responseText);
        console.log('jsonData: ', jsonData);
        if (Object.keys(jsonData).length) {
          counter++;
          title.innerHTML = jsonData.title;
          body.innerHTML = jsonData.body;
        } else {
          counter = 1;
          title.innerHTML = 'Aucune donnée';
          body.innerHTML = 'Réessayez ultérieurement.';
        }
      }
    });

    xhr.onerror = (xhr, event) => {
      console.log('xhr: ', xhr, 'event: ', event);
    };

    xhr.send();
  })
});