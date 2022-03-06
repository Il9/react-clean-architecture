import { of, map, mergeMap } from 'rxjs';

import { TaskEntity, ITaskData, TodoEntity } from '@domain/entities';
import { TaskDTO, TodoDTO } from '@domain/dtos';
import { ITaskRepository } from '@domain/repositories';

class TodoUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  find() {
    return this.taskRepository.findAll().pipe(
      map(taskDTOs => TodoEntity.of({ tasks: taskDTOs })),
      map(todoEntity => todoEntity.toDTO())
    );
  }

  addTask(todoDTO: TodoDTO, data: Pick<ITaskData, 'title' | 'description'>) {
    return of(data).pipe(
      map(TaskDTO.of),
      mergeMap(this.taskRepository.create),
      map(TaskEntity.fromDTO),
      map(TodoEntity.fromDTO(todoDTO).addTask),
      map(todoEntity => todoEntity.toDTO())
    );
  }

  completeTask(todoDTO: TodoDTO, taskDTO: TaskDTO) {
    return of(taskDTO).pipe(
      map(TaskEntity.fromDTO),
      map(taskEntity => taskEntity.complete().toDTO()),
      mergeMap(this.taskRepository.update),
      map(TaskEntity.fromDTO),
      map(TodoEntity.fromDTO(todoDTO).editTask),
      map(todoEntity => todoEntity.toDTO())
    );
  }

  uncompleteTask(todoDTO: TodoDTO, taskDTO: TaskDTO) {
    return of(taskDTO).pipe(
      map(TaskEntity.fromDTO),
      map(taskEntity => taskEntity.complete().toDTO()),
      mergeMap(this.taskRepository.update),
      map(TaskEntity.fromDTO),
      map(TodoEntity.fromDTO(todoDTO).editTask),
      map(todoEntity => todoEntity.toDTO())
    );
  }

  editTask(todoDTO: TodoDTO, taskDTO: TaskDTO, data: Pick<ITaskData, 'title' | 'description'>) {
    return of(taskDTO).pipe(
      map(TaskEntity.fromDTO),
      map(taskEntity => taskEntity.edit(data).toDTO()),
      mergeMap(this.taskRepository.update),
      map(TaskEntity.fromDTO),
      map(TodoEntity.fromDTO(todoDTO).editTask),
      map(todoEntity => todoEntity.toDTO())
    );
  }

  removeTask(todoDTO: TodoDTO, taskDTO: TaskDTO) {
    return of(taskDTO).pipe(
      mergeMap(this.taskRepository.delete),
      map(TaskEntity.fromDTO),
      map(TodoEntity.fromDTO(todoDTO).removeTask)
    );
  }
}

export default TodoUseCase;
export type { ITaskData };
