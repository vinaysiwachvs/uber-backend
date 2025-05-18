import mongoose from 'mongoose';

export default interface IUser {
	_id?: string | mongoose.Types.ObjectId;
	full_name: {
		first_name: string;
		last_name?: string;
	};
	is_logged_in: boolean;
	email: string;
	token: string;
	password: string;
	socket_id: string;
}
