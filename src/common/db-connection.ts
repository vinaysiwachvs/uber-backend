import mongoose from 'mongoose';
import CommonVariables from './common-variables';

export async function connectToDb(): Promise<boolean | undefined> {
	const { MONGO_URI, MONGO_DB_NAME, MONGO_TIMEOUT } = CommonVariables;

	if (!MONGO_URI) {
		throw new Error('MONGO_URI is required to connect to the database');
	}

	if (!MONGO_DB_NAME) {
		console.warn('Warning: MONGO_DB_NAME is not provided, default DB will be used');
	}

	console.log(`🔌 Connecting to MongoDB at  Database: ${MONGO_DB_NAME || 'default'}, URI: ${MONGO_URI}`);

	try {
		await mongoose.connect(MONGO_URI, {
			dbName: MONGO_DB_NAME,
			minPoolSize: 5,
			retryWrites: true,
			w: 'majority',
			serverSelectionTimeoutMS: Number(MONGO_TIMEOUT),
		});

		console.log('✅ Connected to MongoDB successfully');
		return true;
	} catch (error) {
		console.error('❌ Error connecting to MongoDB:', error);
	}
}

export async function disconnectFromDb(): Promise<void> {
	try {
		await mongoose.disconnect();
		console.log('🔌 Disconnected from MongoDB');
	} catch (error) {
		console.error('❌ Error disconnecting from MongoDB:', error);
	}
}
