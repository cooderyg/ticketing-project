import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { UploadFileResDto } from './dto/res.dto';
import { AccessAuthGuard } from '../auth/guard/auth.guard';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(AccessAuthGuard)
  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@UploadedFile() file: Express.MulterS3.File, @User() user: UserAfterAuth): Promise<UploadFileResDto> {
    const userId = user.id;
    return this.uploadsService.uploadProfileImage({ file, userId });
  }

  @Post('poster-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadPosterImage(@UploadedFile() file: Express.MulterS3.File): UploadFileResDto {
    return this.uploadsService.uploadFile(file);
  }
}
