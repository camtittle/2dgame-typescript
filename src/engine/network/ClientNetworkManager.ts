export class ClientNetworkManager {

  private socket: WebSocket;

  onReceiveListener: ReceiveMessageListener;

  constructor(private url: string) {
  }

  // Establish connection
  public connect(onConnect?: () => void): ClientNetworkManager {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      if (onConnect) { onConnect(); }
    };

    this.socket.onmessage = (event) => {
      console.log('received msg: ', event.data);
      if (this.onReceiveListener) this.onReceiveListener(JSON.parse(event.data));
    };

    return this;
  }

  // send a message
  public send<SendType>(message: SendType) {
    this.socket.send(JSON.stringify(message));
  }

}

export type ReceiveMessageListener = (message: any) => void;
