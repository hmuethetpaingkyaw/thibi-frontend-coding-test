import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export const options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'https://nextjs-starter-roan-iota.vercel.app'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/`, null, { tags: { name: 'Main Page in English' } }],
    ['GET', `${BASE_URL}/mm`, null, { tags: { name: 'Main Page in Burmese' } }],
  ]);

  sleep(1);
}

export function handleSummary(data) {
  return {
    './k6/output/stresstestsResult.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}