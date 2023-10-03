import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { UploadFileResDto } from './dto/res.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfileImage(@UploadedFile() file: Express.MulterS3.File): UploadFileResDto {
    return this.uploadsService.uploadFile(file);
  }

  @Post('poster-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadPosterImage(@UploadedFile() file: Express.MulterS3.File): UploadFileResDto {
    return this.uploadsService.uploadFile(file);
  }
}
