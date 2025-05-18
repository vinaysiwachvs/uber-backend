import { Request, response, Response } from 'express';
import createServer from './app';
import CommonVariables from './common/common-variables';

const app = createServer();
const { PORT, NODE_ENV, APP_SERVICE_NAME } = CommonVariables;

// Root route: simple JSON welcome message
app.get('/', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const projectName = process.env.PROJECT_NAME || 'Uber Backend';
	const responseData = {
		message: `Welcome to ${projectName}`,
		environment: NODE_ENV,
		service: APP_SERVICE_NAME,
	};

	res.json(responseData);
});

// TODO: Add API routes here
// e.g. app.use('/api/sample', sampleRouter);

// TODO: Add error handler middleware here
// e.g. app.use(defaultErrorHandler);

app.listen(PORT, () => {
	console.log(`🚀 Application listening on port: ${PORT} | Environment: ${NODE_ENV} | Service: ${APP_SERVICE_NAME}`);
});
