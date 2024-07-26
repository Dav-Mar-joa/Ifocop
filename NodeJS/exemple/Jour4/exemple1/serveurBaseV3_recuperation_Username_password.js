const fs   = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const url  = require('node:url');
const qs   = require('node:querystring');

const server = http.createServer();

const sendResponse = function(response) {
  response.writeHead(response.statusCode, {
    'Content-Type': response.contentType,
    'Content-Length': response.content.length
  });
  response.write(response.content, () => {
    response.end();
  });
}

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

    const basePath  = `${__dirname}/web`;
    let urlPathname = parsedUrl.pathname;
    if ('/' === urlPathname) {
      urlPathname = '/home';
    }
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

server.listen(80, () => {
  console.log('Server started on port 80');
})