export const CreateAssignment = (assignments, assignment, id, imp) => {
  const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
  assignments.push(assignment);
  return {
    type: CREATE_ASSIGNMENT,
    status: 'created',
    payload: assignment,
    assignments,
    id,
    imp
  };
}