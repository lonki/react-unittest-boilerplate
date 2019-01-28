import { fork, cancel, take, call, spawn, all } from 'redux-saga/effects';
import authSagas from './auth';

const sagas = [
  ...authSagas,
];

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga) {
  return function* main() {
    const sagaTask = yield fork(saga);
    yield take(CANCEL_SAGAS_HMR);
    yield cancel(sagaTask);
  };
}

function* startAllSagas() {
  let _sagas = sagas;

  if (__DEVELOPMENT__) {
    _sagas = _sagas.map(createAbortableSaga);
  }

  yield all(_sagas.map(saga =>
    spawn(function* () {
      let isSyncError = false;
      while (!isSyncError) {
        try {
          setTimeout(() => isSyncError = false);
          
          yield call(saga);

          break;
        } catch (error) {
          if (isSyncError) {
            throw new Error(`Sagas was terminated because it threw an exception on startup.`);
          }

          if (error.status === 403) {
            // for token timeout
            yield put({ type: auth.LOGOUT_ALERT });
          }
        }
      }
    }),
  ));
}

export default {
  startSagas(sagaMiddleware) {
    sagaMiddleware.run(startAllSagas);
  },
  cancelSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  },
};
