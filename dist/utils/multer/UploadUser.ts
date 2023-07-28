// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import { Request, Response } from 'express';
import { maxSizeImage } from '../../styles';
const path = require('path');

var storate = multer.diskStorage({
  destination: function (req, res, cd) {
    cd(null, `dist/assets/others/${process.env.FILE_PRODUCT}`);
  },
  filename: function (req, file, cd) {
    let ext = path.extname(file.originalname);
    cd(null, Math.ceil(Math.random() * 10000) + '_' + Date.now() + ext);
  },
});

var upload = multer({
  storage: storate,
  limits: { fileSize: maxSizeImage },
  fileFilter: function (req: Request, file, callback) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      callback(null, true);
    } else {
      req.body.errorImage = file.mimetype;
      // console.log('only jpg & png file supported!');
      callback(null, false);
    }
  },
});

module.exports = upload;
