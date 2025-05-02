import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import companyRouter from './routers/companyRouter';
import passport from './middlewares/passport/passport';
import { PORT } from './config/constants';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController';
import imageRouter from './routers/imageRouter';
import dotenv from 'dotenv';
import customerRouter from './routers/customerRouter';
import contractDcmtRouter from './routers/comtractDcmtRouter';
import carsRouter from './routers/carsRouter';
import dashBoardRouter from './routers/dashBoardRouter';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/customers', customerRouter);
app.use('/companies', companyRouter);
app.use('/contractDocuments', contractDcmtRouter);
app.use('/cars', carsRouter);
app.use('/dashboard', dashBoardRouter);

app.use('/images', imageRouter);

app.use('/public/images', express.static(path.join(__dirname, '../public/images')));
// app.use('/public/documents', express.static(path.join(__dirname, '../public/documents')));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
