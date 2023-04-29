import axios from 'axios';
const apiEndpoint = 'https://cms.businessintegritymyanmar.thibi.co/api/';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function getData(url: string, params?: any) {
  axios.defaults.headers = headers;
  let response = await axios.get(`${apiEndpoint}${url}`, { params: params });
  return response.data;
}
