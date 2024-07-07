(function () {
    const resultDiv = document.getElementById('display-data');
    const getDataBtn = $('#get-data');
    const getAllDataBtn = $('#get-all-data');
    const getPostsForm = $('#get-post-form');
    let postId = 1;
  
    $(getDataBtn).on('click', function () {
      $.ajax(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'GET'
      })
        .then(function (data) {
          console.log('data? ', data);
          const body = data.body;
          const title = data.title;
          const postDivElt = document.createElement('div');
          const postTitle = document.createElement('h3');
          const postBody = document.createElement('p');
          const spaceElt = document.createElement('br');
          const separator = document.createElement('hr');
  
          $(postTitle).html(title);
          $(postBody).html(body);
  
          $([postTitle, spaceElt, postBody, separator]).appendTo(postDivElt);
          $(postDivElt).appendTo(resultDiv);
        })
        // .then(function (strData) {
        //   console.log('strData: ', strData);
        //   return strData;
        // })
        .catch(function (error) {
          console.error('Une erreur est survenue: ', error);
        })
    });
  
  
    $(getAllDataBtn).on('click', function () {
      const newPost = JSON.stringify({
        title: 'Nouveau post super cool',
        body: `Je n'ai strictement aucun talent rédactionnel, yeah !`,
        userId: 68
      });
  
  
      $.ajax(`https://jsonplaceholder.typicode.com/posts`,
        {
          type: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8'
          },
          data: newPost
        }
      )
        .then(function (data) {
          console.log('data? ', data);
          const body = data.body;
          const title = data.title;
          const postDivElt = document.createElement('div');
          const postTitle = document.createElement('h3');
          const postBody = document.createElement('p');
          const spaceElt = document.createElement('br');
          const separator = document.createElement('hr');
  
          $(postTitle).html(title);
          $(postBody).html(body);
  
          $([postTitle, spaceElt, postBody, separator]).appendTo(postDivElt);
          $(postDivElt).appendTo(resultDiv);
        })
        // .then(function (strData) {
        //   console.log('strData: ', strData);
        //   return strData;
        // })
        .catch(function (error) {
          console.error('Une erreur est survenue: ', error);
        })
    });
  
  
  
  })();
  