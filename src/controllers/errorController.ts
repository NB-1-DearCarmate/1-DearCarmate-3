import { StructError } from 'superstruct';
import NotFoundError from '../lib/errors/NotFoundError';
import AlreadyExstError from '../lib/errors/AlreadyExstError';
import multer from 'multer';
import UnauthError from '../lib/errors/UnauthError';
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import CommonError from '../lib/errors/CommonError';
<<<<<<< HEAD
import NoFoundError from '../lib/errors/NoFoundError';
=======
>>>>>>> 96a8d3c5885b743b4ab3439251462527fd6988f6

export function defaultNotFoundHandler(_req: Request, res: Response, next: NextFunction) {
  res.status(404).send({ message: 'Not found' });
}

export function globalErrorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof CommonError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof StructError) {
    /** From superstruct or application error */
    res.status(400).send({ message: err.message });
  } else if (
    /** From express.json middleware, bad prisma data */
    (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: 'Invalid JSON' });
  } else if (err instanceof multer.MulterError) {
    /** From imageController */
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).send({ message: 'File size exceeds the 5MB limit.' });
    } else res.status(500).send({ message: 'File upload failed.' });
  } else if (err instanceof UnauthError) {
    /** From userService */
    res.status(401).send({ message: 'Unauthorized' });
  } else if (
    /** Application error */
    err instanceof NotFoundError
  ) {
    res.status(404).send({ message: err.message });
  } else if (
    /** Prisma contraint error */
    err instanceof Prisma.PrismaClientKnownRequestError &&
    (err.code === 'P2001' || err.code === 'P2025')
  ) {
    res.status(404).send({ message: 'Not Found' });
  } else if (
    /** From ~~Service */
    err instanceof AlreadyExstError
  ) {
    res.status(409).send({ message: err.message });
  } else if (
    /** Prisma contraint error */
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    res.status(409).send({ message: 'Already Exist' });
  } else if (err instanceof Error && 'code' in err) {
    /** Prisma error codes */
    console.error(err);
    res.status(500).send({ message: 'Failed to process data' });
<<<<<<< HEAD
  } else if (
    /** anothoer NotFoundError */
    err instanceof NoFoundError
  ) {
    res.status(410).send({ message: err.message });
=======
>>>>>>> 96a8d3c5885b743b4ab3439251462527fd6988f6
  } else {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}
