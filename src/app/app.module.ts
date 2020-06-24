import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SampleComponent} from './main/sample';
import {AuthGuard, ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterModule, Routes} from '@angular/router';
import {Role} from './_models';
import {LoginModule} from './main/login';
import {LessonsModule} from './main/lessons/lessons.module';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from './fake-db/fake-db.service';
import {LessonService} from './main/lessons/lesson.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/lessons/lessons.module').then(m => m.LessonsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        component: SampleComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'lessons',
        loadChildren: () => import('./main/lessons/lessons.module').then(m => m.LessonsModule),
        canActivate: [AuthGuard],
    },

    // otherwise redirect to home
    {   path: '**',
        redirectTo: '/',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        SampleComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        // InMemoryWebApiModule.forRoot(FakeDbService),
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        MatFormFieldModule,
        MatCheckboxModule,
        LoginModule,
        LessonsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider,
        LessonService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
