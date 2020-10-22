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
    this.data ? this.initializeEditedFrom() : this.initializeForm();
    this.studentForm.valueChanges.subscribe(()=>{
console.log(this.studentForm)
    });
  }

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required]
    });
    console.log(this.studentForm)

  }

  initializeEditedFrom() {
    // console.log(this.data)
    this.studentForm = this.formBuilder.group({
      studentName: [this.data.studentName, Validators.required],
      gender: [this.data.gender, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
      email: [this.data.email, Validators.required],
      contact: [this.data.contact, Validators.required],
      index: [this.data.index]
    });

  }

  submit(): void {
    if (this.studentForm.invalid) {
      Object.keys(this.studentForm.controls).forEach(key => {
        this.studentForm.controls[key].markAsDirty();
      });
      return;
    } else {
      this.dialogRef.close(this.studentForm.value);
    }

  }
}
