import { LOAD_FORM_DATA, CREATE_GROUP } from 'constants/create';
import axios                            from 'axios';

var formLoaded = function(formData) {
	return {
		type: LOAD_FORM_DATA,
		payload: formData
	}
}

var groupCreated = function(data) {
	return {
		type: CREATE_GROUP,
		payload: data
	}
}

export default {
  loadFormData: (accessKey, secret) => (dispatch) => {
  	
  	var loading = axios.get(
  		'https://reuojbzc0k.execute-api.eu-west-1.amazonaws.com/prod/needed-resources',
  		{
  			headers: {'X-Access-Secret': secret, 'X-Access-Key': accessKey}
  		}
  	);
  	
  	loading.then( (response) => {
  		dispatch(formLoaded(response.data));
  	});
  },
  
  createGroup: (data, secret, accessKey) => (dispatch) => {
  	var saving = axios.post(
  		'https://reuojbzc0k.execute-api.eu-west-1.amazonaws.com/prod/spot-scaling-group',
  		data,
  		{
  			headers: {'X-Access-Secret': secret, 'X-Access-Key': accessKey}
  		}
  	);
  	saving.then( (response) => {
  		dispatch(groupCreated(data));
  	}).catch( (e) => {
  		console.error(e);
  	});
  }
};
