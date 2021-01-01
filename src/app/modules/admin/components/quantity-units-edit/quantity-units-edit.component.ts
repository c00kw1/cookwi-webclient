import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminRecipesService } from 'src/app/core/services/admin/admin.recipes.service';
import {
  QuantityUnit,
  UnitType,
} from 'src/app/shared/models/quantityunit.model';

@Component({
  selector: 'app-quantity-units-edit',
  templateUrl: './quantity-units-edit.component.html',
  styleUrls: ['./quantity-units-edit.component.scss'],
})
export class QuantityUnitsEditComponent implements OnInit {
  public unit: QuantityUnit;
  public form: FormGroup;
  public allTypes = UnitType;
  public editMode: boolean;
  public showSpin: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _recipesService: AdminRecipesService,
    private _dialogRef: MatDialogRef<QuantityUnitsEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.unit = new QuantityUnit();
    this.editMode = false;
    this.showSpin = false;
    if (data && data.entity) {
      this.unit = data.entity;
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [this.unit.name, Validators.required],
      acronym: [this.unit.acronym, Validators.required],
      type: [this.unit.type, validateUnitType],
    });
  }

  onSubmit(): void {
    this.showSpin = true;
    if (!this.form.valid) {
      this._snackBar.open('Some fields are not ok', 'Close', {
        duration: 5_000,
      });
      return;
    }
    let newUnit: QuantityUnit = {
      id: this.unit.id,
      name: this.form.value['name'],
      acronym: this.form.value['acronym'],
      type: this.form.value['type'],
    };
    let afterSuccess = (result) => {
      this.showSpin = false;
      this._snackBar.open(
        `Unit ${this.editMode ? 'updated' : 'added'}`,
        'Close',
        {
          duration: 5_000,
        }
      );
      this._dialogRef.close(true);
    };
    let afterError = (error) => {
      this.showSpin = false;
      this._snackBar.open(
        'An error occured saving the new unit, sorry',
        'Close',
        {
          duration: 5_000,
        }
      );
      this._dialogRef.close(false);
    };
    if (this.editMode) {
      this._recipesService
        .updateQuantityUnit(newUnit.id, newUnit)
        .subscribe(afterSuccess, afterError);
    } else {
      this._recipesService
        .createQuantityUnit(newUnit)
        .subscribe(afterSuccess, afterError);
    }
  }
}

function validateUnitType(c: FormControl) {
  var resolve = UnitType[c.value];
  if (resolve !== undefined) {
    return null;
  } else {
    return {
      validateUnitType: {
        valid: false,
      },
    };
  }
}
