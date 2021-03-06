import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { UserTypeRequest } from '../actions/userType';
// import { bindActionCreators } from 'redux';


class Login extends Component {
	render() {
		return (
			<div>
				{/* rest of page content */}
				<div id="sign-div">
					<h5 id='options' className='cyan-text text-darken-4'>Sign In Using Google As</h5>
					<div id="content">
						<ul>
							<li>
								<a id='google-btn' className="card-panel hoverable red darken-4 btn" href='/auth/google/student' style={{ width: '153px' }}>Student</a>
							</li>
							<li>
								<a id='google-btn' className="card-panel hoverable red darken-4 btn" href='/auth/google/instructor'>Instructor</a>
							</li>
						</ul>
					</div>
				</div>
				{/* footer */}
				<div id='footer'>
					<footer className="page-footer blue-grey darken-4">
						<div className="container">
							<div className="col l6 s12">
								<h5 className="blue-grey-text text-lighten-5">AutoGrader</h5>
								<p className="grey-text text-lighten-4">Make grading easy and fun.</p>
							</div>
						</div>
						<div className="footer-copyright blue-grey darken-3">
							<div className="container blue-grey-text text-lighten-5">© 2018 AutoGrader, All rights reserved.<a className="blue-grey-text text-lighten-5 right" href="#!">More Links</a>
							</div>
						</div>
					</footer>
				</div>
				{/* footer end */}
			</div>
		);
	};
};

export default Login;
