import bodyParser from 'body-parser';
import { Router } from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  updateBalance,
} from '@controllers/userController.js';
import { validateUserExists } from '@middleware/user.js';
import {
  validateRequestBody,
  validateRequestQueries,
} from '@middleware/validator.js';
import { UserRequesBodyZ, UserRequestQueriesZ } from '@typings/index.js';

export const userRouter = Router();

const validateUserRequestQueriesFn =
  validateRequestQueries(UserRequestQueriesZ);

const validateUserRequestBodyFn = validateRequestBody(UserRequesBodyZ);

const validateDeleteRequestBodyFn = validateRequestBody(UserRequestQueriesZ);

userRouter.get('/users', getUsers);

userRouter.get(
  '/user?',
  validateUserRequestQueriesFn,
  validateUserExists,
  getUser,
);

userRouter.put(
  '/user',
  bodyParser.json(),
  validateUserRequestBodyFn,
  validateUserExists,
  updateBalance,
);

userRouter.delete(
  '/user',
  bodyParser.json(),
  validateDeleteRequestBodyFn,
  validateUserExists,
  deleteUser,
);
