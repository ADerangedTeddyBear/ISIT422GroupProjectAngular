import { Component, NgModule, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private FormService: FormService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createAccountForm = this.formBuilder.group({
    username: '',
    password: '',
    user_type: ''
  });

  submitForm(in_formName: string) {
    this.FormService.postData(this.createAccountForm.value, in_formName);
    this.createAccountForm.reset();
  }

}
