import { action, makeObservable, observable } from 'mobx';
import { from, map, mergeMap, toArray } from 'rxjs';

import { Task, Todo, TodoUseCase } from '@domain';

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ITodo {
  id: string;
  name: string;
  tasks: Array<ITask>;
}

class TodoViewModel {
  todos: Array<ITodo>;
  currentId: string | null;

  constructor(private readonly todoUseCase: TodoUseCase) {
    makeObservable(this, {
      todos: observable,
      currentId: observable,
      loadTodos: action,
      addTodo: action,
      addTask: action,
      setCurrentId: action,
    });

    this.todos = [];
    this.currentId = null;
  }

  private toViewModelTodo(todo: Todo): ITodo {
    return {
      ...todo,
      tasks: [],
    };
  }

  private toViewModelTask(task: Task): ITask {
    return {
      ...task,
    };
  }

  loadTodos() {
    this.todoUseCase
      .getAll()
      .pipe(
        mergeMap(todos => from(todos)),
        map(this.toViewModelTodo),
        mergeMap(todo =>
          this.todoUseCase.getAllTasks(todo.id).pipe(
            mergeMap(tasks => from(tasks)),
            map(this.toViewModelTask),
            toArray(),
            map(tasks => ({ ...todo, tasks }))
          )
        ),
        toArray()
      )
      .subscribe(todos => {
        this.todos.push(...todos);
      });
  }

  addTodo(name: string) {
    this.todoUseCase
      .add({ name })
      .pipe(map(this.toViewModelTodo))
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

  addTask(id: string, taskData: { title: string; description: string }) {
    this.todoUseCase.addTask(id, taskData).subscribe(task => {
      this.todos.find(todo => todo.id === id)?.tasks.push(task);
    });
  }

  setCurrentId(id: string) {
    this.currentId = id;
  }
}

export default TodoViewModel;
