import path from 'path';
import fs from 'fs';

import {getRepository} from 'typeorm';
import User from '../models/User';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {id: user_id}
    });

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userPathExists = await fs.promises.stat(userAvatarFilePath);

      if (userPathExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    userRepository.save(user);

    delete user.password;

    return user
  }
}

export default UpdateUserAvatarService;
