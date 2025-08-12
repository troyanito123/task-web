export class TaskModel {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly completed: boolean,
    readonly createdAt: Date
  ) {}

  static fromJson(json: Record<string, any>): TaskModel {
    return new TaskModel(
      json['id'],
      json['title'],
      json['description'],
      json['completed'],
      new Date(json['createdAt'])
    );
  }
}
