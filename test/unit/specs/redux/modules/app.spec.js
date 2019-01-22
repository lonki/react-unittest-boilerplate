import { mockStore } from 'test/unit/mockStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { app as cons } from 'redux/constants';
import { fromJS } from 'immutable';

import reducer, {
  setSectionViewPort,
  getFakeApi,
} from 'src/redux/modules/app';

describe('redux/modules/app', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('creates GET_FAKE_API_FULFILLED when fetching fakeApi has been done', () => {
    const store = mockStore({});
    const respCode = 200;
    const data = {
      people: ['Tim'],
    };

    mock.onGet('/fakeApi').reply(respCode, data);

    return store.dispatch(getFakeApi()).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual(cons.GET_FAKE_API_PENDING);
      expect(actions[1].type).toEqual(cons.GET_FAKE_API_FULFILLED);
      expect(actions[1].payload.status).toEqual(respCode);
      expect(actions[1].payload.data).toEqual(data);
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      viewPort: 0,
      getFakeApiPedding: false,
      getFakeApiSuc: false,
      getFakeApiErr: false,
    }));
  });

  it('should handle SET_SECTION_VIEWPORT', () => {
    const expectedAction = {
      type: cons.SET_SECTION_VIEWPORT,
      viewPort: 200,
    }
    const result = reducer(fromJS({}), expectedAction);

    expect(setSectionViewPort(200)).toEqual(expectedAction);
    expect(result.get('viewPort')).toEqual(200);
  });
});