import { ITodoData } from '@domain/entities';
import { TaskDTO } from '@domain/dtos';

class TodoDTO {
  readonly tasks: TaskDTO[];

  constructor(data: ITodoData) {
    this.tasks = (data.tasks ?? []).map(TaskDTO.of);
  }

  static of(data: ITodoData) {
    return new TodoDTO(data);
  }
}

export default TodoDTO;
