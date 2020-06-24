import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import {LessonsComponent} from './lessons.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from '../../fake-db/fake-db.service';
import {LessonService} from './lesson.service';

const routes: Routes = [
    {
        path     : 'lessons',
        component: LessonsComponent
    }
];

@NgModule({
    declarations: [
        LessonsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
    ],
    providers: [LessonService]
})
export class LessonsModule
{
}
