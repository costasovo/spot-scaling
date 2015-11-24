import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import listActions            from 'actions/list';
import detailActions          from 'actions/detail';
import { getHistory }         from 'utils';
import { Link } from 'react-router';
import Detail              from 'components/Detail';
//import GroupsList              from 'components/GroupsList';

const mapStateToProps = (state) => ({
	routerState : state.router,
	listState: state.list,
	loginState: state.login,
	detailState: state.detail
});
const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(listActions, dispatch),
	detailActions: bindActionCreators(detailActions, dispatch)
});

export class ListView extends React.Component {
	static propTypes = {
		actions  : React.PropTypes.object,
		detailActions  : React.PropTypes.object,
		listState  : React.PropTypes.array,
		detailState  :  React.PropTypes.object,
		loginState  :  React.PropTypes.object
	}

	componentWillMount() {
		if (!this.props.loginState) {
			getHistory().pushState(null, '/');
		} else {
			this.props.actions.loadList(this.props.loginState.accessKey, this.props.loginState.secret);
		}
	}

	render () {
		var listNodes = this.props.listState.map( (item) => {
			var elbs = item.LoadBalancerNames.toString();
				
			var rowClass = '';
			if (this.props.detailState && this.props.detailState.id == item.id) rowClass += ' active'

			return (
				<tr className={rowClass} key={item.id} onClick={() => this.props.detailActions.toggle(item)}>
					<td>{item.Name}</td>
					<td>{item.DesiredCapacity} ({item.MinSize}/{item.MaxSize})</td>
					<td>{item.stats && <strong>$ {item.stats.savingsMoth} ({item.stats.savingsPercentage}%)</strong>}</td>
					<td>{item.stats && item.stats.runningCLassic}</td>
					<td>{item.stats && item.stats.runningSpot}</td>
					<td>{item.LaunchConfigurationName}</td>
					<td>{elbs}</td>
				</tr>
			)
		});

		return (
			<div className='container'>
				<h1>Autoscaling Groups</h1>
				<Link className="btn btn-primary" to={`/create`}>create new autoscaling group</Link>
				&nbsp;<a className="btn btn-default" onClick={() => this.props.actions.loadList(this.props.loginState.accessKey, this.props.loginState.secret)}>refresh</a>
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Desired capacity (Min/Max)</th>
							<th>Month savings</th>
							<th>Non-spot i. count</th>
							<th>Spot i. count</th>
							<th>Launch Config.</th>
							<th>Load Balancers</th>
						</tr>
					</thead>
					<tbody>
						{listNodes}
					</tbody>
				</table>

				<Detail />

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
