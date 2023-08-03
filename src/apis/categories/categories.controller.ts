import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { CreateCategoryResDto } from './dto/res.dto';

@ApiExtraModels(CreateCategoryResDto)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, //
  ) {}

  @ApiPostResponse(CreateCategoryResDto)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto, //
  ): Promise<CreateCategoryResDto> {
    return this.categoriesService.create({ createCategoryDto });
  }
}
