import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '10s',
};

export default function() {
  http.get(`http://localhost:1004/products/${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}/styles`)
  sleep(1);
}