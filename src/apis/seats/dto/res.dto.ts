import { OmitType } from '@nestjs/swagger';
import { Seat } from '../entities/seat.entity';

export class SeatGetAllResDto extends OmitType(Seat, ['concert']) {}

// id: f933bd11-0ecc-4f2f-ac2d-ef1e17748681,
// seatNum: 3,
// grade: b,
// price: 50000,
// isSoldOut: false,
// createdAt: 2023-07-31T23:54:33.652Z,
// updatedAt: 2023-07-31T23:54:33.652Z
