import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form: FormGroup;

  constructor(private studentService: StudentService,
      private fb: FormBuilder) {
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

  addModalForm() {

  }



  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form);
    this.form.markAsTouched();
    if (this.form.valid) {
      this.studentService.create(this.form.value).subscribe(() => {
        window.location.reload()
      });
    }
  }

}
