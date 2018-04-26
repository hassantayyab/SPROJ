import axios from 'axios';

var initialState = {
	status: '',
	hiLiCount: [1, 1, 1, 1],
	answers: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ANSWER_FETCH_REQUEST':
			return Object.assign({}, state, {
				status: action.status
			})

		case 'ANSWER_FETCH_SUCCESS':
			console.log('in reducer-A:',action.answer);
			let dat = {
				id: action.id,
				hiLiCount: action.hiLiCount,
				answer: action.answer
			}
			axios.post('/api/answer', dat)
				.catch((err) => {
					console.log('Error in Answer Post:', err);
				});
			state.status = action.status;
			state.hiLiCount[action.id - 1] = action.hiLiCount;
			state.answers[action.id - 1] = action.answer;
			console.log('state.answers=',state.answers);
			return Object.assign({}, state, {
				status: action.status,
				answers: action.answer
			})

		case 'USER_SELECTED':
			// console.log('hiLiCount in reducer:', action.hiLiCount);
			let data = {
				id: action.id,
				hiLiCount: action.hiLiCount,
				answer: action.answer
			}

			axios.post('/api/answer', data)
				.catch((err) => {
					console.log('Error in Answer Post:', err);
				});
			
			state.hiLiCount[action.id - 1] = action.hiLiCount;			
			state.answers[action.id - 1] = action.answer;
			return Object.assign({}, state, {
				status: action.status
			})

		default:
			return state
	}
}
