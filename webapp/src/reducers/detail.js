import { createReducer }     from '../utils';
import { TOGGLE_DETAIL } from 'constants/detail';

const initialState = null;
export default createReducer(initialState, {
  [TOGGLE_DETAIL] : (state, payload) => {
  	if (state && state.id == payload.id) {
  		return null;
  	} else {
  		return payload;
  	}
  }
});
