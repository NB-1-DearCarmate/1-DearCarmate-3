import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import companyRouter from './routers/company';
import passport from './middlewares/passport/passport';
import { PORT, UPLOAD_FOLDER, STATIC_PATH } from './config/constants';
import authRouter from './routers/authRouter';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use(STATIC_PATH, express.static(path.resolve(process.cwd(), UPLOAD_FOLDER)));

app.use('/auth', authRouter);
//app.use('/users', exampleRouter);
app.use('/companies', companyRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
