import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/chat';
  topic = '/topic/messages/';
  stompClient: any;
  fromUser = '';

  constructor() {
  }

  // tslint:disable-next-line:typedef
  $connect() {
    console.log('Initialize webSocket Connection...');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const $this = this;
    console.log($this.fromUser + ' connecting to chat...');
    // tslint:disable-next-line:only-arrow-functions typedef
    $this.stompClient.connect({}, function(frame) {
      console.log('connected to: ' + frame);
      // tslint:disable-next-line:only-arrow-functions typedef
      $this.stompClient.subscribe($this.topic + $this.fromUser, function(response) {
        $this.onMessageReceived(response);
      });
    }, $this.errorCallBack);
  }

  // tslint:disable-next-line:typedef
  $disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // tslint:disable-next-line:typedef
  errorCallBack(error) {
    console.log(error);
    setTimeout(() => {
      this.$connect();
    }, 5000);
  }

  // tslint:disable-next-line:typedef
  $send(user: string, text: string) {
    console.log('Calling logout api via webSocket');
    this.stompClient.send('/app/chat/' + user, {}, JSON.stringify({
      from : this.fromUser,
      message : text
    }));
  }

  // tslint:disable-next-line:typedef
  onMessageReceived(message) {
    // console.log('Message Received: ' + message);
  }
}
