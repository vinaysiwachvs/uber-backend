export default class CommonVariables {
	static PORT: string | number | undefined;
	static MONGO_URI?: string;
	static MONGO_DB_NAME: string | undefined;
	static MONGO_TIMEOUT: string | number | undefined;
	static NODE_ENV: string | undefined;
	static APP_SERVICE_NAME?: string;
	static ACCESS_TOKEN_SECRET?: string;

	static getAccessTokenSecret(): string {
		const secret = CommonVariables.ACCESS_TOKEN_SECRET;
		if (!secret) {
			throw new Error('Access token secret not found');
		}
		return secret;
	}

	static init() {
		console.log('🔧 Initializing common variables...');
		CommonVariables.PORT = process.env.PORT || '6001';
		CommonVariables.MONGO_URI = process.env.MONGO_URI;
		CommonVariables.MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'YourDatabaseName';
		CommonVariables.MONGO_TIMEOUT = process.env.MONGO_TIMEOUT || 10000;
		CommonVariables.NODE_ENV = process.env.NODE_ENV || 'development';
		CommonVariables.APP_SERVICE_NAME = process.env.APP_SERVICE_NAME;
		CommonVariables.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
	}
}
