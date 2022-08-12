import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ITaskData, ITodoData, Task, Todo } from '@domain/entities';
import { TaskRepository, TodoRepository } from '@domain/repositories';

class TodoUseCase {
  constructor(private readonly todoRepository: TodoRepository, private readonly taskRepository: TaskRepository) {}

  add(data: Pick<ITodoData, 'name'>): Observable<Todo> {
    return this.todoRepository.create(data).pipe(pluck('todo'));
  }

  getAll(): Observable<Array<Todo>> {
    return this.todoRepository.findAll().pipe(pluck('todos'));
  }

  edit(id: string, data: Pick<ITodoData, 'name'>): Observable<Todo> {
    return this.todoRepository.update({ id, ...data }).pipe(pluck('todo'));
  }

  remove(id: string): Observable<Error | undefined> {
    return this.todoRepository.delete({ id }).pipe(pluck('error'));
  }

  addTask(id: string, taskData: Pick<ITaskData, 'title' | 'description'>): Observable<Task> {
    return this.taskRepository.create({ todoId: id, ...taskData }).pipe(pluck('task'));
  }

  getAllTasks(id: string): Observable<Array<Task>> {
    return this.taskRepository.findAll({ todoId: id }).pipe(pluck('tasks'));
  }

  editTask(taskId: string, taskData: Partial<Pick<ITaskData, 'title' | 'description'>>): Observable<Task> {
    return this.taskRepository.update({ id: taskId, ...taskData }).pipe(pluck('task'));
  }

  completeTask(taskId: string): Observable<Task> {
    return this.taskRepository.update({ id: taskId, completed: true }).pipe(pluck('task'));
  }

  incompleteTask(taskId: string): Observable<Task> {
    return this.taskRepository.update({ id: taskId, completed: false }).pipe(pluck('task'));
  }

  removeTask(taskId: string): Observable<Error | undefined> {
    return this.taskRepository.delete({ id: taskId }).pipe(pluck('error'));
  }
}

export default TodoUseCase;
export type { ITaskData };
