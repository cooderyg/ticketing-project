import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository, //
  ) {}

  async create({ createCategoryDto }: ICategoriesServiceCreate): Promise<Category> {
    return await this.categoriesRepository.create({ createCategoryDto });
  }
}

interface ICategoriesServiceCreate {
  createCategoryDto: CreateCategoryDto;
}
