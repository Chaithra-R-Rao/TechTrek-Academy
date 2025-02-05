import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;  // ✅ Store role in the state
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  email: localStorage.getItem('userEmail'),
  role: localStorage.getItem('userRole'), // ✅ Retrieve role from local storage
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, email, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role); // ✅ Store role in local storage

    return { ...state, token, email, role };
  }),
  on(logout, () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole'); // ✅ Remove role on logout

    return { token: null, email: null, role: null };
  })
);



// import { createReducer, on } from '@ngrx/store';
// import { loginSuccess,logout } from '../actions/auth.actions';

// export interface AuthState {
//   email: string | null;
//   role: string | null;
//   isAuthenticated: boolean;
// }

// export const initialAuthState: AuthState = {
//   email: localStorage.getItem('userEmail'),
//   role: localStorage.getItem('userRole'),
//   isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
// };

// export const authReducer = createReducer(
//   initialAuthState,
//   on(loginSuccess, (state, { email, role }) => {
//     localStorage.setItem('isAuthenticated', 'true');
//     localStorage.setItem('userEmail', email);
//     localStorage.setItem('userRole', role);
//     return { email, role, isAuthenticated: true };
//   }),
//   on(logout, () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userRole');
//     return { email: null, role: null, isAuthenticated: false };
//   })
// );
