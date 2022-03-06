import { v4 } from 'uuid';

import { TaskDTO } from '@domain/dtos';

interface ITaskData {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

class TaskEntity {
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
    return new TaskEntity(data);
  }

  static fromDTO(taskDTO: TaskDTO) {
    return new TaskEntity({ ...taskDTO });
  }

  toDTO() {
    return new TaskDTO({ ...this });
  }

  complete() {
    return new TaskEntity({
      ...this,
      completed: true,
    });
  }

  uncomplete() {
    return new TaskEntity({
      ...this,
      completed: false,
    });
  }

  edit(data: Partial<Pick<ITaskData, 'title' | 'description'>>) {
    return new TaskEntity({
      ...this,
      ...data,
    });
  }
}

export default TaskEntity;
export type { ITaskData };
