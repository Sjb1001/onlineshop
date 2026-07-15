import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),

tap(action => console.log("🔥 LOGIN ACTION RECEIVED", action)),

      mergeMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((res: any) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.role);
            localStorage.setItem("fullname", res.fullname);
            localStorage.setItem("userId", res.userId);
            return AuthActions.loginSuccess({ user: res });
          }),
          catchError((err) => of(AuthActions.loginFailure({ error: err.error?.message || "Invalid Email or Password" })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => {
        alert("Login Successful!");
        if (user.role === "customer") this.router.navigate(['/home']);
        else if (user.role === "seller") this.router.navigate(['/seller']);
        else if (user.role === "admin") this.router.navigate(['/admin']);
        else if (user.role === "courier") this.router.navigate(['/courier']);
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => alert(error))
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register(action.userData).pipe(
          map(() => AuthActions.registerSuccess({ message: "Registration Successful!" })),
          catchError((err) => of(AuthActions.registerFailure({ error: err.error?.message || "Registration failed." })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(({ message }) => {
        alert(message);
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerFailure),
      tap(({ error }) => alert(error))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("fullname");
        localStorage.removeItem("userId");

        this.router.navigate(['/login']);
      })
    ),
  { dispatch: false }
);
}
