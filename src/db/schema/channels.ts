import {
  text,
  mysqlTable,
  serial,
  mysqlEnum,
  int,
} from 'drizzle-orm/mysql-core';

export const channelSchema = mysqlTable('channels', {
  id: serial('id').primaryKey(),
  channel_id: int('channel_id').notNull().unique(),
  channel_name: text('channel_name').notNull(),
  discord_role_id: text('user_role_id'),
  // channel_type: text('channel_type').notNull(),
  channel_type: mysqlEnum('channel_type', [
    'success',
    'announcements',
    'general',
  ]).notNull(),
});
