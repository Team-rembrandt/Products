const express = require('express');
//const newrelic = require('newrelic');
//const morgan = require('morgan');
const db = require('../database/database.js');
const port = 1004;
const app = express();

//  app.use(morgan('dev'));
  app.use(express.json());

  app.get('/products', (req, res) => {
    let { page, count } = req.query;
    if (page === undefined) {
      page = 0;
    };
    if (count === undefined) {
      count = 5;
    };
    db.getProducts(page, count, (err, result) => {
      if (err) {
        res.status(400)
        console.log(err);
      }
      res.status(200)
      res.send(result);
    })
  });

  app.get('/products/:product_id', (req, res) => {
    const { product_id } = req.params;
    db.getCurrentProduct(product_id, (err, result) => {
      if (err) {
        res.status(400)
        console.log(err);
      }
      res.status(200)
      res.send(result);
    })
  });

  app.get('/products/:product_id/styles', (req, res) => {
    const { product_id } = req.params;
    db.getProductStyle(product_id, (err, result) => {
      if (err) {
        res.status(400)
        console.log(err);
      }
      res.status(200);
      res.send(result);
    })
  })

  app.get('/products/:product_id/related', (req, res) => {
    const { product_id } = req.params;
    db.getRelatedProducts(product_id, (err, result) => {
      if (err) {
        res.status(400)
       console.log(err)
      }
      res.status(200)
      res.send(result);
    })
  })

  // module.exports = app;
  app.listen(port, () => {
    console.log(`Successfully connected to the port ${port}`)
  })