import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { CreateAssignment } from '../actions/CreateAssignment';
import { AssignmentFetchRequest } from '../actions/fetchAssignment';
import { FetchAllAssignments } from '../actions/fetchAllAssignments';
import { FetchUser } from '../actions/fetchUser';
import Popup from '../containers/container-popup';

var id;
var fetchId;
var c = 0;
var x2 = 0;
// var x2 = 0;
// var imp;

class Assignments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isPopupOpen: false,
			impValue: this.props.rImp,
			user: this.props.auth
		};
	}

	getUser() {
		axios
			.get('/auth/current_user')
			.then(res => {
				this.props.FetchUser(res.data);
				this.getAssignments(res.data.googleId, res.data.userType);
			})
			.catch(err => console.log('in axios could not fetch User:', err));
	}

	componentDidMount() {
		this.getUser();
	}

	getAssignments(googleId, userType) {
		axios
			.get('/api/assignments' + '/' + googleId + '/' + this.props.imp)
			.then(res => {
				if (userType==1) {
					this.props.AssignmentFetchRequest(res.data);
				} else {
					this.props.FetchAllAssignments();
				}
			})
			.catch(err => console.log('ERROR in axios.get assignments:', err));
	}

	renderContent() {
		const user = this.props.auth;		
		if (user) {
			id = this.props.auth.googleId;

			switch (user.userType) {
				// ***STUDENT PAGE***
				case 0:
					// this.props.AssignmentFetchRequest(this.props.auth, this.props.imp);
					if (this.props.assignments) {
						var list = this.props.assignments.map((assignment, index) => {
							return (
								<li key={index}>
									<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/app${index + 1}`}>
										{assignment}
									</Link>
								</li>
							);
						});
						return list;
					} else {
						return (
							<div>
								No Assignments Available
							</div>
						);
					}
				// ***INSTRUCTOR PAGE***
				case 1:
					// Display Assignments List
					if (this.props.assignments) {
						console.log('imp and rImp=', this.props.imp, this.props.rImp);
						if (id === fetchId && this.props.rImp == this.props.imp) {
							var list = this.props.assignments.map((assignment, index) => {
								return (
									<li key={index}>
										<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/app${index + 1}`}>
											{assignment}
										</Link>
									</li>
								);
							});
							// Add Assignment Button
							list.push(
								<ul id="content">
									<li><a onClick={() => this.openPopup()} className="card-panel hoverable purple darken-4 btn" id='google-btn'>Create Assignment</a></li>
								</ul>
							);
							return list;
						} else {
							return (
								<ul id="content">
									<li><a onClick={() => this.openPopup()} className="card-panel hoverable purple darken-4 btn" id='google-btn'>Create Assignment</a></li>
								</ul>
							);
						}
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
							Assignments
						</h4>
					</div>
					<ul id="content">
						{this.renderContent()}
					</ul>
					{/* PopUp Box */}
					<Popup isOpen={this.state.isPopupOpen} onClose={() => this.closePopup(event)}>
						<h5 id="popup-comment">Assignment Name</h5>
						<form>
							<input id="submit-text" type="text" required ref="newItem" autoFocus />
							<input id="submit" type="submit" value="Assignment Name" onClick={(e) => { this.closePopup(e); this.props.CreateAssignment(this.refs.newItem.value, id, this.props.imp) }} />
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

function mapStateToProps(state, ownProps) {
	console.log('Course num:', ownProps.match.params.filter)
	if (state.assignments) {
		c = state.assignments.assignments.length;
		fetchId = state.assignments.num;
		// x = state.assignments.length;
	}
	if (state.auth.payload) {
		id = state.auth.payload.googleId;
	}
	return {
		auth: state.auth.payload,
		imp: ownProps.match.params.filter,
		assignments: state.assignments.assignments,
		rImp: state.assignments.rImp,
		status: state.assignments.status
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		CreateAssignment,
		AssignmentFetchRequest,
		FetchAllAssignments,
		FetchUser,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Assignments);
