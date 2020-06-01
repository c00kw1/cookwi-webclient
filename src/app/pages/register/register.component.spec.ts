import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

describe('ProfileComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authServiceStub: Partial<AuthService>;

    beforeEach(async(() => {
        authServiceStub = {
            
        };
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            providers: [{ provide: AuthService, useValue: authServiceStub }]
        })
            .compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
