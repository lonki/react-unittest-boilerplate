import { fromJS } from 'immutable';

import { auth as cons } from '../constants';

const initialState = fromJS({
  login: false,
  loginSuc: false,
  loginErr: false,
  memberData: {},
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case cons.LOGIN:
      return state.merge({
        login: true,
        loginSuc: false,
        loginErr: false,
        memberData: {},
      });

    case cons.LOGIN_SUCCESS:
      return state.merge({
        login: false,
        loginSuc: true,
        loginErr: false,
        memberData: action.memberData,
      });

    case cons.LOGIN_FAIL:
      return state.merge({
        login: false,
        loginSuc: false,
        loginErr: true,
      });

    default:
      return state;
  }
}

export function login(account, password) {
  return {
    type: cons.SAGA_LOGIN,
    account,
    password,
  };
}
