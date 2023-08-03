import { OmitType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategoryResDto extends OmitType(Category, ['concerts']) {}
