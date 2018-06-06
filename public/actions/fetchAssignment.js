export const AssignmentFetchRequest = (data) => {
  const FETCH_REQUEST = 'ASSIGNMENT_FETCH_REQUEST'
  return {
    type: FETCH_REQUEST,
    status: 'success',
    payload: data
  };
}

export const AssignmentFetchFailed = (assignment, id, imp) => {
  const FETCH_FAILED = 'ASSIGNMENT_FETCH_FAILED'
  return {
    type: FETCH_FAILED,
    status: 'failure',
    payload: assignment,
    id,
    imp
  };
}