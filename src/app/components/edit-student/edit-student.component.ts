import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/student';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  @Input() set student(student: Student) {
    if (student) {
      this.form.patchValue(student);
    }
  }
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
    });
  }

  ngOnInit(): void {
  }

  get age () {
    return this.form.controls['age'];
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.toastr.success('Employee was updated successfully');
      this.modal.close(this.form.value);
    }
  }

}
