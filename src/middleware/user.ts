import { db } from '@db/index.js';
import { users } from '@db/schema/user.js';
import { eq } from 'drizzle-orm';
import type { UserRequestQueries, UserRequestBody } from '@typings/index.js';
import { type RequestHandler } from 'express';

export const validateUserExists: RequestHandler<
  null,
  null,
  UserRequestBody,
  UserRequestQueries
> = async (req, res, next) => {
  // User ID already validated by previous middleware
  // Empty values if property does not exist
  const { user_id: idFromQuery } = req.query;
  const { user_id: idFromBody } = req.body;

  const user_id = idFromQuery || idFromBody;

  // Lookup user
  const user = await db.select().from(users).where(eq(users.user_id, user_id));
  //  check if user array is empty
  if (user.length === 0) {
    console.log(`User ${user_id} not found, creating new user`);
    await db.insert(users).values({ user_id, balance: 0 });
  }

  next();
  return;
};
