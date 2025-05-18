import jwt from 'jsonwebtoken';
import CommonVariables from '../common-variables';

const secretToken: string = CommonVariables.getAccessTokenSecret();

export const generateToken = async (_id: string, expiresInMins: number = 60 * 24): Promise<string> => {
	return jwt.sign({ _id }, secretToken, { expiresIn: expiresInMins });
};

export const verifyToken = async (token: string): Promise<any> => {
	const decoded = jwt.verify(token, secretToken);
	return decoded;
};
