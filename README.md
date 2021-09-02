# Overview

One of back-end endpoint for e-commerce website. Built it to improve to handle higher user requests.

Extract - I already have clean CSVS file, so I can just import it into the pgadmin and seed it
Transform - I am going to set up validation specifying type of datas (ex. SERIAL, INTEGER, VARCHAR)
Load - Going to seed my pgAdmin schema sql into repo to start creating my own API

ETL - products - adding validation to key columns
  id - bigserial prime_key not null
  name - varchar not null
  slogan varchar not null
  description - varchar not null
  category - varchar not null
  default_price - integer not null

ETL - features - adding validation to key columns
  id - bigserial prime_key not null
  product_id integer not null foreign key to product_id
  feature - var char - not null
  value - var char - not null

ETL - related - adding validation to key columns
  id - bigserial prime_key not null
  current_product_id - integer not null foreign key to product_id
  related_product_id - interger not null foreign key to product_id

ETL - styles - adding validation to key columns
  id - bigserial prime_key not null
  product_id - integer not null foreign key to product_id
  name - varchar not null
  sale_price - integer
  original_price - integer not null
  default_style - integer not null

ETL - skus - adding validation to key columns
  id - bigserial prime_key not null
  style_id - integer not null foreign key to style's id
  size - varchar not null
  quantity - varchar not null

ETL - photos - adding validation to key columns
  id - bigserial prime_key not null
  style_id - integer not null foreign key to style's id
  url - varchar not null
  thumbnail_url - varchar not null

Test results - https://dev.to/ehdtlaos/testing-loader-io-after-installing-nginx-7ob

# Features

Can be used horizontally with NGINX.
Currently using K6 , New Relic, Loader.io ad analytic and testing

# Setup & Insmallation

install dependencies
``
npm install
``

start the server
``
npm start
``
