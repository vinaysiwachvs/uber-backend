import IUser from '../common/interface/user.interface';
import UserService from '../service/user.service';

export default class UserController {
	private _userService = new UserService();

	public async get(): Promise<IUser[]> {
		return await this._userService.get();
	}

	public async getById(id: string): Promise<IUser> {
		return await this._userService.getById(id);
	}

	public async create(
		first_name: string,
		last_name: string,
		email: string,
		password: string,
	): Promise<{ _id: string; token: string }> {
		return await this._userService.create(first_name, last_name, email, password);
	}

	public async login(email: string, password: string): Promise<string> {
		return await this._userService.login(email, password);
	}

	public async logout(user: IUser): Promise<void> {
		return await this._userService.logout(user);
	}
}
