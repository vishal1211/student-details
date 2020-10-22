import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent implements OnInit {

  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     this.initializeForm();
  }

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      studentName: [this.data ? this.data.studentName : '', Validators.required],
      gender: [this.data ? this.data.gender : '', Validators.required],
      dateOfBirth: [this.data ? this.data.dateOfBirth : '', Validators.required],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      contact: [this.data ? this.data.contact : '', Validators.required]
    });
    console.log(this.studentForm)

  }
 
  submit(): void {
    if (this.studentForm.invalid) {
      Object.keys(this.studentForm.controls).forEach(key => {
        this.studentForm.controls[key].markAsDirty();
      });
      return;
    } else {
      
      this.data ? this.studentForm.value.index = this.data.index : '';
      this.dialogRef.close(this.studentForm.value);
    }

  }
}
