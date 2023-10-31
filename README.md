# 🎟️ Stage Pick (공연 예매)

## ⏰개발 기간
2023.07.25 - 2023.08.04

## 🖥️개발환경
- Nest JS
- TypeScript
- TypeORM
- MySQL
- Bull Queue
- Socket.IO

## ⚒️아키텍쳐
<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/9a877c38-f2c9-46e5-b375-1d72bf2fbbbc" width="100%" />


## 📌주요 기능
- 공연좌석 지정예매 기능
- 등급별 공연좌석 생성 기능
- Bull Queue 대기열 기능
- Role Guard사용으로 user, host, admin 분리
- Swagger를 활용한 API DOCS
- Login Access Token, Refresh Token
- 공연검색 기능
 

## 📐ERD 설계

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/5ec5a87f-5a82-48a1-bf76-6479ad8a4b13" width="100%">

# ⚽트러블 슈팅
## Bull Queue 대기열 생성 시 응답 문제

![noerror](https://github.com/cooderyg/ticketing-project/assets/123794148/da1121f0-0efd-4161-a46a-aa872c7a1747)

#### Order 실패인 경우에도 Bull Queue에 작업이 올라가면 성공을 응답하는 문제가 발생

client로 반환하는 값이 주문실패인 경우에도 성공을 응답하는 문제가 발생

### 🌟 해결방안 1 Event Emitter
Event Emitter를 활용하여 Bull Queue Order Job 종료까지 서버 내부에 Event Listener를 통해 대기 후 응답 반환 
```javascript
@Injectable()
export class OrderQueuesService {
  constructor(
    @InjectQueue('orderQueue')
    private readonly orderQueue: Queue,
    private eventEmitter: EventEmitter2,
  ) {}

  async addorderQueue({ concertId, userId, amount, seatIds }: IOrdersServiceCreate): Promise<Order> {
    const uuid = v4();
    await this.orderQueue.add(
      'addOrderQueue', //
      { concertId, userId, amount, seatIds, uuid },
      { removeOnComplete: true, removeOnFail: true, jobId: uuid },
    );
    const result = await this.waitResult({ uuid });
    console.log(result);
    if (result?.error) throw result.error;
    return result.order;
  }
}
```

#### 🌩️Event Emitter 활용의 문제점
##### 대기를 하고 있기 때문에 Bull Queue 비동기를 제대로 활용하지 못함(대기상태 추가로 성능저하)

### 🌟 해결방안 2 Socket.IO 통신
1. Bull Queue에 작업을 올릴 때 Job ID를 UUID로 생성하고 Job ID를 응답으로 반환
2. 이후 Client에서 Socket.IO Event Listener를 활용해 Job ID로 이벤트를 생성    
3. Bull Queue에서 Job이 완료되면 Server에서 Socket.IO를 통해 Job ID로 Event Emit
4. Client에서 Event를 받고 해당 결과를 화면에 출력
```javascript
// ...(Server Socket.IO 코드 중략)
  @SubscribeMessage('orderStart')
  orderStart(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
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
```

#### 🌩️Socket.IO 통신 활용의 문제점
##### Bull Queue는 다수의 인원이 몰릴 때를 대비한 대기열이기 때문에 다수의 인원이 Socket을 Connect해야 함
##### 다수의 인원이 Connect하면 리소스가 많이 소모됨  

### 📎비동기를 활용하지 못하는 해결방안 1보다는 활용할 수 있는 해결방안 2를 선택

<br />

## 🔒Transaction Lock 동시성 제어 중 DeadLock 발생

![deadlock](https://github.com/cooderyg/ticketing-project/assets/123794148/75d5e83b-0aa5-44d9-a447-ecb2f768333d)

#### Seat에 lock하고 있는 Transaction과 User에 Lock하고 있는 Transaction이 서로 대기하고 있는 상태로 DeadLock 발생 

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/d0497d36-9375-406a-9a9d-bd33622b2999" width="100%" />

### 🗝️해결방법
#### 단방향으로 Transaction Lock이 걸리도록 코드 수정 

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/e0f53ea6-962a-4b87-bd14-9876d4cc2130" width="100%" />


## ✍️프로젝트 학습 블로깅
<a href="https://cooder.tistory.com/60">[TIL] 티켓팅 프로젝트</a>

<a href="https://cooder.tistory.com/61">[TIL] 티켓팅 프로젝트 Nest JS Role Guard</a> 

<a href="https://cooder.tistory.com/62">[TIL] Promise all & transaction</a> 

<a href="https://cooder.tistory.com/63">[TIL] 티켓팅 프로젝트 Jmeter 동시성 테스트</a> 

<a href="https://cooder.tistory.com/64">[TIL] 티켓팅 프로젝트 데드 락</a> 

<a href="https://cooder.tistory.com/65">[TIL] 티켓팅 프로젝트 Nest JS Bull Queue</a> 

<a href="https://cooder.tistory.com/66">[TIL] 티켓팅 프로젝트 Nest JS Event Emitter</a> 

<a href="https://cooder.tistory.com/67">[TIL] 티켓팅 프로젝트 bull board</a> 

<a href="https://cooder.tistory.com/68">[TIL] 티켓팅 프로젝트 Nest JS socket IO</a> 
