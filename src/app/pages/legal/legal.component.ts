import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  public tooglePosition: string;

  constructor() {
    this.tooglePosition = 'before';
  }

  ngOnInit(): void {}
}
