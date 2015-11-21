import { createReducer }     from '../utils';
import { LOAD_FORM_DATA, CREATE_GROUP }    from 'constants/create';

const initialState = {
	formData: null,
	created: false
};
export default createReducer(initialState, {
  [LOAD_FORM_DATA] : (state, payload) => {
  	if (payload) {
  		payload.launchConfigurations = payload.launchConfigurations.filter((it) => {
  			return it.id.indexOf('_spot') == -1
  		});
  		return {
  			formData: payload,
  			created: false
  		}
  	}
  	return state;
  },
  [CREATE_GROUP] : (state, payload) => {
  	
	return {
  			formData: state.formData,
  			created: true
  	}
  }
});
