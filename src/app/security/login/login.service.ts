import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from 'app/app.api';
import { User } from './user.model';

import 'rxjs/add/operator/do';

@Injectable()
export class LoginService {

    user: User;

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .do(user => this.user = user)
    }


}