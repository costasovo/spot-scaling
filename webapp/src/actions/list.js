import { LOAD_LIST, LIST_LOADED } from 'constants/list';
import axios                      from 'axios';

var listLoaded = function(listData) {
	return {
		type: LIST_LOADED,
		payload: listData
	}
}

export default {
  loadList: (accessKey, secret) => (dispatch) => {
  	var loading = axios.get(
  		'https://reuojbzc0k.execute-api.eu-west-1.amazonaws.com/prod/spot-scaling-group-list',
  		{
  			headers: {'X-Access-Secret': secret, 'X-Access-Key': accessKey}
  		}
  	);
  	loading.then( (response) => {
  		dispatch(listLoaded(response.data));
  	});
  }
};
