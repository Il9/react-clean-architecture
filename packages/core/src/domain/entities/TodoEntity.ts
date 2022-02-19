import uuid from 'uuid';

interface ITodoData {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

class TodoEntity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;

  constructor(data: ITodoData) {
    this.id = data.id ?? uuid.v4();
    this.title = data.title;
    this.description = data.description ?? '';
    this.completed = data.completed ?? false;
  }

  static of(data: ITodoData) {
    return new TodoEntity(data);
  }

  complete() {
    return new TodoEntity({
      ...this,
      completed: true,
    });
  }

  uncomplete() {
    return new TodoEntity({
      ...this,
      completed: false,
    });
  }

  update(data: Partial<Pick<ITodoData, 'title' | 'description'>>) {
    return new TodoEntity({
      ...this,
      ...data,
    });
  }
}

export default TodoEntity;
export type { ITodoData };
