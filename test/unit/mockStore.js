import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';

const middlewares = [promiseMiddleware()];

const mockStore = configureMockStore(middlewares);

export { mockStore as mockStore };