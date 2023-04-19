/* eslint-disable @typescript-eslint/no-var-requires */

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.id = Math.random().toString(36).substr(2, 9);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  next();
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
