import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './entities/category.entity';
import { ICategoriesServiceCreate } from './interfaces/categories-service.interface';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository, //
  ) {}

  async create({ createCategoryDto }: ICategoriesServiceCreate): Promise<Category> {
    return await this.categoriesRepository.create({ createCategoryDto });
  }
}
