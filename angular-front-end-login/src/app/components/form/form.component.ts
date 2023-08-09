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

  constructor(private service: UsersService) {  }
  
  ngOnInit(): void {
    this.service.connectToWebSocket();
  }


  submit(form: NgForm): void {
      const {firstName, lastName, email, password, age, sex} = form.value;
      const user: UserModel = {
        firstName,
        lastName,
        email,
        password,
        age,
        sex
      };
      this.createUser(user);
      this.realtimeUpdateList(user);

  }

  createUser(data: UserModel): void {
    this.service.createUser(data).subscribe(data => {
      console.log(`Criado o usuário com nome: ${data.firstName}`);
    });
  }

  realtimeUpdateList(data: UserModel): void {
    this.service.sendMessage(JSON.stringify(data));
  }

}
