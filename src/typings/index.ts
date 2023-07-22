import { z } from 'zod';

// type OmitFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// export type ChannelRequestBody = OmitFields<Channel, 'id'>;

export type RequestContentLocation = 'body' | 'params' | 'query';

export interface APIResponseBodySuccessful<T = null> {
  success: true;
  result: T;
  error: null;
}

export interface APIResponseBodyFailure<T> {
  success: false;
  result: null;
  error: T;
}

export type MessageAPIResponseBody = APIResponseBodySuccessful<{
  message: string;
}>;

export interface User {
  // id: number;
  user_id: string;
  balance: number;
}

export type UserAPIResponseBody = APIResponseBodySuccessful<{
  user: User;
}>;

export type UsersAPIResponseBody = APIResponseBodySuccessful<{
  users: User[];
}>;

export const UserRequestQueriesZ = z.object({
  user_id: z.string(),
});

export const UserRequesBodyZ = z.object({
  user_id: z.string(),
  balance_change: z.number(),
});

export type UserRequestQueries = z.infer<typeof UserRequestQueriesZ>;
export type UserRequestBody = z.infer<typeof UserRequesBodyZ>;
export type UserDeleteRequestBody = z.infer<typeof UserRequestQueriesZ>;

export interface Channel {
  // id: number;
  channel_id: number;
  channel_name: string;
  discord_role_id: string | null;
  channel_type: 'success' | 'announcements' | 'general';
}

export type ChannelAPIResponseBody = APIResponseBodySuccessful<{
  channels: Channel;
}>;

export type ChannelsAPIResponseBody = APIResponseBodySuccessful<{
  channels: Channel[];
}>;

export const ChannelRequestParamsZ = z.object({
  channel_id: z.string(),
});

export const ChannelRequestQueriesZ = z.object({
  channel_id: z.string().optional(),
  channel_name: z.string().optional(),
  discord_role_id: z.string().optional(),
  channel_type: z.enum(['success', 'announcements', 'general']).optional(),
});
export const ChannelCreateRequestBodyZ = z.object({
  channel_id: z.number(),
  channel_name: z.string(),
  discord_role_id: z.string().optional(),
  channel_type: z.enum(['success', 'announcements', 'general']),
});
export const ChannelUpdateRequestBodyZ = z.object({
  channel_name: z.string().optional(),
  discord_role_id: z.string().optional(),
  channel_type: z.enum(['success', 'announcements', 'general']).optional(),
});

export type ChannelRequestParams = z.infer<typeof ChannelRequestParamsZ>;
export type ChannelRequestQueries = z.infer<typeof ChannelRequestQueriesZ>;
export type ChannelCreateRequestBody = z.infer<
  typeof ChannelCreateRequestBodyZ
>;
export type ChannelUpdateRequestBody = z.infer<
  typeof ChannelUpdateRequestBodyZ
>;
