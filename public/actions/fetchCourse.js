export const CourseFetchRequest = (user) => {
  const FETCH_REQUEST = 'COURSE_FETCH_REQUEST'
  // return (dispatch) => {
  //   axios
  //     .get('/api/courses' + '/' + user.googleId)
  //     .then(res => dispatch({ type: FETCH_REQUEST, status: "some", payload: res.data }))
  //     .catch(err => console.log('ERROR in axios.get courses:', err));
  // };
  return {
    type: FETCH_REQUEST,
    state: 'some',
    payload: user
  };
}