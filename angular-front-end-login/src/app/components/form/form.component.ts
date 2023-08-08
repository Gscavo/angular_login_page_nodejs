import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/model/UserModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  usersList: UserModel[] = [];

  

  constructor(private service: UsersService) {  }
  
  ngOnInit(): void {
    this.service.connectToWebSocket();
  }


  submit(form: NgForm) {
      const {firstName, lastName, email, age, sex} = form.value;
      const user: UserModel = {
        firstName,
        lastName,
        email,
        age,
        sex
      };

      this.service.sendMessage(JSON.stringify(user));
  }

}
