import axios from 'axios';

const initialState = {
  status: '',
  num: false,
  rImp: null,
  assignments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_FETCH_REQUEST':
      console.log('in ASSIGNMENT_FETCH_REQUEST =>', action.payload);
      return Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        rImp: action.payload.imp,
        assignments: action.payload.assignments
      })

    case 'ASSIGNMENT_FETCH_FAILED':
      console.log('in ASSIGNMENT_FETCH_FAILED =>', action.payload);
      return Object.assign({}, state, {
        status: action.status,
        num: action.id,
        rImp: action.imp,
        assignments: action.payload
      })

    case 'CREATE_ASSIGNMENT':
      console.log('in CREATE_ASSIGNMENT:', action);
      // var a = action.assignments;
      // a.push(action.payload);
      // console.log('a=',a);
      axios.post('api/assignments', { c: action.assignments.length, assignment: action.assignments, id: action.id, imp: action.imp })
        .catch(err => console.log('in axios could not POST ASSIGNMENTS:', err));

      return Object.assign({}, state, {
        num: action.id,
        rImp: action.imp,
        assignments: action.assignments
      })

    default:
      return state
  }
}
