import express from 'express';
import bookRouter from './src/routes/bookRoutes.js';
import clientRouter from './src/routes/clientRoutes.js';
import loanRouter from './src/routes/loanRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/book', bookRouter);
app.use('/client', clientRouter);
app.use('/loan', loanRouter);

export default app;