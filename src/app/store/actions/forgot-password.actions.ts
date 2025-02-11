import { createAction, props } from '@ngrx/store';

export const sendResetEmail = createAction(
  '[Forgot Password] Send Reset Email',
  props<{ email: string }>()
);

export const sendResetEmailSuccess = createAction(
  '[Forgot Password] Send Reset Email Success',
  props<{ email: string }>() // ✅ Store the email when successful
);

export const sendResetEmailFailure = createAction(
  '[Forgot Password] Send Reset Email Failure',
  props<{ error: string }>()
);
