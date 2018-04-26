import axios from 'axios';

export const CreateAssignment = (assignment, id, imp) => {
  const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
  return {
    type: CREATE_ASSIGNMENT,
    payload: assignment,
    id,
    imp
  };
}