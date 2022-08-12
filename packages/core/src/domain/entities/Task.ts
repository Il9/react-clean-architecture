class Task {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;

  constructor(data: Task) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
  }

  static of(data: Task) {
    return new Task(data);
  }
}

export default Task;
