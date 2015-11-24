import React                 from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import LoginLayout            from 'layouts/LoginLayout';
import HomeView              from 'views/HomeView';
import ListView              from 'views/ListView';
import CreateView              from 'views/CreateView';

export default (
	<Router>	
		<Route path='/' component={LoginLayout}>
			<IndexRoute component={HomeView} />
		</Route>
		<Route path='list' component={CoreLayout}>
			<IndexRoute component={ListView} />
		</Route>
		<Route path='create' component={CoreLayout}>
			<IndexRoute component={CreateView} />
		</Route>
	</Router>
);
