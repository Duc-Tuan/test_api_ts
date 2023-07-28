import { Application, Response, Request } from 'express';
const newRouter = require('./router/Product');
const siteRouter = require('./router/Site');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function route(app: Application) {
  app.use('/products', newRouter);
  app.use('/', siteRouter);
}

module.exports = route;
