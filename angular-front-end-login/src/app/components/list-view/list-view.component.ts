import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/model/UserModel";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.css"],
})
export class ListViewComponent implements OnInit {

  usersList$: UserModel[] = [];
  /* receivedMessages: string[] = [] ;*/
  constructor(private service: UsersService) {  }

  ngOnInit(): void {
    this.service.connectToWebSocket();
    this.getUsersList();
    this.service.messageReceived$.subscribe((message: string) => {
      const data: UserModel = JSON.parse(message);
      this.usersList$.push(data);
    });
  }


  placeholder() {
    throw new Error ("Method not implemented");
  }
  
  getUsersList(): void {
    this.service.getUsers().subscribe(data => {
      this.usersList$ = data;
    });
  }

  

  sendMessage(): void {
    const message = '{"Hello": "World"}';
    this.service.sendMessage(message);
  }
}
