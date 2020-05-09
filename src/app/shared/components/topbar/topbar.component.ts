import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    public profile: any;

    constructor(public auth: AuthService) { }

    ngOnInit(): void {
        this.auth.userProfile$.subscribe(res => {
            this.profile = res;
            console.log(this.profile);
        });
    }

}
