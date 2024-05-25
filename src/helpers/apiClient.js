import {config} from './config';
import {create} from 'apisauce';
import {storage} from './storage';
// define the api
export const requests = create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function setAuthorization(token, cache = true) {
  if (token) {
    requests.headers.Authorization = 'Bearer ' + token;
    // cache for next time
    cache && storage.store.set('auth.access', token);
  } else {
    delete requests.headers.Authorization;
    storage.store.delete('auth.access');
  }
}
const token = storage.store.getString('auth.access');
if (token) {
  setAuthorization(token, false);
}
