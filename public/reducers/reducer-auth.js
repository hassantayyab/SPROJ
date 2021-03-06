import { FetchUser } from '../actions/fetchUser';

const initialState = {
  payload: null,
  status: false
}

export default function (state = initialState, action) {
  // console.log('in reducer-auth:',action);
  switch (action.type) {
    case 'FETCH_USER':
      // console.log('in FETCH_USER:', action);
      const requested = Object.assign({}, state, {
        status: true,
        payload: action.payload
      })

      if (action.payload)
        return requested;
      else
        return { payload: false, status: false };

    default:
    // console.log('in default:', action);
      return state;
  }
}