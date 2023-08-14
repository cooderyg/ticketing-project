import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage, //
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IEventsGatewayOrderEnd, IEventsGatewayOrderStartData } from './interfaces/events-gateway.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  wsClients = [];

  handleConnection(@ConnectedSocket() socket: Socket): void {
    console.log(`${socket.id} 소켓 연결`);
    this.wsClients.push(socket);
  }

  // 연결 끊길 시
  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    console.log(`${socket.id} 소켓 연결 해제 ❌`);
    this.wsClients.splice(this.wsClients.indexOf(socket), 1);
  }

  @SubscribeMessage('orderStart')
  orderStart(@ConnectedSocket() socket: Socket, @MessageBody() data: IEventsGatewayOrderStartData): void {
    const { jobId } = data;
    const index = this.wsClients.findIndex((client) => client === socket);
    this.wsClients[index].data.jobId = jobId;
  }

  orderEnd({ jobId, success, order, error }: IEventsGatewayOrderEnd): void {
    const foundSocket = this.wsClients.find((wsClient) => wsClient.data.jobId === jobId);
    if (foundSocket) {
      success //
        ? this.server.to(foundSocket.id).emit('orderEnd', { success, order })
        : this.server.to(foundSocket.id).emit('orderEnd', { success, error });
    }
  }
}
