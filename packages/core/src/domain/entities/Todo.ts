import { v4 } from 'uuid';

interface ITodoData {
  id?: string;
  name: string;
}

class Todo {
  readonly id: string;
  readonly name: string;

  constructor(data: ITodoData) {
    this.id = data.id ?? v4();
    this.name = data.name;
  }

  static of(data: ITodoData) {
    return new Todo(data);
  }
}

export default Todo;
export type { ITodoData };
