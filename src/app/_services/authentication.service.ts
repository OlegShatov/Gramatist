import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import {User} from 'app/_models';
import {Router} from '@angular/router';

export interface UserDetails {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private token: string;

    constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    private saveToken(token: string): void {
        localStorage.setItem('usertoken', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken');
        }
        return this.token;
    }

    getUserDetails(): User {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/login');
    }
}
