import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  stages: [
    { duration: '2m', target: 800 }, // ramp up to 800 users
    { duration: '1h15m', target: 800 }, // stay at 800 for ~ 1hour 15 mins
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

export default function () {
  const BASE_URL = 'https://nextjs-starter-roan-iota.vercel.app'; // make sure this is not production
  const res = http.get(BASE_URL);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    './k6/output/requests_result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
