/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RequestHandler, type ErrorRequestHandler } from 'express';
import { type ParsedQs } from 'qs';
import { type ParamsDictionary } from 'express-serve-static-core';

import { function as F, either as E } from 'fp-ts';
import {
  type APIResponseBodyFailure,
  type RequestContentLocation,
} from '@typings/index.js';
import { type z, type ZodError } from 'zod';

export const parseZ =
  <T>(zodType: z.ZodType<T>) =>
  (v: unknown): E.Either<z.ZodError<T>, T> => {
    const result = zodType.safeParse(v);

    switch (result.success) {
      case true:
        return E.right(result.data);

      case false:
        return E.left(result.error);
    }
  };

class RequestValidationError extends Error {
  requestContentLocation: RequestContentLocation;
  zodError: ZodError;

  constructor(
    requestContentLocation: RequestContentLocation,
    zodError: ZodError,
  ) {
    super('Request validation error');

    this.requestContentLocation = requestContentLocation;
    this.zodError = zodError;
  }
}

export const validateRequest =
  <T>({
    requestContentLocation,
    zodType,
  }: {
    requestContentLocation: RequestContentLocation;
    zodType: z.ZodType<T>;
  }): RequestHandler =>
  (req, _, next) => {
    const requestContentParser = parseZ(zodType);
    const requestContent = req[requestContentLocation];

    F.pipe(
      requestContentParser(requestContent),
      E.fold(
        (err) => {
          next(new RequestValidationError(requestContentLocation, err));
        },
        () => {
          next();
        },
      ),
    );
  };

export const validateRequestBody = <T>(
  zodType: z.ZodType<T>,
): RequestHandler<any, any, T, any, any> =>
  validateRequest({ requestContentLocation: 'body', zodType });

export const validateRequestQueries = <T extends ParsedQs>(
  zodType: z.ZodType<T>,
): RequestHandler<any, any, any, T, any> =>
  validateRequest({ requestContentLocation: 'query', zodType });

export const validateRequestParams = <T extends ParamsDictionary>(
  zodType: z.ZodType<T>,
): RequestHandler<T, any, any, any, any> =>
  validateRequest({ requestContentLocation: 'params', zodType });

export const transformToAPIFailureResponse: ErrorRequestHandler<
  any,
  APIResponseBodyFailure<unknown>
> = (err, _, res, next) => {
  if (err instanceof RequestValidationError) {
    const { requestContentLocation: location, zodError } = err;
    return res.status(400).json({
      success: false,
      result: null,
      error: {
        location,
        zodErrors: zodError.errors,
      },
    });
  }

  // Handle other errors here.

  next(err);
};

export const catchJsonErrors: ErrorRequestHandler = (
  err: Error,
  _,
  res,
  next,
) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: 'Invalid JSON in request body',
    });
  }

  next(err);
};
