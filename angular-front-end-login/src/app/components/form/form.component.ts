import { Component, OnInit } from '@angular/core';
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
    
  }


  submit() {
    console.log('Form submited!')
  }

  setUserData() {

  }

}
