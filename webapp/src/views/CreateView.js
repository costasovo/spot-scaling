import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import createActions          from 'actions/create';
import { getHistory }         from 'utils';
import { Link }               from 'react-router'
//import GroupsList              from 'components/GroupsList';

const mapStateToProps = (state) => ({
	routerState : state.router,
	createState: state.create,
	loginState: state.login
});
const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(createActions, dispatch)
});

export class CreateView extends React.Component {

	constructor () {
		super()
		//Todo immutable js
		this.state = {
			HealthCheckGracePeriod: 300,
			DesiredCapacity: 1,
			TerminationPolicies: [ "ClosestToNextInstanceHour" ],
			LoadBalancerNames: [],
			VPCZoneIdentifier: []
		}
	}

	static propTypes = {
		actions  : React.PropTypes.object,
		createState :  React.PropTypes.object,
		loginState: React.PropTypes.object
	}

	componentWillMount() {
		if (!this.props.loginState) {
			getHistory().pushState(null, '/');
		}
		this.props.actions.loadFormData(this.props.loginState.accessKey, this.props.loginState.secret);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.actions.createGroup(this.state, this.props.loginState.accessKey, this.props.loginState.secret);
		//getHistory().pushState(null, '/list');
	}

	handleCheckboxChange = (event) => {
		var values = this.state[event.target.name].slice(0);
		var value = event.target.value
		if (event.target.checked) {
			if (values.indexOf(value) != -1) {
				return
			}
			values.push(value);
		} else {
			if (values.indexOf(value) == -1) {
				return
			}
			values.splice(values.indexOf(value), 1);
		}

		this.setState({[event.target.name]: values});
	}

	handleZoneChange = (vpc) => {
		this.setState({VPCZoneIdentifier: vpc.subnets.map((sn) => sn.id)});
	}

	render () {
		
		if (this.props.createState.formData) {
			var elbsCheckboxes = this.props.createState.formData.elbs.map( (elb) => {	
				return (
					<div key={elb.name} className="checkbox">
						<label>
					  		<input type="checkbox" name="LoadBalancerNames" value={elb.name} onChange={this.handleCheckboxChange}/> {elb.name}
						</label>
				  	</div>
				)
			});

			var vpcZones = this.props.createState.formData.vpcs.map( (vpc) => {	
				return (
					<div key={vpc.id} className="checkbox">
						<label>
					  		<input type="radio" name="VPCZoneIdentifier" value={vpc.id} onChange={() => this.handleZoneChange(vpc)}/> {vpc.name || vpc.cidr} ({vpc.id})
						</label>
				  	</div>
				)
			});

			var launchConfigs = this.props.createState.formData.launchConfigurations.map( (lc) => {	
				return (
					<option key={lc.id} value={lc.name}>{lc.name}</option>
				)
			});
		}

		return (
			<div className='container'>
				<h1>Create Autoscaling Group</h1>
				<Link to={`list`}>&lt; back to list of groups</Link>

				<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="Name">Name</label>
					<input type="text" className="form-control" name="Name" id="Name" placeholder="Type some name" required
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="DesiredCapacity">Desired Capacity</label>
					<input type="number" min="0" className="form-control" name="DesiredCapacity" id="DesiredCapacity" placeholder="Desired Capacity" required
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="HealthCheckGracePeriod">Health Check Grace Period [s]</label>
					<input type="number" min="0" className="form-control" value={this.state.HealthCheckGracePeriod} name="HealthCheckGracePeriod" id="HealthCheckGracePeriod" required
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="LaunchConfigurationName">Launch Configuration</label>
					<select  className="form-control" name="LaunchConfigurationName" id="LaunchConfigurationName" onChange={this.handleChange}>
						{launchConfigs}
					</select>
					
				</div>
				<div className="form-group">
					<label htmlFor="MaxSize">Max size</label>
					<input type="number" min="0" className="form-control" value={this.state.MaxSize} name="MaxSize" id="MaxSize" required placeholder="Max. number of instances"
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="MinSize">Min size</label>
					<input type="number" min="0" className="form-control" value={this.state.MinSize} name="MinSize" id="MinSize" required placeholder="Min. number of instances"
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="MinClassicSize">Min non-spot size</label>
					<input type="number" min="0" className="form-control" value={this.state.MinClassicSize} name="MinClassicSize" id="MinClassicSize" required placeholder="Min. number of non-spot instances"
					onChange={this.handleChange}
					/>
				</div>
				
				<div className="form-group">
					<h5>Load balancers</h5>
					{elbsCheckboxes}
			  	</div>

			  	<div className="form-group">
					<h5>VPC Zones</h5>
					{vpcZones}
			  	</div>
				
				<button type="submit" className="btn btn-success">Create</button>
			</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
