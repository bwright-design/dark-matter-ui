import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DarkNetComponent} from "./pages/dark-net/dark-net.component";

export const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'data', component: DarkNetComponent},
];
