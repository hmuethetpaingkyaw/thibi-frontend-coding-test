import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 300ms
  },
  httpDebug: 'full',
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)', 'p(99.99)', 'count'],
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 5000,
      timeUnit: '1s', // 5000 iterations per second, i.e. 5000 RPS
      duration: '30s',
      preAllocatedVUs: 500, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
  // vus: 500,
  // duration: '30s',
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
    './k6/output/requesttestsResult.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
