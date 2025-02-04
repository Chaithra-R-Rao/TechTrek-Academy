import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.actions';

export interface UserState {
  fullName: string;
  email: string;
}

const initialState: UserState = {
  fullName: '',
  email: ''
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, ...user }))
);
