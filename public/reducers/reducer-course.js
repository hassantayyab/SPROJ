import axios from 'axios';

const initialState = {
  status: '',
  num: false,
  courses: null
}

var x = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COURSE_FETCH_REQUEST':
      // console.log('in COURSE_FETCH_REQUEST =>', action.payload);
      var requested = Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        courses: action.payload.courses
      })
      if (action.payload) {
        x = action.payload.courses;
        return requested;
      }
      else
        return state;
      
    case 'FETCH_ALL_COURSES':
      var allCourses = []
      // console.log('in FETCH_ALL_COURSES =>', action.payload);
      for (let i = 0; i < action.payload.length; i++) {
        for (let j = 0; j < action.payload[i].courses.length; j++) {
          allCourses.push(action.payload[i].courses[j]);
        }
      }
      // console.log(action.payload)
      var requested = Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        courses: allCourses
      })
      if (action.payload) {
        x = allCourses;
        return requested;
      }
      else
        return state;

    case 'CREATE_COURSE':
      // console.log('in CREATE_COURSE:', action.payload);
      x.push(action.payload);
      axios.post('api/courses', { c: x.length, course: x, id: action.id })
        .catch(err => console.log('in axios could not POST COURSES:', err));
        
      return Object.assign({}, state, {
        num: action.id,
        courses: x
      })

    default:
      return state
  }
}
