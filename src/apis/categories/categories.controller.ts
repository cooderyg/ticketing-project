import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, //
  ) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto, //
  ): Promise<Category> {
    return this.categoriesService.create({ createCategoryDto });
  }
}
