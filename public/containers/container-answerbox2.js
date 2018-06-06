import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectText } from '../actions/select';
import Popup from './container-popup';
import { submit } from '../actions/submit';
// import css from "../../node_modules/highlight.js/styles/monokai.css";
import renderHTML from 'react-render-html';
// import { deleteComment } from '../actions/delete';
import { FetchSuccess, FetchRequest, FetchFailure } from '../actions/fetch';
import { AnswerFetchSuccess, AnswerFetchRequest, AnswerFetchFailure } from '../actions/fetchAnswer';
import Highlight from 'react-highlight';
import Dropzone from 'react-dropzone';
import renderIf from 'render-if';

var comCount = 0;
var hiLiCount = 1;	// number of highlights
var userId;
var fetchId;

class AnswerBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			able: true,
			isPopupOpen: false,
			// count: hiLiCount,
			value: this.props.answers[this.props.id - 1],
			data: [],
			files: []
		};
	}

	onDrop(files) {
		const reader = new window.FileReader();
		reader.onload = (e) => {
			this.setState({ value: reader.result });
			this.props.AnswerFetchSuccess(reader.result, hiLiCount, this.props.id);
			console.log('reader.result=', reader.result);
		}
		reader.readAsText(files[0]);
	}

	redraw() {
		return { __html: this.state.value };
	}

	apiRequest() {
		console.log('in apiRequest:',this.props.id)
		axios.get('/api/answer' + '/' + this.props.id + '/' + 1)
			.then(res => {
				var answer = res.data.answer;
				console.log('in api RequestA:', answer);
				if (answer) {
					var hiLiCount = res.data.count;
					this.setState({ value: answer });
					this.props.AnswerFetchSuccess(answer, hiLiCount, this.props.id);
				}
			})
			.catch(e => {
				console.log('In axios.getA:', e);
			});

		axios.get('/api/ninjas' + '/' + this.props.id)
			.then(res => {
				var comments = res.data;
				console.log('in api Request:', comments);
				comCount = comments.length;
				this.props.FetchSuccess(comments, this.props.id);
			})
			.catch(e => {
				console.log('In axios.get:', e);
			});
	}

	dispatchFetchRequest() {
		this.props.FetchRequest();
		this.props.AnswerFetchRequest();
	}

	componentWillMount() {
		this.apiRequest();
		this.dispatchFetchRequest();
	}

	getList() {
		if (this.props.comments.status !== 'empty') {
			var comments = this.props.comments.comments[this.props.id - 1];
			comCount = comments.length;
			// console.log('in getList:', comments);
			var list = comments.map((comment, index) => {
				return (
					<div key={index}>
						<div id="comments">
							<li className="item-name">{comment}</li>
						</div>
					</div>
				);
			});
			return list;
		}
		return (
			<div></div>
		);
	}

	getButton() {
		if (this.props.auth) {
			userId = this.props.auth.googleId;
			switch (this.props.auth.userType) {
				case 0:
					return (<div></div>);
				case 1:
					return (
						<a className='btn-floating btn-large waves-effect waves-light red' disabled={this.state.able} onClick={() => this.openPopup()}><i className="material-icons">comment</i></a>
					);
				default:
					break;
			}
		}
	}

	getAnswer() {
		if (this.props.auth) {
			userId = this.props.auth.googleId;
			switch (this.props.auth.userType) {
				case 0:
					if (this.state.value) {
						// console.log('in here')
						return (
							<div id='answer' className='col s7'>
								<Highlight>
									{renderHTML(this.state.value)}
								</Highlight>
							</div>
						);
					}
					else {
						return (
							<div className="answer">
								<Dropzone onDrop={this.onDrop.bind(this)}>
									<p>Try dropping some files here, or click to select files to upload.</p>
								</Dropzone>
							</div>
						);
					}
				case 1:
					return (
						<div id='answer' className='col s7' onMouseUp={() => { this.enable(); this.props.selectText(document.getElementById('answer'), hiLiCount, this.props.id) }}>
							<Highlight>
								{renderHTML(this.state.value)}
							</Highlight>
						</div>
					);
				default:
					break;
			}
		}
	}

	render() {
		return (
			<div className='row'>
				{/* AddComment Button */}
				<div id='addComment' className='col s1'>
					{this.getButton()}
				</div>
				{/* Answer */}
				{this.getAnswer()}
				{/* PopUp Box */}
				<Popup isOpen={this.state.isPopupOpen} onClose={() => this.closePopup(event)}>
					<h5 id="popup-comment">Enter Comment</h5>
					<form>
						<input id="submit-text" type="text" required ref="newItem" autoFocus />
						<input id="submit" type="submit" value="Add Comment" onClick={() => { this.closePopup(event); this.props.submit(this.refs.newItem.value, comCount, this.props.id) }} />
					</form>
				</Popup>
				{/* Comments List */}
				<div id='commentsDiv' className='col s3'>
					<ul>
						{this.getList()}
					</ul>
				</div>
			</div>
		);
	}

	enable() {
		this.setState({ able: false })
	}

	openPopup() {
		this.setState({ isPopupOpen: true })
	}

	closePopup(event) {
		event.preventDefault();
		this.setState({ isPopupOpen: false, able: true })
	}
}

function mapStateToProps(state, ownProps) {
	if (state.auth.payload) {
		hiLiCount = state.answer.hiLiCount[ownProps.match.params.filter - 1];
		userId = state.auth.payload.googleId;
	}

	return {
		auth: state.auth.payload,
		id: ownProps.match.params.filter,
		comments: state.comment,
		answers: state.answer.answers
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		selectText,
		submit,
		FetchRequest,
		FetchSuccess,
		FetchFailure,
		AnswerFetchRequest,
		AnswerFetchSuccess,
		AnswerFetchFailure
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AnswerBox);
