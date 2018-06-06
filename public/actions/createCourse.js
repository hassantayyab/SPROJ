import axios from 'axios';

export const CreateCourse = (course, id) => {
  const CREATE_COURSE = 'CREATE_COURSE'
  const NULL = 'NULL'
  // console.log('in createCourse action', id);
  // if (c === 0) {
  //   return (dispatch) => {
  //     axios.post('api/courses', { c, course, id })
  //       .then(res => dispatch({ type: CREATE_COURSE, payload: course }))
  //       .catch(err => console.log('in axios could not POST COURSES:', err));
  //   }
  // }
  return { type: CREATE_COURSE, payload: course, id };

  // return (dispatch) => {
  //   axios.post('api/courses', { c, course, id })
  //     .then(res => dispatch({ type: CREATE_COURSE, payload: course }))
  //     .catch(err => console.log('in axios could not POST COURSES:', err));
  // }
}