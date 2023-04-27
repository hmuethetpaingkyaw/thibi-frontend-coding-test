import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
    stages: [
        { duration: '5m', target: 1000 }, // simulate ramp-up of traffic from 1 to 1000 users over 5 minutes.
        { duration: '10m', target: 1000 }, // stay at 1000 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


export default () => {
    const BASE_URL = 'https://nextjs-starter-roan-iota.vercel.app'; // make sure this is not production

    const responses = http.batch([
        ['GET', `${BASE_URL}/`, null, { tags: { name: 'Main Page in English' } }],
        ['GET', `${BASE_URL}/mm`, null, { tags: { name: 'Main Page in Burmese' } }],
    ]);

    sleep(1);
};

export function handleSummary(data) {
    return {
        './k6/output/loadtestsResult.html': htmlReport(data),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}
