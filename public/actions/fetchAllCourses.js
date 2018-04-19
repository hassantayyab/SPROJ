import axios from 'axios';

//define action within an action creator
export const FetchAllCourses = () => {
  const FETCH_ALL_COURSES = 'FETCH_ALL_COURSES'
  // console.log('in COURSE_FETCH_ALL_COURSES');
  return (dispatch) => {
    axios
      .get('/api/coursesAll')
      .then(res => dispatch({ type: FETCH_ALL_COURSES, status: "all", payload: res.data }))
      .catch(err => console.log('ERROR in axios.get courses:', err));
  };
}