import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import loginActions           from 'actions/login';
import LoginForm              from 'components/LoginForm';


// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
	routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(loginActions, dispatch)
});
export class HomeView extends React.Component {
	static propTypes = {
		actions  : React.PropTypes.object,
		counter  : React.PropTypes.number
	}

	render () {
		return (
			<div className='container homepage'>
				<h1 className="text-center">
					<span className="logo">si<b>ag</b>a</span><br/>
				</h1>
				<p className='lead text-center'>Welcome.</p>
				<LoginForm />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
