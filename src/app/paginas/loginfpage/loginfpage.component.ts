import { Component, inject, OnDestroy } from '@angular/core';
import { PoPageLoginComponent, PoPageLoginModule } from '@po-ui/ng-templates';
import { LoginService } from '../../services/login.service';
import { LoginData } from '../../classes/login';
import { Router } from '@angular/router';
import { PoLoadingModule, PoNotificationService } from '@po-ui/ng-components';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../classes/profile';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-loginfpage',
  imports: [PoPageLoginModule, PoLoadingModule,],
  templateUrl: './loginfpage.component.html',
  styleUrl: './loginfpage.component.css'
})
export class LoginfpageComponent implements OnDestroy {

    private LoginService = inject(LoginService);
    private LoginData!: LoginData;
    private router = inject(Router);
    private notify = inject(PoNotificationService);
    private profileService = inject(ProfileService);
    private profile$ = this.profileService.getProfile();
    private profile: Profile = new Profile();
    private sub = new Subscription();

    public isHiddenLoading: boolean = true;

    constructor() {
        const subProfile = this.profile$.subscribe({
            next: value => this.profile = value })
            this.sub.add(subProfile);

    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    public confirmLogin(LoginPage: PoPageLoginComponent) {

        this.isHiddenLoading = false;
        this.LoginService.senLogin(LoginPage.login, LoginPage.password)
        .subscribe({
            next: value =>{

            let loginNow: number = Date.now();
            this.LoginData = value;


            localStorage.setItem('access_token', this.LoginData.access_token);
            localStorage.setItem('refresh_token', this.LoginData.refresh_token);
            localStorage.setItem('expires_in', (loginNow + this.LoginData.expires_in * 1000).toString());
            localStorage.setItem('username',LoginPage.login);

            this.profileService.loadProfile(LoginPage.login);
            
            this.isHiddenLoading = true;
            this.router.navigate(['home']);

            },
            error: err => {console.log('Erro', err);
                let msgerror: string;
                err.error.code === 401 ? msgerror = 'Login Invalido' : msgerror = err.error.message
                this.notify.error({message: msgerror, duration: 5000});
                this.isHiddenLoading = true;
            },
            complete: () => {}

        })
    }
}
