import { createReducer, on } from '@ngrx/store';
import { sendResetEmail, sendResetEmailSuccess, sendResetEmailFailure } from '../actions/forgot-password.actions';

export interface ForgotPasswordState {
  email: string | null;  // ✅ Store email in state
  loading: boolean;
  error: string | null;
}

const initialState: ForgotPasswordState = {
  email: null,
  loading: false,
  error: null
};

export const forgotPasswordReducer = createReducer(
  initialState,
  on(sendResetEmail, (state, { email }) => ({  // ✅ Store email when sending request
    ...state,
    email,
    loading: true,
    error: null
  })),
  on(sendResetEmailSuccess, (state, { email }) => ({ // ✅ Store email when success
    ...state,
    email,
    loading: false
  })),
  on(sendResetEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

