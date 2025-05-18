import IUser from '../common/interface/user.interface';
import User from '../model/user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../common/utils/token-utils';

export default class UserService {
	private async _save(userInput: IUser, isNew: boolean = true): Promise<IUser> {
		const user = new User(userInput);
		user.isNew = isNew;
		return (await user.save()).toObject();
	}

	public async get(): Promise<IUser[]> {
		return await User.find().lean();
	}

	public async getById(id: string): Promise<IUser> {
		const user = await User.findById(id).lean();

		if (!user) {
			throw new Error(`User not found with id: ${id}`);
		}

		return user;
	}

	public async getByEmail(email: string): Promise<IUser> {
		const user = await User.findOne({ email }).lean();
		if (!user) {
			throw new Error(`User not found with email: ${email}`);
		}
		return user;
	}

	public async create(
		first_name: string,
		last_name: string,
		email: string,
		password: string,
	): Promise<{ _id: string; token: string }> {
		const userByEmail = await this.getByEmail(email);
		if (userByEmail) {
			throw new Error(`Email already exists: ${email}`);
		}
		const hashedPassword = await this._hashedPassword(password);

		const userInput: IUser = {
			full_name: {
				first_name,
				last_name,
			},
			email,
			is_logged_in: false,
			password: hashedPassword,
			token: '',
			socket_id: '',
		};
		const user = await this._save(userInput, true);
		const token = await generateToken(user._id as string);

		user.token = token;
		user.is_logged_in = true;
		const savedUser = await this._save(user, false);

		return { _id: savedUser._id as string, token: savedUser.token as string };
	}
	public async login(email: string, password: string): Promise<string> {
		const user = await this.getByEmail(email);
		const isMatch = await this._comparePassword(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid password');
		}
		const token = await generateToken(user._id as string);
		user.is_logged_in = true;
		user.token = token;
		await this._save(user, false);
		return token;
	}

	public async logout(user: IUser): Promise<void> {
		user.is_logged_in = false;
		user.token = '';
		await this._save(user, false);
	}

	private async _hashedPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	private async _comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}
