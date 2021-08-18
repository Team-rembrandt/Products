const { Pool, Client } = require("pg");
const { password } = require('../config.js');

const pool = new Pool({
  user: "postgres",
  host: "18.218.26.192",
  database: "productdb",
  password: password,
  port: 5432,
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
    callback(null, res.rows[0]);
  })
}

const getProductStyle = async (product_id, callback) => {
  const queryString = `
  SELECT product_id, json_agg(json_build_object(
    'style_id', id,
    'name', name,
    'original_price', original_price,
    'sale_price', sale_price,
    'default?', default_style,
    'photos',
    (SELECT json_agg(json_build_object(
        'thumbnail_url', thumbnail_id,
        'url', url
      )) FROM photos WHERE style_id = styles.id),
  'skus',
    (SELECT
        json_object_agg(id,
            json_build_object(
          'size', size,
          'quantity', quantity
            )
        ) as skus
      FROM skus
      WHERE style_id = styles.id
          GROUP by style_id)
  )) as results FROM styles
      WHERE styles.product_id = ${product_id}
        GROUP BY product_id`;
  await pool.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res.rows[0]);
  })
}

const getRelatedProducts = async (product_id, callback) => {
  const queryString = `
  SELECT
    json_agg(
      related.related_product_id
    ) AS related
  FROM related
  WHERE current_product_id = ${product_id}
  `
  await pool.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res.rows[0].related)
  })
}

module.exports = {
  getProducts: getProducts,
  getCurrentProduct: getCurrentProduct,
  getProductStyle: getProductStyle,
  getRelatedProducts: getRelatedProducts
}