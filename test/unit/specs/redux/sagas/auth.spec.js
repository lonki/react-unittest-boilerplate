import reducer from 'src/redux/modules/auth';

import {
  login,
} from 'src/redux/sagas/auth';

const FAKE_SERVER_DATA = {
  TIM: {
    account: 'Tim',
    password: '123',
    token: 'abc',
    infomation: {
      height: 175,
      weight: 60,
    },
  },
};

describe('redux/sagas/auth', () => {
  describe('reducer', () => {

    let state = null;

    beforeEach(() => {
      state = reducer();
    });

    it('get fake member data by calling function login', () => {
      const { TIM } = FAKE_SERVER_DATA;
      const generator = login(TIM.account, TIM.password);
      generator.next();

      let mockPosts = {
        result: 'success',
        token: TIM.token,
      };
      let result = generator.next(mockPosts).value;

      mockPosts = {
        infomation: TIM.infomation,
      };
      result = generator.next(mockPosts);

      expect(result.value.token).toBe(TIM.token);
      expect(result.value.infomation.height).toBe(TIM.infomation.height);
      expect(result.value.infomation.weight).toBe(TIM.infomation.weight);
      expect(result.done).toBe(true);
    });
  });
});
