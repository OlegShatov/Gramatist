import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class SelectLessonService {
    baseUrl = 'http://mybackend.com/api/';
    lessonsEndpoint = 'lessons';


    constructor(private http: HttpClient) {
    }


    // Gets all lessons
    getLessons() {
        return this.http.get(this.baseUrl + this.lessonsEndpoint);
    } // getLessons
}
