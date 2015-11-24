import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import detailActions           from 'actions/detail';

const mapStateToProps = (state) => ({
	detailState : state.detail
});

const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(detailActions, dispatch)
});

export class Detail extends React.Component {

	render () {
		var tags, elbs, termPols, vpcZones = null;
		if (this.props.detailState) {
			tags = this.props.detailState.Tags.map((tag) => { return tag.Value;}).join(', ');
			elbs = this.props.detailState.LoadBalancerNames.join(', ');
			termPols = this.props.detailState.TerminationPolicies.join(', ');
			vpcZones = this.props.detailState.VPCZoneIdentifier.join(', ');
			if (this.props.detailState.logs) {
				var i=0;
				var logs = this.props.detailState.logs.map( (log) => {	
					return (
						<tr key={i++}><td>{log}</td></tr>
					)
				});
			}
		}


		return (
			<div>
			{ 
				this.props.detailState &&
				<div>
					<h3>
						{this.props.detailState.Name}
						&nbsp; <a className="btn btn-default" onClick={() => this.props.actions.toggle(this.props.detailState)}>hide details</a>
					</h3>

					<table className="table table-bordered">
						<tbody>
							<tr>
								<th>Name</th>
								<td>{this.props.detailState.Name}</td>
								<th>Id</th>
								<td>{this.props.detailState.id}</td>
							</tr>
							<tr>
								<th>Launch Config. Name</th>
								<td>{this.props.detailState.LaunchConfigurationName}</td>
								<th>Health C. Grace Period</th>
								<td>{this.props.detailState.HealthCheckGracePeriod}</td>
							</tr>
							<tr>
								<th>Desired capacity</th>
								<td>{this.props.detailState.DesiredCapacity}</td>
								<th>Load Balancers</th>
								<td>{elbs}</td>
							</tr>
							<tr>
								<th>Max size</th>
								<td>{this.props.detailState.MaxSize}</td>
								<th>Tags</th>
								<td>{tags}</td>
							</tr>
							<tr>
								<th>Min size</th>
								<td>{this.props.detailState.MinSize}</td>
								<th>Termination Policies</th>
								<td>{termPols}</td>
							</tr>
							<tr>
								<th>Min Non-spot count</th>
								<td>{this.props.detailState.MinClassicSize}</td>
								<th>VPC Zones</th>
								<td>{vpcZones}</td>
							</tr>
							{this.props.detailState.stats && 
								<tr>
									<th>Month savings</th>
									<td><strong>$ {this.props.detailState.stats.savingsMoth}</strong></td>
									<th>Saving percentage</th>
									<td>{this.props.detailState.stats.savingsPercentage}%</td>
								</tr>
							}
						</tbody>
					</table>

					<h4>Logs</h4>
					<table className="table table-condensed">
					<tbody>
						{logs}
					</tbody>
					</table>
				</div>
			}
			</div>	
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);