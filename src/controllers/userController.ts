import { eq } from 'drizzle-orm';
import { type RequestHandler } from 'express';

import { db } from '@db/index.js';
import { users } from '@db/schema/user.js';
import {
  type UserAPIResponseBody,
  type MessageAPIResponseBody,
  type UserRequestBody,
  type UserDeleteRequestBody,
  type UserRequestQueries,
  type UsersAPIResponseBody,
} from '@typings/index.js';

export const getUsers: RequestHandler<
  null,
  UsersAPIResponseBody,
  null,
  null
> = async (req, res) => {
  const userList = await db
    .select({ user_id: users.user_id, balance: users.balance })
    .from(users);

  res.send({
    success: true,
    result: {
      users: userList,
    },
    error: null,
  });
};

export const getUser: RequestHandler<
  null,
  UserAPIResponseBody,
  UserRequestBody,
  UserRequestQueries
> = async (req, res) => {
  const { user_id }: { user_id: string } = req.query;

  const [user] = await db
    .select({ user_id: users.user_id, balance: users.balance })
    .from(users)
    .where(eq(users.user_id, user_id));

  res.send({
    success: true,
    result: {
      user,
    },
    error: null,
  });
};

export const updateBalance: RequestHandler<
  null,
  UserAPIResponseBody,
  UserRequestBody,
  UserRequestQueries
> = async (req, res) => {
  const { user_id, balance_change } = req.body;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.user_id, user_id));

  let newBalance = user.balance + balance_change;

  // Make sure that balance does not go below 0
  if (newBalance < 0) {
    newBalance = 0;
  }

  // Update user balance
  await db
    .update(users)
    .set({ balance: newBalance })
    .where(eq(users.user_id, user_id));

  return res.send({
    success: true,
    result: {
      user: {
        ...user,
        balance: newBalance,
      },
    },
    error: null,
  });
};

export const deleteUser: RequestHandler<
  null,
  MessageAPIResponseBody,
  UserDeleteRequestBody,
  UserRequestQueries
> = async (req, res) => {
  const { user_id } = req.body;

  await db.delete(users).where(eq(users.user_id, user_id));

  return res.send({
    success: true,
    result: {
      message: `User with user_id ${user_id} has been deleted`,
    },
    error: null,
  });
};
