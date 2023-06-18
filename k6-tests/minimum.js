import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 10000 },
    { duration: '5m', target: 10000 },

  ],
};

export default function () {
  http.get('http://localhost:3004');
  sleep(10);

}
