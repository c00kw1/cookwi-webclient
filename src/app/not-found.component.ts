import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `<div class="page-title mat-elevation-z0">
                    <h1>404 - cette page n'existe pas :-(</h1>
               </div>`
})
export class NotFoundComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
