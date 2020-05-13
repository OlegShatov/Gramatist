import { Component, OnInit } from '@angular/core';
import {SelectLessonService} from './select-lesson.service';
import {Lesson} from '../../../fake-db/Lessons';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-select-lesson',
  templateUrl: './select-lesson.component.html',
  styleUrls: ['./select-lesson.component.scss']
})
export class SelectLessonComponent implements OnInit {
    lessons: object;


    constructor(private selectlessonservice: SelectLessonService) {}

    ngOnInit() {
        this.getAllLessons();
    }

    getAllLessons() {
        this.selectlessonservice.getLessons().subscribe((data: Lesson[]) => {
            this.lessons = data;
        });
    }

}
