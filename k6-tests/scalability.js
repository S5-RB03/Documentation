import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10m', target: 30000 },
    { duration: '5m', target: 30000 },
    { duration: '5m', target: 2000 },
    { duration: '5m', target: 2000 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3004');
  sleep(10);
}
