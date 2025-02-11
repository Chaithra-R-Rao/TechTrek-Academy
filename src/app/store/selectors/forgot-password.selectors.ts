import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ForgotPasswordState } from '../reducers/forgot-password.reducer';

// First, select the feature state
export const selectForgotPasswordState = createFeatureSelector<ForgotPasswordState>('forgotPassword');

// Now, select the specific email property from the state
export const selectForgotPasswordEmail = createSelector(
  selectForgotPasswordState,
  (state) => state.email
);
