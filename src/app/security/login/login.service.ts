import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from 'app/app.api';
import { User } from './user.model';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService {

    user: User;

    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);//Fica escutando as alterações de página
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .do(user => this.user = user)
    }

    //Redireciona para a tela de login
    handleLogin(path : string = this.lastUrl ): any {
        this.router.navigate(['/login', btoa(path)]) 
    }

    logout(): any {
        this.user = undefined;
    }
}