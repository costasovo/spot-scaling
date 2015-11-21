import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import login                  from './login';
import list                   from './list';

export default combineReducers({
	login,
	list,
	router: routerStateReducer
});
