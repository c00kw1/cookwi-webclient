import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  public type: string;
  public types: { type: string; name: string }[] = [
    { type: 'message', name: 'Juste un message' },
    { type: 'bug', name: 'Bug' },
    { type: 'access', name: 'Accès' },
  ];
  public contactFrom: FormGroup;
  public messageSentView: boolean;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recaptchaV3Service: ReCaptchaV3Service,
    private contactService: ContactService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messageSentView = false;
    let type = this.route.snapshot.paramMap.get('type');
    if (!this.types.some((e) => e.type === type)) {
      type = 'message';
    }
    this.contactFrom = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl(type, Validators.required),
      message: new FormControl(''),
    });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submit() {
    if (!this.contactFrom.valid) {
      this._snackBar.open('Formulaire invalide', 'Close', {
        duration: 5_000,
      });
      return;
    }

    let form = this.contactFrom.value as Contact;
    this.subscription = this.recaptchaV3Service.execute('newContact').subscribe(
      (token) => {
        form.token = token;
        this.contactService.postMessage(form).subscribe(
          (res) => {
            this.messageSentView = true;
          },
          (err) => {
            this._snackBar.open(
              'Vérifiez que tous les champs sont remplis',
              'Close',
              {
                duration: 5_000,
              }
            );
          }
        );
      },
      (err) => {
        this._snackBar.open('Impossible de valider le captcha', 'Close', {
          duration: 5_000,
        });
      }
    );
  }
}
