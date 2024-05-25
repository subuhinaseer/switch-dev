import {flow, types as t, toGenerator} from 'mobx-state-tree';
import {UserModel, AuthModel, CurrentActivityModel} from '../models';
import {BookModel} from '../models/Book';
import {requests, url} from '../helpers';
// Now instantiate the store!
export const RootStore = t
  .model({
    auth: t.maybeNull(AuthModel),
    user: t.maybeNull(UserModel),
    books: t.optional(t.map(BookModel), {}),
    currentActivity: t.maybeNull(CurrentActivityModel),
  })
  .actions(self => ({
    login(data) {
      self.auth.login(data);
      self.user.update(data.user);
    },
    setSelectedBook(data) {
      const book = self.books.get(data.id);
      self.selectedBook = {...book, user: {...book.user}};
      self.currentActivity.currency = book.currency;
    },
    addBook(data) {
      const book = BookModel.create();
      book.update(data);
      self.books.set(data.id, book);
      return book;
    },
    createBook: flow(function* (params) {
      const {data, ok, originalError} = yield* toGenerator(
        requests.post(url.retailer.Book, {
          ...params,
          user: self.user.id,
        }),
      );
      if (ok) {
        const book = self.addBook(data);
        return {ok, data, book};
      } else {
        return {
          ok,
          data,
          originalError,
        };
      }
    }),
    deleteBook: flow(function* (id) {
      const {data, ok, originalError} = yield* toGenerator(
        requests.delete(url.getItemURL('retailer.Book', {id})),
      );
      if (ok) {
        self.books.delete(id);
        return {ok, originalError, data};
      } else {
        return {ok, originalError, data};
      }
    }),
    updateBook: flow(function* (id, params) {
      const {data, ok, originalError} = yield* toGenerator(
        requests.patch(url.getItemURL('retailer.Book', {id}), {
          ...params,
        }),
      );
      if (ok) {
        const book = self.books.get(id);
        book.update(data);
        self.books.set(data.id, book);
        return {ok, book, data};
      } else {
        return {
          ok,
          data,
          originalError,
        };
      }
    }),
    async fetchBooks(params = {}) {
      const {data, ok} = await requests.get(url.retailer.Book, params);
      if (ok) {
        data.results.map(book => self.addBook(book));
        if (!self.selectedBook && data.results[0]) {
          self.setSelectedBook(data.results[0]);
        }
      }
    },
    resetSubState(subState) {
      const subStateName = subState.$treenode?.subpath;
      if (subStateName) {
        self[subStateName] = {};
      }
    },
  }));

export const rootStore = RootStore.create({
  auth: AuthModel.create(),
  user: UserModel.create(),
  currentActivity: CurrentActivityModel.create(),
});
export default RootStore;
