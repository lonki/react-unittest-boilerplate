import { takeEvery, call, put } from 'redux-saga/effects';
import { auth as authActions } from '../constants';

const fakeGetToken = (account, password) => {
  return new Promise((resolve, reject) => {
    if (account && password) {
      setTimeout(() => {
        resolve({
          result: 'success',
          token: 'token',
        });
      }, 1000);
    } else {
      reject(new Error('error'));
    }
  });
};

const fakeGetInfomation = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      setTimeout(() => {
        resolve({
          infomation: {
            height: 170,
            weight: 60,
          },
        });
      }, 1000);
    } else {
      reject(new Error('error'));
    }
  });
};

export function* login(account, password) {
  const tokenResp = yield call(fakeGetToken, account, password);
  const infomationResp = yield call(fakeGetInfomation, tokenResp.token);
  return {
    token: tokenResp.token,
    infomation: infomationResp.infomation,
  };
}

export function* watchLogin() {
  yield takeEvery(authActions.SAGA_LOGIN, function* ({ account, password } = {}) {
    try {
      yield put({ type: authActions.LOGIN });

      const memberData = yield call(login, account, password);

      yield put({ type: authActions.LOGIN_SUCCESS, memberData });
    } catch (error) {
      yield put({ type: authActions.LOGIN_FAIL });
      throw error;
    }
  });
}

export default [
  watchLogin,
];
