import axios from 'axios';

//define action within an action creator
export const AssignmentFetchRequest = (data) => {
  const FETCH_REQUEST = 'ASSIGNMENT_FETCH_REQUEST'
  // console.log('in ASSIGNMENT_FETCH_REQUEST');
  return {
    type: FETCH_REQUEST,
    payload: data
  };
}