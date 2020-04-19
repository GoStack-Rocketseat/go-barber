import User from "../models/User";
import { getRepository } from 'typeorm';
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({email, password}: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const {secret, expiresIn} = authConfig.jwt;


    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {user, token};
  }
}

export default AuthenticateUserService;
