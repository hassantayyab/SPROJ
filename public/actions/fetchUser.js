import axios from 'axios';
// import { FETCH_USER } from './types';

export const FetchUser = (user) => {
  const FETCH_USER = 'FETCH_USER'
  // console.log('in fetchUser action')
  return {
    type: FETCH_USER,
    payload: user
  }
}