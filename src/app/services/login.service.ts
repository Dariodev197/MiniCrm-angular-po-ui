import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginData } from '../classes/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private http = inject(HttpClient);
    private url: string = environment.url;
    private router = inject(Router);

    public senLogin (username: string, password: string): Observable<LoginData> {
        let urlLogin: string = `${this.url}/api/oauth2/v1/token?grant_type=password&username=${username}&password=${password}`;
        return this.http.post<LoginData>(urlLogin, null);
    }

    public refreshToken(refresh_token: string): Observable<LoginData> {
        let urlRefresh: string = `${this.url}/api/oauth2/v1/token?grant_type=refresh_token&refresh_token=${refresh_token}`;
        return this.http.post<LoginData>(urlRefresh, null);
    }
}
  
