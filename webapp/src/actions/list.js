import { LOAD_LIST, LIST_LOADED } from 'constants/list';

var listLoaded = function(listData) {
	return {
		type: LIST_LOADED,
		payload: listData
	}
}

export default {
  loadList: (accessKey, secret) => (dispatch) => {
	setTimeout(() => {
		// Yay! Can invoke sync or async actions with `dispatch`
	 	dispatch(listLoaded(['item1']));
	}, 1000);
  }
};
