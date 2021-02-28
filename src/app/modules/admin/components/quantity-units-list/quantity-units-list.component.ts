import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminRecipesService } from 'src/app/core/services/admin/admin.recipes.service';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { QuantityUnit } from 'src/app/shared/models/quantityunit.model';
import { QuantityUnitsEditComponent } from '../quantity-units-edit/quantity-units-edit.component';

@Component({
  selector: 'app-quantity-units-list',
  templateUrl: './quantity-units-list.component.html',
  styleUrls: ['./quantity-units-list.component.scss'],
})
export class QuantityUnitsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  public quantityUnitsDataSource: MatTableDataSource<QuantityUnit>;
  public quantityUnitsDisplayedColumns: string[] = [
    'name',
    'acronym',
    'type',
    'action',
  ];
  public quantityUnits: QuantityUnit[];

  constructor(
    private adminRecipesService: AdminRecipesService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.quantityUnits = [];
    this.quantityUnitsDataSource = new MatTableDataSource(this.quantityUnits);
  }

  ngAfterViewInit(): void {
    this.quantityUnitsDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  newQuantityUnit() {
    let dialog = this.dialog.open(QuantityUnitsEditComponent);
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    });
  }

  editQuantityUnit(entity: QuantityUnit) {
    let dialog = this.dialog.open(QuantityUnitsEditComponent, {
      data: { entity: entity },
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    });
  }

  deleteQuantityUnit(entityId: string) {
    this.adminRecipesService.removeQuantityUnit(entityId).subscribe(
      (result) => {
        this._snackBar.open('Unit deleted', 'Close', {
          duration: 5_000,
        });
        this.fetchData();
      },
      (error) => {
        this._snackBar.open('Cannot delete unit', 'Close', {
          duration: 5_000,
        });
      }
    );
  }

  fetchData(): void {
    this.adminRecipesService.getQuantityUnits().subscribe(
      (units) => {
        this.quantityUnits = units;
        this.quantityUnitsDataSource.data = this.quantityUnits;
      },
      (error) => {
        this.dialog
          .open(SimpleDialogComponent, {
            data: {
              title: 'Impossible de retrouver les unités',
              message: 'Un problème est survenu en récupérant les quantités.',
              closeButton: 'Retour',
              closeButtonIcon: 'undo',
            },
          })
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['admin/home']);
          });
      }
    );
  }
}
