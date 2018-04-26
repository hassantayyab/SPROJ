import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { CreateCourse } from '../actions/createCourse';
import CourseForm from './courseForm';
import { CourseFetchSuccess, CourseFetchRequest, CourseFetchFailure } from '../actions/fetchCourse';
import {FetchAllCourses} from '../actions/fetchAllCourses';
import { FetchUser } from '../actions/fetchUser';
import Popup from '../containers/container-popup';

var id;
var fetchId;
var c = 0;

class Courses extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isPopupOpen: false,
			// userId: this.props.auth.googleId,
			user: this.props.auth
		};
	}

	getUser() {
		axios
			.get('/auth/current_user')
			.then(res => {
				this.props.FetchUser(res.data);
			})
			.catch(err => console.log('in axios could not fetch User:', err));
	}

	componentDidMount() {
		this.getUser();
	}

	renderContent() {
		// console.log('in courses this.props.auth:', user);	
		const user = this.props.auth;
		if (user) {
			id =  this.props.auth.googleId;
			
		// console.log('in courses this.state.auth:', this.props.auth)
			// id = this.props.auth.googleId;
			switch (user.userType) {
				// ***STUDENT PAGE***
				case 0:
					this.props.FetchAllCourses();
					if (this.props.courses) {
						var list = this.props.courses.map((course, index) => {
							return (
								<li key={index}>
									<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/assignments${index + 1}`}>
										{course}
									</Link>
								</li>
							);
						});
						return list;
					} else {
						return (
							<div>	
								No Courses Available
							</div>
						);
					}
				// ***INSTRUCTOR PAGE***
				case 1:
					this.props.CourseFetchRequest(this.props.auth);
					// Display Courses List
					if (id === fetchId) {
						var list = this.props.courses.map((course, index) => {
							return (
								<li key={index}>
									<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/assignments${index + 1}`}>
										{course}
									</Link>
								</li>
							);
						});
						// Add Course Button
						list.push(
							<ul id="content">
								<li><a onClick={() => this.openPopup()} className="card-panel hoverable purple darken-4 btn" id='google-btn'>Create Course</a></li>
							</ul>
						);
						return list;
					} else {
						return (
							<ul id="content">
								<li><a onClick={() => this.openPopup()} className="card-panel hoverable purple darken-4 btn" id='google-btn'>Create Course</a></li>
							</ul>
						);
					}

				default:
					break;
			}
		}
	}

	render() {
		return (
			<div>

				<div id="sign-div">
					<div id='div-title'>
						<h4 id='h-title' className='cyan-text text-lighten-5'>
							Courses
						</h4>
					</div>
					<ul id="content">
						{this.renderContent()}
					</ul>
					{/* PopUp Box */}
					<Popup isOpen={this.state.isPopupOpen} onClose={() => this.closePopup(event)}>
						<h5 id="popup-comment">Course Name</h5>
						<form>
							<input id="submit-text" type="text" required ref="newItem" autoFocus />
							<input id="submit" type="submit" value="Course Name" onClick={() => { this.closePopup(event); this.props.CreateCourse(this.refs.newItem.value, id, c) }} />
						</form>
					</Popup>
				</div>
			</div>
		);
	}

	openPopup() {
		this.setState({ isPopupOpen: true })
	}

	closePopup(event) {
		event.preventDefault();
		this.setState({ isPopupOpen: false, able: true })
	}
};

function mapStateToProps(state) {
	// console.log('state in courses:', state)
	if (state.courses) {
		c = state.courses.courses.length;
		fetchId = state.courses.num;
	}
	if (state.auth.payload) {
		id = state.auth.payload.googleId;
	}
	return {
		auth: state.auth.payload,
		courses: state.courses.courses,
		status: state.courses.status
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		CreateCourse,
		CourseFetchRequest,
		CourseFetchSuccess,
		CourseFetchFailure,
		FetchAllCourses,
		FetchUser
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Courses);
