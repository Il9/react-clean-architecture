import { v4 } from 'uuid';

import { ITaskData } from '@domain/entities';

class TaskDTO {
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
    return new TaskDTO(data);
  }
}

export default TaskDTO;
