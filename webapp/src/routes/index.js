import React                 from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import ListView              from 'views/ListView';
import CreateView              from 'views/CreateView';

export default (
	<Router>	
		<Route path='/' component={CoreLayout}>
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
