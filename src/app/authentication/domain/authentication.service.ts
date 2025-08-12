import { UserModel } from "./user.model";

export interface AuthenticationService {
  login(email: string): Promise<{ token: string; user: UserModel }>;
  register(user: Pick<UserModel, 'email'>): Promise<UserModel>;
}
