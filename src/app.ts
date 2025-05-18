import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import CommonVariables from './common/common-variables';

dotenv.config();
CommonVariables.init();

let app: Express;

export default function createServer(): Express {
	app = express();

	app.use(cors());
	app.use(express.json());

	// TODO: Initialize database connection here if needed

	return app;
}

export function destroyApp(event?: string): void {
	console.log(`⚠️ Destroying the app, event: ${event}`);
	try {
		// TODO: Close database connections or other cleanup tasks here

		process.exit(0); // Normal exit
	} catch (error) {
		console.error('❌ Error destroying the app', error);
		process.exit(1); // Exit with error
	}
}

process.on('SIGINT', () => destroyApp('SIGINT'));
process.on('SIGTERM', () => destroyApp('SIGTERM'));
process.on('SIGQUIT', () => destroyApp('SIGQUIT'));
process.on('SIGUSR2', () => destroyApp('SIGUSR2'));

process.on('exit', () => console.log('👋 Process exit event triggered'));
