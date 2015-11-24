import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import loginActions           from 'actions/login';
import { getHistory }         from 'utils';

const mapStateToProps = (state) => ({
	login : state.login,
	router: state.router
});

const mapDispatchToProps = (dispatch) => ({
	actions : bindActionCreators(loginActions, dispatch)
});

export class LoginForm extends React.Component {

	constructor () {
		super()

		//Todo immutable js
		this.state = {
			accessKey: null,
			secret: null
		}
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.actions.login(this.state.accessKey, this.state.secret);
		getHistory().pushState(null, '/list');
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="aws-key">AWS Access Key</label>
					<input type="text" className="form-control" name="accessKey" id="aws-key" placeholder="Can be found in security credentials..." required
					onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="aws-secret">AWS Secret</label>
					<input type="password" className="form-control" name="secret" id="aws-secret" placeholder="AWS Secret" required
					onChange={this.handleChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">Login</button>
			</form>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);