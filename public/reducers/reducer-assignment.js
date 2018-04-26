import axios from 'axios';

const initialState = {
  status: '',
  num: false,
  rImp: null,
  assignments: []
}

var x = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_FETCH_REQUEST':
      console.log('in ASSIGNMENT_FETCH_REQUEST =>', action.payload.imp);
      var requested = Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        rImp: action.payload.imp,
        assignments: action.payload.assignments
      })
      if (action.payload) {
        x = action.payload.assignments;
        return requested;
      }
      else
        return state;

    case 'FETCH_ALL_ASSIGNMENTS':
      var allAssignments = []
      console.log('in FETCH_ALL_ASSIGNMENTS =>', action.payload);
      for (let i = 0; i < action.payload.length; i++) {
        for (let j = 0; j < action.payload[i].assignments.length; j++) {
          allAssignments.push(action.payload[i].assignments[j]);
        }
      }
      // console.log(action.payload)
      var requested = Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        assignments: allAssignments
      })
      if (action.payload) {
        x = allAssignments;
        return requested;
      }
      else
        return state;

    case 'CREATE_ASSIGNMENT':
      console.log('in CREATE_ASSIGNMENT:', action.payload);
      x.push(action.payload);
      console.log('x =', x);
      axios.post('api/assignments', { c: x.length, assignment: x, id: action.id, imp: action.imp })
        .catch(err => console.log('in axios could not POST ASSIGNMENTS:', err));

      return Object.assign({}, state, {
        num: action.id,
        rImp: action.imp,
        assignments: [
          ...state.assignments,
          action.payload
        ]
      })

    default:
      return state
  }
}
