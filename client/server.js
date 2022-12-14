const express = require('express');
const next = require('next');

const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3002;
const serverPort = process.env.SERVER_PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // apply proxy in dev mode
    if (dev) {
      server.use(
        '/expressapi',
        createProxyMiddleware({
          target: `http://localhost:${serverPort}`,
          changeOrigin: true,
        })
      );
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log('Error', err);
  });
