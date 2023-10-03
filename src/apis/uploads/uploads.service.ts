import { BadRequestException, Injectable } from '@nestjs/common';
import { IUploadsServiceUploadFileReturn } from './interfaces/uploads-service.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class UploadsService {
  constructor(private readonly usersService: UsersService) {}
  async uploadProfileImage({ file, userId }: IUploadsServiceUploadProfileImage): Promise<IUploadsServiceUploadFileReturn> {
    if (!file) throw new BadRequestException('파일이 존재하지 않습니다.');

    await this.usersService.updateProfileImageUrl({ userId, profileImageUrl: file.location });

    return { url: file.location };
  }

  uploadFile(file: Express.MulterS3.File): IUploadsServiceUploadFileReturn {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return { url: file.location };
  }
}

interface IUploadsServiceUploadProfileImage {
  file: Express.MulterS3.File;
  userId: string;
}
