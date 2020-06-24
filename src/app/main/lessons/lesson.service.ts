import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
        private http: HttpClient
  ) {}
    // Gets all lessons
    getLessons() {
        return this.http.get(`${environment.apiUrl}/lessons`);
    } // getLessons

    getPhrases(id) {
        return this.http.get(`${environment.apiUrl}/phrases/${id}`);
    }
}
