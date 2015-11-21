import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import login                  from './login';
import list                   from './list';
import detail                 from './detail';
import create                 from './create';

export default combineReducers({
	login,
	list,
	detail,
	create,
	router: routerStateReducer
});
