import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.loginForm.value, in_formName);
    this.loginForm.reset();
  }

}
