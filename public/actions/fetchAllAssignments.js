import axios from 'axios';

//define action within an action creator
export const FetchAllAssignments = () => {
  const FETCH_ALL_ASSIGNMENTS = 'FETCH_ALL_ASSIGNMENTS'
  // console.log('in COURSE_FETCH_ALL_ASSIGNMENTS');
  return (dispatch) => {
    axios
      .get('/api/assignmentsAll')
      .then(res => dispatch({ type: FETCH_ALL_ASSIGNMENTS, status: "all", payload: res.data }))
      .catch(err => console.log('ERROR in axios.get all assignments:', err));
  };
}