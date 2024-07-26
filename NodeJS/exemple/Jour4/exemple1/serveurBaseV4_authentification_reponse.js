const fs   = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const url  = require('node:url');
const qs   = require('node:querystring');
const uuid = require('uuid');

const server = http.createServer();

const sendResponse = function(response) {
  response.writeHead(response.statusCode, {
    'Content-Type': response.contentType,
    'Content-Length': response.content.length,
    'Set-Cookie': `session=${response.sessionName}`
  });
  response.write(response.content, () => {
    response.end();
  });
}

/**
 * Middleware qui vérifie si un identifiant de fichier de session est fourni.
 * Si il est fourni, il essaie d'ouvrir le fichier correspondant
 * et de charger les données du fichier dans request.session
 * Sinon, si l'identifiant de fichier de session n'est pas fourni alors,
 * il créé un identifiant de fichier, il créé un fichier et il insère des
 * données par défaut (la date) dans le fichier créé puis
 * il charge les données du fichier dans request.session
*/
server.on('request', (request, response) => {
  response.sessionName = uuid.v4();
  console.log("Nom de session généré :", request.sessionName)
  const cookie    = request.headers.cookie
  if (cookie) {
    //cookie: 'pma_lang=fr; session=26d93b45-e3c1-4b06-940d-143413206b0b'
    const sessionCookie = cookie // 'pma_lang=fr; session=26d93b45-e3c1-4b06-940d-143413206b0b'
      .split(';') // [ 'pma_lang=fr', ' session=26d93b45-e3c1-4b06-940d-143413206b0b' ]
      .map(value => value.trim()) // [ 'pma_lang=fr', 'session=26d93b45-e3c1-4b06-940d-143413206b0b' ]
      .map(value => qs.parse(value)) // [ {'pma_lang':'fr'}, {'session':'26d93b45-e3c1-4b06-940d-143413206b0b'} ]
      .find(value => value['session']); // renvoie {'session':'26d93b45-e3c1-4b06-940d-143413206b0b'} si existe
    if(sessionCookie?.session) {
      response.sessionName = sessionCookie.session
      console.log("Nom de session provenant du navigateur :", response.sessionName)
    }
  }
  const sessionFilePath = path.normalize(`${__dirname}/sessions/${response.sessionName}`)
  request.sessionFilePath = sessionFilePath;
  console.log("Fichier de session à ouvrir ou créer :", sessionFilePath)
  try {
    const session = fs.readFileSync(sessionFilePath);
    request.session = JSON.parse(session.toString());
  } catch(error) {
    try {
      request.session = {
        date: new Date()
      }
      fs.writeFileSync(sessionFilePath, Buffer.from(JSON.stringify(request.session)));
      console.log("Fichier de session créé");
    } catch (error) {
      console.log('Session error', error);
    }
  }
});

server.on('request', (request, response) => {
  if ('/login' === request.url && 'POST' === request.method) {
    const morceauxDeContenu = [];
    // Evènement déclenché pour chaque partie de contenu de requête téléchargé
    // par le serveur
    request.on('data', (morceauDeContenu) => {
      // Cette fonction là se déclencher n fois ou n est le nombre
      // de morceaux de contenu de requête à téléchargé par le serveur
      morceauxDeContenu.push(morceauDeContenu);
    });
    request.on('end', () => {
      const postData       = Buffer.concat(morceauxDeContenu).toString();
      const parsedPostData = qs.parse(postData);

      let urlPathname = '/not-connected';
      if (parsedPostData.username && parsedPostData.password) {
        // Ici on pourrait utiliser ces données pour effectuer une requête
        // sur un SGBD MongoDB par exemple pour récupérer l'identité de
        // l'utilisateur
        if (
          'toto@titi.local'=== parsedPostData.username &&
          'motdepassesupersecret' === parsedPostData.password

          // code 

          // utilisateurs.findOne({
          //   firstname: 'Toto'
          // })
          //   .then((document) => {
          //     console.log(document);
          //   })
          //   .catch((error) => {
          //     console.log(error)
          //   });

        ) {
          urlPathname = '/connected';
          // Je créé un objet qui représente l'identité de l'utilisateur
          const user        = {
            email: 'toto@titi.local',
            firstname: 'Toto',
            lastname: 'TuyTuy',
            age: 35
          }

          
          // Si on a passé l'authentification, on enregistre les données
          // utilisateur dans request.session et dans le fichier de session
          if(request?.session) {
            request.session.user = user
            try {
              fs.writeFileSync(request.sessionFilePath, Buffer.from(JSON.stringify(request.session)));
              console.log("Fichier de session créé");
            } catch (error) {
              console.log('Session error', error);
            }
          }
        }

        if (
          'david'=== parsedPostData.username &&
          'david' === parsedPostData.password
        ) {
          urlPathname = '/connected';
          // Je créé un objet qui représente l'identité de l'utilisateur
          const user        = {
            email: 'david@titi.local',
            firstname: 'DAVID',
            lastname: 'dAVID',
            age: 39
          }

          
          // Si on a passé l'authentification, on enregistre les données
          // utilisateur dans request.session et dans le fichier de session
          if(request?.session) {
            request.session.user = user
            try {
              fs.writeFileSync(request.sessionFilePath, Buffer.from(JSON.stringify(request.session)));
              console.log("Fichier de session créé");
            } catch (error) {
              console.log('Session error', error);
            }
          }
        }
      }

      response.statusCode    = 200;
      response.contentType   = 'text/html;charset=utf8';

      const basePath  = `${__dirname}/web`;
      const filePath = path.normalize(
        `${basePath}/${urlPathname}.html`
      )
      try {
        response.content = fs.readFileSync(filePath)
      } catch(error) {
        response.statusCode = 404;
        response.content    = Buffer.from(`<!DOCTYPE><html><head></head><body><h1>Erreur 404</h1><p>L'URL ${parsedUrl.pathname} n'existe pas.</p><p>Fichier ${filePath} introuvable</p></body></html>`)
      }

      sendResponse(response);
    })
  }
});

