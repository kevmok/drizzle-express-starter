import { int, text, mysqlTable, serial } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull(),
  balance: int('balance').notNull(),
});
