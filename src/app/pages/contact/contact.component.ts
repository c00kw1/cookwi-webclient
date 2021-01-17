import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public bug: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    this.bug = type && type === 'bug';
  }
}
