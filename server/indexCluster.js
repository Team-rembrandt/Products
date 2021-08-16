const express = require('express');
const cluster = require('cluster');
const newrelic = require('newrelic');
const totalCPUs = require('os').cpus().length;
const morgan = require('morgan');
const db = require('../database/database.js');
const port = 1004;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.use(morgan('dev'));
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
}