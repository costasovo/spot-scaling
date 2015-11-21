import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import createActions           from 'actions/create';
//import GroupsList              from 'components/GroupsList';

const mapStateToProps = (state) => ({
	routerState : state.router,
	listState: state.list,
	loginState: state.login
});
const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(createActions, dispatch)
});

export class CreateView extends React.Component {
	static propTypes = {
		actions  : React.PropTypes.object,
		counter  : React.PropTypes.number
	}

	componentWillMount() {
		this.props.actions.loadFormData('aaa','bbb');
	}

	render () {
	
		return (
			<div className='container'>
				<h1>Create Autoscaling Group</h1>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
