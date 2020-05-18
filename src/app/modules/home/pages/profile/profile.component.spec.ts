import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let authServiceStub: Partial<AuthService>;

    beforeEach(async(() => {
        authServiceStub = {
            
        };
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            providers: [{ provide: AuthService, useValue: authServiceStub }]
        })
            .compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
