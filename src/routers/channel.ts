import express from 'express';
import {
  ChannelCreateRequestBodyZ,
  ChannelRequestParamsZ,
  ChannelRequestQueriesZ,
  // ChannelRequestBody,
  // RequestBodyWithChannel,
} from '@typings/index.js';
import {
  createChannel,
  getChannelById,
  getChannels,
} from '@controllers/channelController.js';
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQueries,
} from '@middleware/validator.js';

const channelRouter = express.Router();

const validateChannelRequestParamsFn = validateRequestParams(
  ChannelRequestParamsZ,
);
const validateChannelRequestQueriesFn = validateRequestQueries(
  ChannelRequestQueriesZ,
);
const validateChannelCreateRequestBodyFn = validateRequestBody(
  ChannelCreateRequestBodyZ,
);

// Get channels
channelRouter.get('/channels?', validateChannelRequestQueriesFn, getChannels);

// Get channel by id
channelRouter.get(
  '/channels/:channel_id',
  validateChannelRequestParamsFn,
  getChannelById,
);

// Create channel
channelRouter.post(
  '/channels',
  validateChannelCreateRequestBodyFn,
  createChannel,
);

export default channelRouter;
