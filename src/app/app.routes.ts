import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { TopbarHideComponent } from './layouts/topbar-hide/topbar-hide.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ForgotPasswordComponent } from './views/auth/forgot-password/forgot-password.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { TwoStepComponent } from './views/auth/two-step/two-step.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/dashboards/routes').then((m) => m.routes),
      },
      {
        path: 'features',
        loadChildren: () =>
          import('./views/features/routes').then((m) => m.routes),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes),
      },
      {
        path: 'app',
        loadChildren: () => import('./views/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path: 'forget-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
  {
    path: 'verification',
    component: TwoStepComponent,
    title: 'Two Step Verification',
  },
  {
    path: '',
    component: TopbarHideComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/errors/routes').then((m) => m.routes),
      },
    ],
  },
];
