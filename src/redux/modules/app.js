import { fromJS } from 'immutable';
import { app as cons } from '../constants';
import axios from 'axios';

const initialState = fromJS({
  viewPort: 0,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.SET_SECTION_VIEWPORT: {
      const { viewPort } = action;

      return state.merge({
        viewPort,
      });
    }
    default:
      return state;
  }
}

export function setSectionViewPort(viewPort) {
  return {
    type: cons.SET_SECTION_VIEWPORT,
    viewPort,
  };
}

export function getFakeApi(email) {
  const url = '/fakeApi';
  return {
    type: cons.GET_FAKE_API,
    payload: {
      promise: axios({
        url,
      }),
    },
  };
}
