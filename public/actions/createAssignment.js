export const CreateAssignment = (assignments, assignment, id, imp) => {
  const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
  assignments.push(assignment);
  // console.log('in action:', assignments);  
  return {
    type: CREATE_ASSIGNMENT,
    status: 'created',
    payload: assignment,
    assignments,
    id,
    imp
  };
}