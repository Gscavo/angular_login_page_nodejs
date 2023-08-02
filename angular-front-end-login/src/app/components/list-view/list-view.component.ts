import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/model/UserModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  usersList: UserModel[] = [];
  refreshUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private service: UsersService) {  }

  ngOnInit(): void {
      
  }

  getUserData() {
    this.service.getUsers().subscribe( (data) => {
      data.forEach(el => {
        let userData: UserModel = {
          firstName: el.firstName,
          lastName: el.lastName,
          email: el.email,
          age: el.age,
          sex: el.sex,
        }
        if (this.usersList.indexOf(userData) === -1) {
          console.log(userData);
          this.usersList.push(userData);
          console.log(this.usersList);
        }
      })
    })
  }
}
