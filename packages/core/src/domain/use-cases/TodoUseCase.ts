import { pluck } from 'rxjs/operators';

import { ITaskData, ITodoData } from '@domain/entities';
import { TaskRepository, TodoRepository } from '@domain/repositories';

class TodoUseCase {
  constructor(private readonly todoRepository: TodoRepository, private readonly taskRepository: TaskRepository) {}

  add(data: Pick<ITodoData, 'name'>) {
    return this.todoRepository.create(data).pipe(pluck('todo'));
  }

  getAll() {
    return this.todoRepository.findAll().pipe(pluck('todos'));
  }

  edit(id: string, data: Pick<ITodoData, 'name'>) {
    return this.todoRepository.update({ id, ...data }).pipe(pluck('todo'));
  }

  remove(id: string) {
    return this.todoRepository.delete({ id }).pipe(pluck('error'));
  }

  addTask(id: string, taskData: Pick<ITaskData, 'title' | 'description'>) {
    return this.taskRepository.create({ todoId: id, ...taskData }).pipe(pluck('task'));
  }

  editTask(taskId: string, taskData: Partial<Pick<ITaskData, 'title' | 'description'>>) {
    return this.taskRepository.update({ id: taskId, ...taskData }).pipe(pluck('task'));
  }

  completeTask(taskId: string) {
    return this.taskRepository.update({ id: taskId, completed: true }).pipe(pluck('task'));
  }

  incompleteTask(taskId: string) {
    return this.taskRepository.update({ id: taskId, completed: false }).pipe(pluck('task'));
  }

  removeTask(taskId: string) {
    return this.taskRepository.delete({ id: taskId }).pipe(pluck('error'));
  }
}

export default TodoUseCase;
export type { ITaskData };