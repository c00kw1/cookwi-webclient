import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    private _registerId: string;

    newUser: User;
    form: FormGroup;
    showSpin: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _usersService: UsersService
    ) {
        this.showSpin = false;
        this.newUser = new User();
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        },
            {
                validators: (formGroup: FormGroup) => {
                    var pass = formGroup.controls['password'];
                    var matchingPass = formGroup.controls['confirmPassword'];

                    if (matchingPass.errors && !matchingPass.errors.mustMatch) return;

                    if (pass.value !== matchingPass.value) {
                        matchingPass.setErrors({ mustMatch: true });
                    }
                    else {
                        matchingPass.setErrors(null);
                    }
                }
            }
        );
    }

    ngOnInit() {
        this._route.paramMap.subscribe(params => {
            this._registerId = params.get("id");
        });
    }

    onSubmit() {
        if (this.form.valid) {
            let user: User = {
                id: "",
                email: this.form.value['email'],
                password: this.form.value['password'],
                firstName: this.form.value['firstName'],
                lastName: this.form.value['lastName']
            };

            this.showSpin = true;
            this._usersService.registerUser(this._registerId, user).subscribe(result => {
                this._router.navigate(["/home"])
                    .then(() => this._snackBar.open("Inscription réussie ! Cliquez sur le mail que vous avez reçu.", "Fermer", { duration: 7_000, verticalPosition: "bottom" }));
            }, error => {
                this.showSpin = false;
                let message = "";
                switch (error.status) {
                    case 401:
                        message = "Ce code invitation est invalide ou a déjà été utilisé.";
                        break;
                    case 409:
                        message = "Un compte existe déjà avec cet email !"
                        break;
                    default:
                        message = "Une erreur est survenue. Le compte n'a pas pu être créé.";
                        break;
                }
                this._snackBar.open(message, "Fermer", { duration: 5_000, verticalPosition: "bottom" });
            });
        }
        else {
            this._snackBar.open("Le formulaire est incomplet ou invalide", "Fermer", { duration: 5_000, verticalPosition: "bottom" });
        }
    }

}
