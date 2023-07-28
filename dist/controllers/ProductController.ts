import { Response, Request } from 'express';
import path from 'path';
const fs = require('fs');
const products = require('../models/ProductModel');
require('dotenv').config();

class ProductController {
  //[GET]
  index(req: Request, res: Response, next: any) {
    var { page, pageSize, query, status } = req.query;
    let dataSearch: any = undefined;
    let queryData: any = undefined;

    // query data search
    if (status && query) {
      dataSearch = { $regex: query, $options: 'im' };
      queryData = {
        status: status,
        $or: [
          { productName: dataSearch },
          { price: typeof Number(query) === typeof 1 && !Number.isNaN(Number(query)) ? query : null },
          { quantity: typeof Number(query) === typeof 1 && !Number.isNaN(Number(query)) ? query : null },
        ],
      };
    } else if (query) {
      dataSearch = { $regex: query, $options: 'im' };
      queryData = {
        $or: [
          { productName: dataSearch },
          { price: typeof Number(query) === typeof 1 && !Number.isNaN(Number(query)) ? query : null },
          { quantity: typeof Number(query) === typeof 1 && !Number.isNaN(Number(query)) ? query : null },
        ],
      };
    } else if (status) {
      queryData = { status: status };
    }

    var skipNumber: number = 0;
    // get page, pageSize, query and status data
    if (page || pageSize) {
      const pageSizeNew = Number(pageSize);
      let pageNew = Number(page);
      if (pageNew <= 1) pageNew = 1;
      skipNumber = (pageNew - 1) * pageSizeNew;

      products
        .find(queryData)
        .skip(skipNumber)
        .sort({ index: -1 })
        .limit(pageSize)
        .then((data: any) => {
          products
            .countDocuments(queryData)
            .then((total: number) => {
              var totalPage: number = Math.ceil(total / pageSizeNew);
              return res.status(200).json({
                paganition: {
                  totalPage: Number(totalPage),
                  currentPage: Number(page),
                  pageSize: Number(pageSize),
                  totalElement: Number(total),
                },
                data,
              });
            })
            .catch((error: any) => next(error));
        });
    } else {
      // get all
      products
        .find(queryData)
        .then((data: any) => {
          return res.status(200).json(data);
        })
        .catch((err: any) => {
          return next(err);
        });
    }
  }

  //[POST]
  createProduct(req: Request, res: Response, next: any) {
    const { productImage, productImageDetail }: any = req.files;
    if (productImage || productImageDetail) {
      const dataArrayImageMulter: string[] = [];
      const dataArrayImage: string[] = [];
      req.body.productImage = 'http://' + process.env.URL + '/image-v11/products/' + productImage[0]?.filename;
      dataArrayImageMulter.push(productImage[0]?.filename);
      productImageDetail?.map((item: any) => {
        dataArrayImage.push('http://' + process.env.URL + '/image-v11/products/' + item?.filename);
        dataArrayImageMulter.push(item?.filename);
      });
      req.body.productImageDetail = dataArrayImage;
      req.body.productImageMulter = dataArrayImageMulter;
    }
    const dataProducts = new products(req.body);
    dataProducts
      .save()
      .then(() => {
        return res.status(200).json({ mess: 'Thêm sản phẩm thành công.' });
      })
      .catch((err: any) => next(err));
  }

  //[DELETE]
  deleteProduct(req: Request, res: Response, next: any) {
    const { id } = req.params;

    products
      .findById(id)
      .then((data: any) => {
        if (data.productImageMulter?.length !== 0) {
          data.productImageMulter?.map((i: string) => {
            const directoryPath =
              path.dirname(path.dirname(__dirname)) + `\\dist\\assets\\others\\${process.env.FILE_PRODUCT}\\${i}`;
            fs.unlinkSync(directoryPath);
          });
        }
        return products.findByIdAndDelete({ _id: data?._id });
      })
      .then(() => {
        return res.status(200).json({ mess: 'Xóa sản phẩm thành công.' });
      })
      .catch((err: any) => {
        next(err);
        return res.status(400).json({ mess: 'Không tìm thấy id của sản phẩm.' });
      });
  }
}

module.exports = new ProductController();
