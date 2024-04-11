import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent },
];
