import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

export default class LoginForm extends React.Component {

  static propTypes = {}

  render () {
    return (
      <form>
        <div className="form-group">
          <label for="aws-key">AWS Key</label>
          <input type="text" className="form-control" id="aws-key" placeholder="AWS Access Key" />
        </div>
        <div className="form-group">
          <label for="aws-secret">AWS Secret</label>
          <input type="text" className="form-control" id="aws-secret" placeholder="AWS Secret" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

