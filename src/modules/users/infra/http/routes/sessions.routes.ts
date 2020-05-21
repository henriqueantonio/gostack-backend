import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const autheticateUser = new AuthenticateUserService();

  const { user, token } = await autheticateUser.exectute({ email, password });

  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  return response.json({ user, token });
});

export default sessionsRouter;
