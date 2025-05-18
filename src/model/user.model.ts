import mongoose, { Schema } from 'mongoose';
import IUser from '../common/interface/user.interface';

const userSchema = new Schema<IUser>(
	{
		full_name: {
			first_name: { type: String, required: true, minlength: [3, 'First name must be at least 3 characters'] },
			last_name: { type: String, required: false, minlength: [3, 'Last name must be at least 3 characters'] },
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		token: { type: String },
		is_logged_in: { type: Boolean, default: false },
		socket_id: { type: String },
	},
	{
		collection: 'users',
	},
);

export default mongoose.model<IUser>('User', userSchema);