server.on('request', (request, response) => {
  if ('GET' === request.method){
    const parsedUrl = new url.URL(
      request.url,
      `http://${request.headers.host}`
    );

    response.content       = Buffer.from('');
    response.statusCode    = 200;
    response.contentType   = 'text/html;charset=utf8';

    let urlPathname = parsedUrl.pathname;

    if ('/' === urlPathname) {
      urlPathname = '/home';
    }

    const basePath  = `${__dirname}/web`;
    const filePath = path.normalize(
      `${basePath}/${urlPathname}.html`
    )
    try {
      response.content = fs.readFileSync(filePath)
    } catch(error) {
      response.statusCode = 404;
      response.content    = Buffer.from(`<!DOCTYPE><html><head></head><body><h1>Erreur 404</h1><p>L'URL ${parsedUrl.pathname} n'existe pas.</p><p>Fichier ${filePath} introuvable</p></body></html>`)
    }

    if (request?.session?.user) {
      response.content = Buffer.from(
        response
          .content
          .toString()
          .replace(/@utilisateur@/gi, request.session.user.email)
          .replace(/@firstname@/gi, request.session.user.firstname)
          .replace(/@lastname@/gi, request.session.user.lastname)
          .replace(/@age@/gi, request.session.user.age)
      );
    } else {
      response.content = Buffer.from(
        response
          .content
          .toString()
          .replace(/@utilisateur@/gi, '')
      );
    }


    sendResponse(response);
  }
});

/**
server.on('request', (request, response) => {

  const morceauxDeContenu = [];
  // Evènement déclenché pour chaque partie de contenu de requête téléchargé
  // par le serveur
  request.on('data', (morceauDeContenu) => {
    // Cette fonction là se déclencher n fois ou n est le nombre
    // de morceaux de contenu de requête à téléchargé par le serveur
    morceauxDeContenu.push(morceauDeContenu);
  });

  // Evènement déclenché une fois que la totalité du contenu de la requête
  // a été téléchargé par le serveur
  request.on('end', () => {
    const postData       = Buffer.concat(morceauxDeContenu).toString();
    const parsedPostData = qs.parse(postData);

    const parsedUrl = new url.URL(
      request.url,
      `http://${request.headers.host}`
    );

    response.content       = Buffer.from('');
    response.statusCode    = 200;
    response.contentType   = 'text/html;charset=utf8';


    let urlPathname = parsedUrl.pathname;

    if ('/' === urlPathname) {
      urlPathname = '/home';
    }


    let user = {};
    if ('/login' === urlPathname && 'POST' === request.method) {
      if (parsedPostData.username && parsedPostData.password) {
        // Ici on pourrait utiliser ces données pour effectuer une requête
        // sur un SGBD MongoDB par exemple pour récupérer l'identité de
        // l'utilisateur
        if (
          'toto@titi.local'=== parsedPostData.username &&
          'motdepassesupersecret' === parsedPostData.password
        ) {
          // Je créé un objet qui représente l'identité de l'utilisateur
          user = {
            email: 'toto@titi.local',
            firstname: 'Toto',
            lastname: 'TuyTuy',
            age: 35
          }
        }
      }
    }

    const basePath  = `${__dirname}/web`;
    const filePath = path.normalize(
      `${basePath}/${urlPathname}.html`
    )
    try {
      response.content = fs.readFileSync(filePath)
    } catch(error) {
      response.statusCode = 404;
      response.content    = Buffer.from(`<!DOCTYPE><html><head></head><body><h1>Erreur 404</h1><p>L'URL ${parsedUrl.pathname} n'existe pas.</p><p>Fichier ${filePath} introuvable</p></body></html>`)
    }

    sendResponse(response);
  });
})
*/

server.listen(80, () => {
  console.log('Server started on port 80');
})