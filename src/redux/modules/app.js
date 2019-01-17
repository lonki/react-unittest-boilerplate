import { fromJS } from 'immutable';
import { app as cons } from '../constants';

const getViewPortPromise = (width = 0) => {
  return new Promise((resolve, reject) => {
    if (width > 0) {
      setTimeout(() => {
        resolve({ viewPort: width });
      }, 1000);
    } else {
      reject(new Error('error'));
    }
  });
};

const initialState = fromJS({
  setSectionViewPortPending: false,
  setSectionViewPortSuc: false,
  setSectionViewPortErr: false,
  viewPort: 0,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.SET_SECTION_VIEWPORT_PENDING: {
      return state.merge({
        setSectionViewPortPending: true,
        setSectionViewPortSuc: false,
        setSectionViewPortErr: false,
      });
    }
    case cons.SET_SECTION_VIEWPORT_FULFILLED: {
      const { viewPort } = action.payload;

      return state.merge({
        setSectionViewPortPending: false,
        setSectionViewPortSuc: true,
        setSectionViewPortErr: false,
        viewPort,
      });
    }
    case cons.SET_SECTION_VIEWPORT_REJECTED:
      return state.merge({
        setSectionViewPortPending: false,
        setSectionViewPortSuc: false,
        setSectionViewPortErr: true,
      });
    default:
      return state;
  }
}

export function setSectionViewPort(width) {
  return {
    type: 'SET_SECTION_VIEWPORT',
    async payload() {
      const result = await getViewPortPromise(width);
      return result;
    },
  };
}
