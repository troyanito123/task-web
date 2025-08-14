import { UserModel } from './user.model';

export abstract class UserService {
  abstract searchByEmail(
    email: string
  ): Promise<{ token: string; user: UserModel } | null>;
  abstract create(
    user: Pick<UserModel, 'email'>
  ): Promise<{ token: string; user: UserModel } | null>;
  abstract logout(): Promise<void>;
  abstract renew(): Promise<{ token: string; user: UserModel } | null>;
}
