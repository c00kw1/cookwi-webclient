import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public profile: any;

    constructor(public auth: AuthService) { }

    ngOnInit(): void {
        this.auth.userProfile$.subscribe(res => {
            this.profile = res;
            console.log(this.profile);
        });
    }

}
