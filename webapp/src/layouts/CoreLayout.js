import React from 'react';
import 'styles/core.scss';

export default class CoreLayout extends React.Component {
	static propTypes = {
		children : React.PropTypes.element
	}

	render () {
		return (
			<div className='page-container'>
				<header>
					<span className="logo">si<b>ag</b>a</span> 
				</header>
				<div className='view-container'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
