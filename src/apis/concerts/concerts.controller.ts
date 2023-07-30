import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { AccessAuthGuard } from '../auth/guard/auth-guard';
import { HasRoles } from '../auth/guard/roles.decorator';
import { ROLE } from '../users/entities/user.entity';
import { RolesGuard } from '../auth/guard/roles.guard';
import { IRequest } from 'src/commons/interfaces/context';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';

@Controller('concerts')
export class ConcertsController {
  constructor(
    private readonly concertsService: ConcertsService, //
  ) {}

  @HasRoles(ROLE.HOST)
  @UseGuards(AccessAuthGuard, RolesGuard)
  @Post()
  createConcert(
    @Req() req: IRequest, //
    @Body() createConcertDto: CreateConcertDto,
  ): Promise<Concert> {
    const userId = req.user.id;

    return this.concertsService.create({ userId, createConcertDto });
  }

  @Get()
  findConcerts(
    @Query('page') page: string, //
  ): Promise<Concert[]> {
    return this.concertsService.findConcerts({ page });
  }

  @Get('/:concertId')
  findById(
    @Param('concertId') concertId: string, //
  ): Promise<Concert> {
    return this.concertsService.findById({ concertId });
  }

  @Get('/search/name')
  searchByNameAndCategory(
    @Query('name') name: string, //
    @Query('page') page: string,
  ): Promise<Concert[]> {
    return this.concertsService.searchByNameAndCategory({ name, page });
  }
}
