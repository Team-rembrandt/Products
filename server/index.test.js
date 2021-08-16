const app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);

it('Gets the products endpoint and receives status 200', async () => {
  const res = await request.get('/products')

  expect(res.status).toBe(200)
});

it('Gets the products endpoint and it is array', async () => {
  const res = await request.get('/products')

  expect(Array.isArray(res.body)).toBe(true)
});

it('Receives status 200 for product 1 detail', async () => {
  const res = await request.get('/products/1')

  expect(res.status).toBe(200)
});

it('Receives Object for product 1 detail', async () => {
  const res = await request.get('/products/1')

  expect(typeof res.body).toBe('object')
});