import { Component, OnInit } from "@angular/core";
import { Observable, catchError, map, tap } from "rxjs";
import { UserModel } from "src/app/model/UserModel";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.css"],
})
export class ListViewComponent implements OnInit {

  receivedMessages: string[] = [];

  constructor(private service: UsersService) {  }

  ngOnInit(): void {
    this.service.connectToWebSocket();
    this.service.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
  }
  
  sendMessage(): void {
    const message = '{"Hello": "World"}';
    this.service.sendMessage(message);
  }
}
