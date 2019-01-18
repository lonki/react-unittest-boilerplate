import reducer from 'src/redux/modules/auth';

import {
  login,
} from 'src/redux/sagas/auth';

const FAKE_GET_TOKEN_DATA = {
  result: 'success',
  token: 'abc',
};

const FAKE_GET_IMFORMATION_DATA = {
  result: 'success',
  infomation: {
    height: 170,
    weight: 60,
  },
};

describe('redux/sagas/auth', () => {
  describe('reducer', () => {

    let state = null;

    beforeEach(() => {
      state = reducer();
    });

    it('get fake member data by calling function login', () => {
      const generator = login('account', 'password');
      generator.next();

      let result = generator.next(FAKE_GET_TOKEN_DATA).value;

      result = generator.next(FAKE_GET_IMFORMATION_DATA);

      const {
        token,
        infomation,
      } = result.value

      expect(token).toBe(FAKE_GET_TOKEN_DATA.token);
      expect(infomation.height).toBe(FAKE_GET_IMFORMATION_DATA.infomation.height);
      expect(infomation.weight).toBe(FAKE_GET_IMFORMATION_DATA.infomation.weight);
      expect(result.done).toBe(true);
    });
  });
});
