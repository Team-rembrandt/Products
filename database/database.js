const { Pool, Client } = require("pg");
const { password } = require('../config.js');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "productDB",
  password: password,
  port: 5432,
  max: 20,
});

const getProducts = async (page, count, callback) => {
  const queryString = `SELECT id, slogan, description, category, default_price FROM products ORDER BY id ASC LIMIT ${count} OFFSET ${count * page};`
  await pool.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res.rows);
  });
};

const getCurrentProduct = async (product_id, callback) => {
  const queryString = `
  SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg(json_build_object('feature', features.feature, 'value', features.value))
  AS features
  FROM products
  LEFT JOIN features
  ON products.id = features.product_id
  WHERE products.id = ${product_id}
  GROUP BY products.id, products.name, products.slogan, products.description, products.category, products.default_price`
  await pool.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res.rows);
  })
}

const getProductStyle = async (product_id, callback) => {
  const queryString = `
  SELECT styles.product_id,
  json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style )) AS results
  FROM products
  LEFT ON styles
  ON products.id = styles.product_id
  LEFT ON photos
  ON photos.style_id = styles.id
  LEFT ON skus
  ON skus.style_id = styles.id
  WHERE products.id = ${product_id}
  GROUP BY styles.product_id
  `;
  await pool.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res.rows);
  })
}
module.exports = {
  getProducts: getProducts,
  getCurrentProduct: getCurrentProduct,
  getProductStyle: getProductStyle
}