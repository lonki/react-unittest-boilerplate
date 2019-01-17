import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware, { END } from 'redux-saga';
import reducers from './modules/reducers';
import rootSaga from './sagas/rootSaga';

export default function (initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    promiseMiddleware(),
    sagaMiddleware,
  ];
  const rootReducer = reducers();
  let store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
  ));

  if (__DEVELOPMENT__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middleware),
    ));

    if (module.hot) {
      module.hot.accept('./sagas/rootSaga', () => {
        rootSaga.cancelSagas(store);
        require('./sagas/rootSaga').default.startSagas(sagaMiddleware);
      });
    }
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  rootSaga.startSagas(sagaMiddleware);
  return store;
}
