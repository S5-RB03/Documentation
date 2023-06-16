import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 500 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 2000 },
    { duration: '5m', target: 2000 },
    { duration: '5m', target: 5000 },
    { duration: '5m', target: 5000 },
    { duration: '5m', target: 10000 },
    { duration: '1m', target: 10000 },
    { duration: '2m', target: 2000 },
    { duration: '10m', target: 2000 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3004');
  sleep(10);
}
