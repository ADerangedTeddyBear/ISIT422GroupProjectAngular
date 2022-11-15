import { Component, NgModule, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  createAccountForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    user_type: ['', Validators.required]
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.createAccountForm.value, in_formName);
    this.createAccountForm.reset();
  }

}
