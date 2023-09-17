# 🎟️티켓팅 프로젝트

## ⏰개발 기간
2023.07.25 - 2023.08.04

## 🖥️개발환경
- Nest JS
- TypeScript
- TypeORM
- MySQL
- Bull Queue
- Socket.IO

## 📌주요 기능
- 공연좌석 예매 기능
- 공연생성 기능
- Role Guard사용으로 user, host, admin 분리
- Login Access Token, Refresh Token
- Bull Queue 대기열 기능
- 공연검색 기능 

## 📐ERD 설계

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/bac3b0e2-7c12-4cc4-984f-1390dba3b2b8" width="100%">

# ⚽트러블 슈팅
## Bull Queue 대기열 생성 시 응답 문제

![noerror](https://github.com/cooderyg/ticketing-project/assets/123794148/da1121f0-0efd-4161-a46a-aa872c7a1747)

#### Order 실패인 경우에도 Bull Queue에 작업이 올라가면 201코드를 응답하는 문제가 발생


## Transaction Lock 동시성 제어 중 DeadLock 발생

![deadlock](https://github.com/cooderyg/ticketing-project/assets/123794148/75d5e83b-0aa5-44d9-a447-ecb2f768333d)

#### Seat에 lock하고 있는 Transaction과 User에 Lock하고 있는 Transaction이 서로 대기하고 있는 상태로 DeadLock 발생 

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/0624ab40-e114-4527-a857-37337d4e9502" width="100%" />

### 해결방법
#### 단방향으로 Transaction Lock이 걸리도록 코드 수정 

<img src="https://github.com/cooderyg/ticketing-project/assets/123794148/a1f7ce7c-861a-4a54-aabf-6da470f734e1" width="100%" />


## 티켓팅 프로젝트를 통한 학습 블로깅
#### [[TIL] 티켓팅 프로젝트](https://cooder.tistory.com/60) 
#### [[TIL] 티켓팅 프로젝트 Nest JS Role Guard](https://cooder.tistory.com/61) 
#### [[TIL] Promise all & transaction](https://cooder.tistory.com/62) 
#### [[TIL] 티켓팅 프로젝트 Jmeter 동시성 테스트](https://cooder.tistory.com/63) 
#### [[TIL] 티켓팅 프로젝트 데드 락](https://cooder.tistory.com/64) 
#### [[TIL] 티켓팅 프로젝트 Nest JS Bull Queue](https://cooder.tistory.com/65) 
#### [[TIL] 티켓팅 프로젝트 Nest JS Event Emitter](https://cooder.tistory.com/66) 
#### [[TIL] 티켓팅 프로젝트 bull board](https://cooder.tistory.com/67) 
#### [[TIL] 티켓팅 프로젝트 Nest JS socket IO](https://cooder.tistory.com/68)
