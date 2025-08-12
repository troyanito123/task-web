export class UserModel {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly status: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  static fromJson(json: Record<string, any>): UserModel {
    return new UserModel(
      json['id'],
      json['email'],
      json['status'],
      new Date(json['createdAt']),
      new Date(json['updatedAt'])
    );
  }
}
