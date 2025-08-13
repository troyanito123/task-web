import { Injectable } from '@angular/core';
import { UserService } from '../domain/user.service';
import { UserModel } from '../domain/user.model';

const USERS_DB: UserModel[] = [
  {
    id: '1',
    email: 'user@example.com',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'user2@example.com',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'user3@example.com',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserFakeService extends UserService {
  override async searchByEmail(
    email: string
  ): Promise<{ token: string; user: UserModel } | null> {
    const user = USERS_DB.find((user) => user.email === email);
    if (!user) return null;
    localStorage.setItem('token', 'fake-jwt-token');
    return { token: 'fake-jwt-token', user };
  }
  override async create(
    user: Pick<UserModel, 'email'>
  ): Promise<{ token: string; user: UserModel }> {
    const newUser = new UserModel(
      USERS_DB.length.toString(),
      user.email,
      'ACTIVE',
      new Date(),
      new Date()
    );
    USERS_DB.push(newUser);
    localStorage.setItem('token', 'fake-jwt-token');
    return { token: 'fake-jwt-token', user: newUser };
  }

  override async logout(): Promise<void> {
    localStorage.clear();
  }
}
