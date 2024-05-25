import {types as t} from 'mobx-state-tree';
import {UserModel} from './User';
// This is an example module taken from another project
export const BookModel = t
  .model('BookModel', {
    id: t.maybeNull(t.number),
    name: t.maybeNull(t.string),
    currency: t.optional(t.string, 'TZS'),
    created: t.maybeNull(t.string),
    last_updated: t.maybeNull(t.string),
    amount: t.optional(t.number, 0),
    user: t.maybeNull(UserModel),
  })
  .actions(self => ({
    update(data) {
      Object.keys(self).map(key => {
        let value = data[key];
        if (value !== undefined) {
          if (key === 'user') {
            const user = UserModel.create();
            user.update(value);
            self[key] = user;
          } else {
            self[key] = value;
          }
        }
      });
    },
  }));
