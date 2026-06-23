import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ProfileService } from './services/profile.service';

export const authGuard: CanActivateFn = (route, state) => {


    let router = inject(Router);
    let loginService = inject(LoginService)
    let username = localStorage.getItem('username');
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    let expires_in = localStorage.getItem('expires_in');
    let profileService = inject(ProfileService);

    if(!username){
        router.navigate(['login']);
        return true;
    }

    if(typeof expires_in === 'string'){
        if(Number(expires_in) > Date.now()){
        profileService.loadProfile(username);
          return true;
        }
    }

    if(typeof refresh_token === 'string'){
        loginService.refreshToken(refresh_token)
        .subscribe({
            next: value => {
                localStorage.setItem('access_token', value.access_token);
                localStorage.setItem('refresh_token', value.refresh_token);
                localStorage.setItem('expires_in', (Date.now() + value.expires_in * 1000).toString());
                profileService.loadProfile(username);

            },
            error: err => {
                localStorage.clear();
                router.navigate(['login']);
            },
            complete: () => {}
     })
    }
      return true;
};
