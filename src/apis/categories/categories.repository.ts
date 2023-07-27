import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  async create({ createCategoryDto }: ICategoriesRepositoryCreate): Promise<Category> {
    return await this.categoriesRepository.save({
      ...createCategoryDto,
    });
  }
}

interface ICategoriesRepositoryCreate {
  createCategoryDto: CreateCategoryDto;
}
