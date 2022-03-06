import { TaskEntity, ITaskData } from '@domain/entities';
import { TodoDTO } from '@domain/dtos';

interface ITodoData {
  tasks?: ITaskData[];
}

class TodoEntity {
  readonly tasks: TaskEntity[];

  constructor(data: ITodoData) {
    this.tasks = (data.tasks ?? []).map(TaskEntity.of);
  }

  static of(data: ITodoData) {
    return new TodoEntity(data);
  }

  static fromDTO(todoDTO: TodoDTO) {
    return new TodoEntity({
      ...todoDTO,
      tasks: todoDTO.tasks.map(TaskEntity.fromDTO),
    });
  }

  toDTO() {
    return new TodoDTO({ ...this });
  }

  addTask(taskEntity: TaskEntity) {
    return new TodoEntity({
      ...this,
      tasks: [...this.tasks, taskEntity],
    });
  }

  editTask(taskEntity: TaskEntity) {
    return new TodoEntity({
      ...this,
      tasks: this.tasks.map(_task => (_task.id !== taskEntity.id ? _task : taskEntity)),
    });
  }

  removeTask(taskEntity: TaskEntity) {
    return new TodoEntity({
      ...this,
      tasks: this.tasks.filter(({ id }) => id !== taskEntity.id),
    });
  }
}

export default TodoEntity;
export type { ITodoData };
