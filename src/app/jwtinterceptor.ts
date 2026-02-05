import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { inject } from '@angular/core';

export class jwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:99'),
      'TenantId':'99,01'
    }})

    return next.handle(req);

    /*
    let urlAuth = `${environment.url}/api/oauth2/v1/token`;
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    let expires_in = localStorage.getItem('expires_in');
    let serviceLogin = inject(LoginService);

    if(req.url.startsWith(urlAuth)){
      return next.handle(req);
    }

    if(typeof expires_in === 'string'){
      if(Number(expires_in) <= Date.now()){
        if(typeof refresh_token === 'string') {
          serviceLogin.refreshLogin(refresh_token).subscribe({
            next: value => {
              localStorage.setItem('access_token',value.access_token);
              localStorage.setItem('refresh_token',value.refresh_token);
              localStorage.setItem('expires_in',((value.expires_in * 1000) + Date.now()).toString());        
            },
            error: err => {}            
          })
        }
      }
    }

    req = req.clone({setHeaders: {Authorization: `Bearer ${access_token}`}})
    return next.handle(req);
    */
  }
}