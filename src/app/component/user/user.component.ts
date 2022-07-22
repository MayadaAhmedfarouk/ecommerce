import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(  private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService) { }
    loginForm!: FormGroup;
    register!: FormGroup;


  ngOnInit(): void {
    this.buildForm();
    this.buildRegister();
  }
  buildForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
    });
  }
  buildRegister() {
    this.register = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  loginData() {
    if (this.loginForm.valid) {
      // alert("تم ادخال البيانات بنجاح");
      console.log(this.loginForm.value);
      this.toastr.success('تم ادخال البيانات بنجاح', 'success', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-left',
      });
    } else {
      // alert('فشل ادخال البيانات ');
      this.toastr.error('فشل ادخال البيانات', 'error', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-left',
      });
    }
  }
  registerData() {
    if (this.register.valid) {
      console.log(this.register.value);
      this.toastr.success('تم ادخال البيانات بنجاح', 'success', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-left',
      });
    } else {
      this.toastr.error('فشل ادخال البيانات', 'error', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-left',
      });
    }
  }

}
