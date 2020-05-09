export class NetworkManager {

  private socket: WebSocket;

  constructor(private url: string) {
  }

  // Establish connection
  public connect(onConnect?: () => void): NetworkManager {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      if (onConnect) { onConnect(); }
      this.onConnect();
    };

    this.socket.onmessage = (event) => {
      console.log('received msg: ', event.data);
      this.onReceive(event.data);
    };

    return this;
  }

  private onConnect() {
    console.log('connected');
  }

  // send a message
  public send<SendType>(message: SendType) {
    this.socket.send(JSON.stringify(message));
  }

  public onReceive<ReceiveType>(message: ReceiveType) {

  }

}
