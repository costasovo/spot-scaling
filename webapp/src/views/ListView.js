import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import listActions           from 'actions/list';
//import GroupsList              from 'components/GroupsList';

const mapStateToProps = (state) => ({
	routerState : state.router,
	listState: state.list,
	loginState: state.login
});
const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(listActions, dispatch)
});

export class ListView extends React.Component {
	static propTypes = {
		actions  : React.PropTypes.object,
		counter  : React.PropTypes.number
	}

	componentWillMount() {
		this.props.actions.loadList('aaa','bbb');
	}

	render () {
		var listNodes = this.props.listState.map( (item) => {
			return (
				<li key={item}>{item}</li>
			)
		});

		return (
			<div className='container'>
				<h1>Your autoscaling groups</h1>
				<ul>
					{listNodes}
				</ul>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
