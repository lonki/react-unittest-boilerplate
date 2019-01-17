import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';

export default () => {
  const appReducer = combineReducers({
    app,
    auth,
  });

  return (state, action) => {
    return appReducer(state, action);
  };
};
