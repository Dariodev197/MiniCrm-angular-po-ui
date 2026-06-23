import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../classes/profile'
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    
    private profile$ = new BehaviorSubject<Profile>(new Profile());
    private profile: Profile = new Profile();
    private url: string = environment.url
    private http = inject(HttpClient)
    private user: any;
    
    public getProfile() {
        return this.profile$.asObservable();
    }

    public loadProfile(username: string) {

        this.http.get(`${this.url}/users/${username}`)
        .subscribe({
            next: value =>{
                this.user = value;
                this.profile.coduser = this.user.id;
                this.profile.username = this.user.userName;
                this.profile.name = this.user.displayName
                Array.isArray(this.user.emails) ? this.profile.email = this.user.emails[0].value : null;
                this.profile$.next({...this.profile});
                this.http.get<any>(`${this.url}/curso/api/vendedor/${this.profile.coduser}`)
                .subscribe({
                    next: value => this.profile.vendedor = value.codigo,
                    error: err => console.log(err),
                   complete: () => this.profile$.next({...this.profile}) 
                })
            },
            error: err => console.log(err),
            complete: () => {}
        })
            

    }
}