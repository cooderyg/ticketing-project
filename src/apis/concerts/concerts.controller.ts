import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { IRequest } from 'src/commons/interfaces/context';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PageReqDto, SearchReqDto } from 'src/commons/dto/page-req.dto';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/commons/decorators/swagger.decorator';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { CreateConcertResDto, FindConcertsResDto, UpdateConcertResDto } from './dto/res.dto';
import { AuthHostGuard } from 'src/commons/decorators/coustom-guards.decorator';
import { CreateConcertDocs, UpdateConcertDocs } from './decorators/concerts-controller.decorator';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';

@ApiTags('concerts')
@ApiExtraModels(PageReqDto, SearchReqDto, CreateConcertResDto, FindConcertsResDto, UpdateConcertResDto, Concert)
@Controller('concerts')
export class ConcertsController {
  constructor(
    private readonly concertsService: ConcertsService, //
  ) {}

  @CreateConcertDocs()
  @AuthHostGuard()
  @Post()
  createConcert(
    @Req() req: IRequest, //
    @Body() createConcertDto: CreateConcertDto,
  ): Promise<CreateConcertResDto> {
    const userId = req.user.id;
    const concert = this.concertsService.create({ userId, createConcertDto });

    // TODO: id만 반환하기
    return concert;
  }

  @ApiGetItemsResponse(FindConcertsResDto)
  @Get()
  async findConcerts(
    @Query() { page, size }: PageReqDto, //
  ): Promise<FindConcertsResDto> {
    const concertsAndCount = await this.concertsService.findConcerts({ page, size });

    return concertsAndCount;
  }

  @ApiGetResponse(Concert)
  @Get('details/:concertId')
  async findById(
    @Param('concertId') concertId: string, //
  ): Promise<Concert> {
    const result = await this.concertsService.findById({ concertId });
    return result;
  }

  @ApiGetItemsResponse(FindConcertsResDto)
  @Get('/search')
  async searchByNameAndCategory(
    @Query() { page, keyword, size }: SearchReqDto, //
  ): Promise<FindConcertsResDto> {
    const concertsAndCount = await this.concertsService.searchByNameAndCategory({ keyword, page, size });

    return concertsAndCount;
  }

  @UpdateConcertDocs()
  @AuthHostGuard()
  @Put('/:concertId')
  updateConcert(
    @Param('concertId') concertId: string, //
    @Body() updateConcertDto: UpdateConcertDto,
    @User() user: UserAfterAuth,
  ): Promise<UpdateConcertResDto> {
    const userId = user.id;
    return this.concertsService.updateConcert({ updateConcertDto, concertId, userId });
  }
}
