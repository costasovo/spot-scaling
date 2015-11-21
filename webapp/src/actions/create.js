import { LOAD_FORM_DATA, CREATE_GROUP } from 'constants/create';

var formLoaded = function(formData) {
	return {
		type: LOAD_FORM_DATA,
		payload: formData
	}
}

export default {
  loadFormData: (accessKey, secret) => (dispatch) => {
	setTimeout(() => {
		// Yay! Can invoke sync or async actions with `dispatch`
	 	dispatch(formLoaded(['item1']));
	}, 1000);
  }
};
