import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', component: HomeComponent },
];
