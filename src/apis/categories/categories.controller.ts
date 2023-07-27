import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, //
  ) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto, //
  ) {
    return this.categoriesService.create({ createCategoryDto });
  }
}
