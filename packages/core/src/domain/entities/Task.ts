import { v4 } from 'uuid';

interface ITaskData {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

class Task {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;

  constructor(data: ITaskData) {
    this.id = data.id ?? v4();
    this.title = data.title;
    this.description = data.description ?? '';
    this.completed = data.completed ?? false;
  }

  static of(data: ITaskData) {
    return new Task(data);
  }
}

export default Task;
export type { ITaskData };
