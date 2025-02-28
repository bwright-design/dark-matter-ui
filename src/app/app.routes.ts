import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DarkNetComponent} from "./pages/dark-net/dark-net.component";
import {MapComponent} from "./pages/map/map.component";
import {ShipComponent} from "./pages/ship/ship.component";

export const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'net', component: DarkNetComponent},
    { path: 'map', component: MapComponent},
    { path: 'ship', component: ShipComponent},
];
