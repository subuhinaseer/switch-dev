import {types} from 'mobx-state-tree';
import {storage} from '../helpers/storage';
// Define a couple models
export const UserModel = types
  .model('UserModel', {
    id: types.maybeNull(types.number),
    profile_id: types.maybeNull(types.number),
    username: '',
    business_name: types.maybeNull(types.string),
    full_name: '',
    pin: types.maybeNull(types.string), //temporary store data
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string, ''),
    email: types.maybeNull(types.string, ''),
    avatar: types.maybeNull(types.string, ''),
    is_staff: types.optional(types.boolean, false),
    is_superuser: types.optional(types.boolean, false),
    is_active: types.optional(types.boolean, false),
    exists: types.optional(types.boolean, false),
    date_joined: types.maybeNull(types.Date),
    is_phone_verified: types.optional(types.boolean, false),
  })
  .actions(self => ({
    update(data) {
      Object.keys(self).map(key => {
        let value = data[key];
        if (value !== undefined) {
          if (['date_joined'].includes(key)) {
            value = new Date(value);
          }
          self[key] = value;
        }
      });
      storage.setUser(self);
    },
  }));
