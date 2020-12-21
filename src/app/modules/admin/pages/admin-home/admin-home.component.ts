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
    private adminService: AdminUsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  generateInvitation() {
    this.adminService.generateInvitation().subscribe((result) => {
      this.dialog.open(SimpleDialogComponent, {
        data: {
          title: 'Invitation created',
          message: `Invitation code is [${result.id}] and it will expire [${result.expiration}]`,
          closeButton: 'OK, noted',
          closeButtonIcon: 'check',
        },
      });
    });
  }
}
