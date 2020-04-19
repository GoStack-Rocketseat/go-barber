import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  return response.json({messsage: 'hello users get'});
});

usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name, email, password
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({error: error.message});
  }

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename
  });

  return response.json({ok: true});
})

export default usersRouter;
