import express from 'express';

import authMiddleware from '@middleware/auth.js';
import {
  catchJsonErrors,
  transformToAPIFailureResponse,
} from '@middleware/validator.js';
import channelRouter from '@routers/channel.js';
import { userRouter } from '@routers/user.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(catchJsonErrors);
app.use(authMiddleware);
app.use(channelRouter);
app.use(userRouter);
app.use(transformToAPIFailureResponse);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
