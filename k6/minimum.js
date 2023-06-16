import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 10000 }, // 0 to 10000 users in 5 minutes
    { duration: '5m', target: 10000 }, // 10000 users for 5 minutes

  ],
};

export default function () {
  http.get('http://localhost:3004');
  sleep(10);

}
