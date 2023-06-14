import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 500 }, // ramp up to 200 users over 1 minute
    { duration: '10s', target: 1000 }, // stay at 200 users for 5 minutes
    { duration: '10s', target: 2000 }, // ramp up to 1000 users over 2 minutes
    { duration: '10s', target: 4000 }, // stay at 1000 users for 5 minutes
    { duration: '1m', target: 4000 }, // ramp up to 2000 users over 2 minutes
    { duration: '2m', target: 0 }, // ramp down to 0 users over 2 minutes
  ],
};

export default function () {
  http.get('http://localhost:3004');
  sleep(1);
}
