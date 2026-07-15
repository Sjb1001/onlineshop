import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { UserProfile } from './auth.actions';

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, () => initialState)
);
