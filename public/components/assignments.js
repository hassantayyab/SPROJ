import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { CreateAssignment } from '../actions/CreateAssignment';
import { AssignmentFetchRequest, AssignmentFetchFailed } from '../actions/fetchAssignment';
import { FetchAllAssignments } from '../actions/fetchAllAssignments';
import { FetchUser } from '../actions/fetchUser';
import Popup from '../containers/container-popup';


class Assignments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// impValue: null,
			isPopupOpen: false,
			assignments: [],
			user: null
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser() {
		axios.get('/auth/current_user')
			.then(res => {
				this.setState({
					user: res.data
				})
				if (this.state.user.userType == 1) {
					this.fetchAssignments();
				} else {
					console.log('in else')
					this.fetchAllAssignments();
				}
			})
			.catch(err => console.log('in axios Assignments could not fetch User:', err));
	}

	fetchAllAssignments() {
		axios.get('/api/assignmentsAll' + '/' + this.props.imp)
			.then(res => {
				console.log('all fetched Assignments =>', res.data);
				if (res.data) {
					this.props.AssignmentFetchRequest(res.data);
					this.setState({
						assignments: res.data.assignments
					})
				}
				// else {
				// 	this.props.AssignmentFetchFailed([], this.state.user.googleId, this.props.imp)
				// }
			})
			.catch(err => console.log('ERROR in axios.get assignments:', err));
	}

	fetchAssignments() {
		axios.get('/api/assignments' + '/' + this.state.user.googleId + '/' + this.props.imp)
			.then(res => {
				console.log('fetched Assignments =>', res.data);
				if (res.data) {
					this.props.AssignmentFetchRequest(res.data);					
					this.setState({
						assignments: res.data.assignments
					})
				}
				else {
					this.props.AssignmentFetchFailed([], this.state.user.googleId, this.props.imp)
				}
			})
			.catch(err => console.log('ERROR in axios.get assignments:', err));
	}

	renderContent() {
		// const user = this.props.auth;
		if (this.state.user) {
			// id = this.state.user.googleId;
			switch (this.state.user.userType) {
				// ***STUDENT PAGE***
				case 0:
					// if (m2 == 0) {
					// 	this.fetchAllAssignments();
					// 	console.log('fetchAssignments called!');
					// 	m2++;
					// }
					// this.props.AssignmentFetchRequest(this.props.auth, this.props.imp);
					if (this.props.imp == this.props.rImp) {
						var list = this.state.assignments.map((assignment, index) => {
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
					// console.log('imp and rImp=', this.props.imp, this.props.rImp);
					if (this.props.fetchId && this.props.imp == this.props.rImp) {
						// console.log('in case 1:',this.props.assignments)
						var list = this.state.assignments.map((assignment, index) => {
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
							<input id="submit" type="submit" value="Assignment Name" onClick={(e) => { this.closePopup(e); this.props.CreateAssignment(this.state.assignments, this.refs.newItem.value, this.state.user.googleId, this.props.imp) }} />
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
		this.setState({ isPopupOpen: false })
	}
};

function mapStateToProps(state, ownProps) {
	console.log('state.assignments in mapStateToProps =>', state.assignments)
	return {
		auth: state.auth.payload,
		imp: ownProps.match.params.filter,	// course number
		assignments: state.assignments.assignments,
		fetchId: state.assignments.num,
		rImp: state.assignments.rImp,
		status: state.assignments.status
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		CreateAssignment,
		AssignmentFetchRequest,
		AssignmentFetchFailed,
		FetchAllAssignments,
		FetchUser,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Assignments);
