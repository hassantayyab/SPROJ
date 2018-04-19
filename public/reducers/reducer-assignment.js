import axios from 'axios';

const initialState = {
  assignments: [
    ['Assignment 1', 'Assignment 2'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5', 'Assignment 6'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
    ['Assignment 1'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3',],        
    ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5', 'Assignment 6'],
    ['Assignment 1', 'Assignment 2']          
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
