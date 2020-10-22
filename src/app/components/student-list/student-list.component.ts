import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { StudentFormDialogComponent } from '../student-form-dialog/student-form-dialog.component';

export interface StudentDetails {
  contact: String;
  dateOfBirth: String;
  // dest: any;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['rowindex', 'studentName', 'email', 'contact', 'gender', 'dateOfBirth', 'manage'];
  dataSource = new BehaviorSubject([]);
  data = [];
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openStudentForm(data): void {



    const dialogRef = this.dialog.open(StudentFormDialogComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        if (result.hasOwnProperty('index')) {
          this.data[result.index] = result;
         

     this.showMessage("Record updated successfully.");
        } else {
          this.data.push(result);

          this.showMessage("New Record added.");
        }
        this.dataSource.next(this.data);

        // console.log('The dialog was closed', this.dataSource);

      }
    });
  }


  showMessage(msg) {
    this._snackBar.open(msg, 'close', {
      duration: 2000,
    });
  }

  deleteRecord(index) {
    this.data.splice(index, 1);
    this.dataSource.next(this.data);

  }
}
