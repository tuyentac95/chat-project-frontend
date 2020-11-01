import { Component, OnInit } from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  message = '';
  fromUser = '';
  toUser = '';

  constructor() { }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI();
  }

  // tslint:disable-next-line:typedef
  connect() {
    this.webSocketAPI.fromUser = this.fromUser;
    this.webSocketAPI.$connect();
  }

  // tslint:disable-next-line:typedef
  disconnect() {
    this.webSocketAPI.$disconnect();
  }

  // tslint:disable-next-line:typedef
  sendMsg() {
    this.webSocketAPI.$send(this.toUser, this.message);
  }

  // tslint:disable-next-line:typedef
  inboxToUser() {
    console.log('Inbox to ' + this.toUser);
  }
}
