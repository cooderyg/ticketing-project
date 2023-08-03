import { PartialType } from '@nestjs/swagger';
import { CreateConcertDto } from './create-concert.dto';

export class UpdateConcertDto extends PartialType(CreateConcertDto) {}
