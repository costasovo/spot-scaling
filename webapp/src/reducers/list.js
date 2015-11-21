import { createReducer }     from '../utils';
import { LIST_LOADED }       from 'constants/list';

const initialState = [];
export default createReducer(initialState, {
  [LIST_LOADED] : (state, payload) => {
  	if (payload && payload) {
  		return payload;
  	}
  	return state;
  }
});
