import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersService } from 'src/app/core/services/admin/admin.users.service';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private adminUsersService: AdminUsersService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  //#region users invitations

  generateInvitation() {
    this.adminUsersService.generateInvitation().subscribe((result) => {
      this.dialog.open(SimpleDialogComponent, {
        data: {
          title: 'Invitation created',
          message: `Invitation code is [${
            result.id
          }] and it will expire ${this.datePipe.transform(
            result.expiration,
            'short',
            'UTC+1',
            'fr'
          )}`,
          closeButton: 'OK, noted',
          closeButtonIcon: 'check',
        },
      });
    });
  }

  //#endregion
}
