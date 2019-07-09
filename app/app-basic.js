const http = require('http');

const server = http.createServer( (req, res) => {

    res.setHeader('Content-Type', 'text/html');
    
    res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Node Server</title>
      </head>
      <body>
        <h1>This is the Node Server.</h1>
      </body>
    </html>
    `);

    res.end();
});

server.listen(3000);