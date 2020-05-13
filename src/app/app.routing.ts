import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_helpers';
import {Role} from './_models';
import {LoginComponent} from './main/login/login.component';
import {SampleComponent} from './main/sample/sample.component';


const routes: Routes = [
    {
        path: '',
        component: SampleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: SampleComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '/' }
];

export const appRoutingModule = RouterModule.forRoot(routes);