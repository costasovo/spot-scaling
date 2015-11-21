import { createReducer }     from '../utils';
import { LOGIN }             from 'constants/login';

const initialState = null;
export default createReducer(initialState, {
  [LOGIN] : (state, payload) => {
  	state = {
  		accessKey: payload.accessKey,
  		secret: payload.secret
  	};
  	return state
  }
});
