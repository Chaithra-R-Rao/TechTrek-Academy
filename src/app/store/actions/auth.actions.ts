import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; email: string; role: string }>() // ✅ Include role
);

export const logout = createAction('[Auth] Logout');

// import { createAction, props } from '@ngrx/store';

// export const loginSuccess = createAction(
//   '[Auth] Login Success',
//   props<{ token: string; email: string }>() // ✅ Include email in login action
// );

// export const logout = createAction('[Auth] Logout');
