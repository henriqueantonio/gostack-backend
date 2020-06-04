import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

injectable();
export default class ListProvidesrService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = this.usersRepository.findAllProviders({
      expect_user_id: user_id,
    });

    return users;
  }
}
