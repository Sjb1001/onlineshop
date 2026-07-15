import { createAction, props } from '@ngrx/store';

export interface UserProfile {
  token: string;
  role: string;
  fullname: string;
  userId: string;
  message?: string;
}

// Login Actions
export const login = createAction('[Auth] Login', props<{ credentials: any }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: UserProfile }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// Register Actions
export const register = createAction('[Auth] Register', props<{ userData: any }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ message: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

// Logout Action
export const logout = createAction('[Auth] Logout');
