import express, { Application } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function configUriImage(app: Application) {
  app.use(`/image-v11/${process.env.FILE_PRODUCT}`, express.static(`dist/assets/others/${process.env.FILE_PRODUCT}`));
}

module.exports = configUriImage;
