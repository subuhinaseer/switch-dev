import {types} from 'mobx-state-tree';
import {setAuthorization, utils} from '../helpers';
import {storage} from '../helpers/storage';
// Define a couple models
export const AuthModel = types
  .model('AuthModel', {
    access: types.maybeNull(types.string),
    refresh: types.maybeNull(types.string),
    access_expiration: types.maybeNull(types.Date),
    refresh_expiration: types.maybeNull(types.Date),
  })
  .actions(self => ({
    logout() {
      self.access = null;
      utils.logout();
    },
    update(data) {
      Object.keys(self).map(key => {
        let value = data[key];
        if (value !== undefined) {
          if (['access_expiration', 'refresh_expiration'].includes(key)) {
            value = new Date(value);
          }
          self[key] = value;
        }
      });
      storage.setJWTToken(self);
    },
    login(data) {
      Object.keys(self).map(key => {
        let value = data[key];
        if (value !== undefined) {
          if (['access_expiration', 'refresh_expiration'].includes(key)) {
            value = new Date(value);
          }
          if (key === 'access') {
            setAuthorization(value);
          }
          self[key] = value;
        }
      });
      storage.setJWTToken(self);
    },
  }));
