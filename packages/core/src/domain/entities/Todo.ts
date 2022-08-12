class Todo {
  readonly id: string;
  readonly name: string;

  constructor(data: Todo) {
    this.id = data.id;
    this.name = data.name;
  }

  static of(data: Todo) {
    return new Todo(data);
  }
}

export default Todo;
