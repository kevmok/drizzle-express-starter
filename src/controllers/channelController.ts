import { db } from '@db/index.js';
import { channelSchema } from '@db/schema/channels.js';
import {
  type ChannelAPIResponseBody,
  type ChannelCreateRequestBody,
  type ChannelRequestParams,
  type ChannelRequestQueries,
  type ChannelUpdateRequestBody,
  type ChannelsAPIResponseBody,
  type MessageAPIResponseBody,
} from '@typings/index.js';
import { eq, and, type SQL } from 'drizzle-orm';
import { type RequestHandler } from 'express';

export const getChannels: RequestHandler<
  null,
  ChannelsAPIResponseBody,
  null,
  ChannelRequestQueries
> = async (req, res) => {
  const { channel_id, channel_name, discord_role_id, channel_type } = req.query;
  const conditionalClause: SQL[] = [];

  if (channel_id) {
    conditionalClause.push(eq(channelSchema.channel_id, parseInt(channel_id)));
  }

  if (channel_name) {
    conditionalClause.push(eq(channelSchema.channel_name, channel_name));
  }

  if (discord_role_id) {
    conditionalClause.push(eq(channelSchema.discord_role_id, discord_role_id));
  }

  if (channel_type) {
    conditionalClause.push(eq(channelSchema.channel_type, channel_type));
  }

  const channelList = await db
    .select({
      channel_id: channelSchema.channel_id,
      channel_name: channelSchema.channel_name,
      discord_role_id: channelSchema.discord_role_id,
      channel_type: channelSchema.channel_type,
    })
    .from(channelSchema)
    .where(and(...conditionalClause));

  res.send({
    success: true,
    result: {
      channels: channelList,
    },
    error: null,
  });
};

export const getChannelById: RequestHandler<
  ChannelRequestParams,
  ChannelAPIResponseBody
> = async (req, res) => {
  const channel_id = parseInt(req.params.channel_id);

  const [channel] = await db
    .select({
      channel_id: channelSchema.channel_id,
      channel_name: channelSchema.channel_name,
      discord_role_id: channelSchema.discord_role_id,
      channel_type: channelSchema.channel_type,
    })
    .from(channelSchema)
    .where(eq(channelSchema.channel_id, channel_id));

  res.send({
    success: true,
    result: {
      channels: channel,
    },
    error: null,
  });
};

export const createChannel: RequestHandler<
  null,
  MessageAPIResponseBody,
  ChannelCreateRequestBody,
  null
> = async (req, res) => {
  const { channel_id, channel_name, discord_role_id, channel_type } = req.body;

  await db.insert(channelSchema).values({
    channel_id,
    channel_name,
    discord_role_id,
    channel_type,
  });

  return res.send({
    success: true,
    result: {
      message: `${
        channel_type.charAt(0).toUpperCase() + channel_type.slice(1)
      } channel ${channel_name} with id: ${channel_id} has been created!`,
    },
    error: null,
  });
};

export const updateChannel: RequestHandler<
  ChannelRequestParams,
  ChannelAPIResponseBody,
  ChannelUpdateRequestBody,
  null
> = async (req, res) => {
  const channel_id = parseInt(req.params.channel_id);
  const { channel_name, discord_role_id, channel_type } = req.body;

  const updateObj: ChannelUpdateRequestBody = {};

  if (channel_name) {
    updateObj.channel_name = channel_name;
  }

  if (discord_role_id) {
    updateObj.discord_role_id = discord_role_id;
  }

  if (channel_type) {
    updateObj.channel_type = channel_type;
  }

  await db
    .update(channelSchema)
    .set(updateObj)
    .where(eq(channelSchema.channel_id, channel_id));

  const [channel] = await db
    .select({
      channel_id: channelSchema.channel_id,
      channel_name: channelSchema.channel_name,
      discord_role_id: channelSchema.discord_role_id,
      channel_type: channelSchema.channel_type,
    })
    .from(channelSchema)
    .where(eq(channelSchema.channel_id, channel_id));

  res.send({
    success: true,
    result: {
      channels: channel,
    },
    error: null,
  });
};
