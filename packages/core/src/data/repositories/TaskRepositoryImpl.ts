import { concat, filter, from, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { v4 } from 'uuid';

import {
  Task,
  TaskRepository,
  ICreateTaskRequest,
  ICreateTaskResponse,
  IFindAllTaskRequest,
  IFindAllTaskResponse,
  IUpdateTaskRequest,
  IUpdateTaskResponse,
  IDeleteTaskRequest,
  IDeleteTaskResponse,
} from '@domain';
import { WebStorage } from '@data';

type TasksKey = 'tasks';

class TaskRepositoryImpl implements TaskRepository {
  private TASKS_KEY: TasksKey = 'tasks';

  constructor(private readonly webStorage: WebStorage) {}

  private generateTasksKeyWithTodoId(todoId: string) {
    return `${todoId}_${this.TASKS_KEY}` as const;
  }

  private toStreamFromArray(task$: Observable<Array<Task>>): Observable<Task> {
    return task$.pipe(mergeMap(from));
  }

  private findAllFromStorage(todoId: string): Observable<Task> {
    const getTasksFromStorage = (todoId: string) =>
      of(todoId).pipe(
        map(this.generateTasksKeyWithTodoId),
        map(this.webStorage.get),
        map(tasksString => JSON.parse(tasksString ?? '[]') as Array<Task>)
      );

    return of(todoId).pipe(mergeMap(getTasksFromStorage), this.toStreamFromArray);
  }

  private updateToStorage(todoId: string): (task$: Observable<Task>) => Observable<Task> {
    const setTasksToStorage = (todoId: string) => (tasks: Array<Task>) => {
      of(todoId).pipe(
        map(this.generateTasksKeyWithTodoId),
        tap(key => this.webStorage.set(key, JSON.stringify(tasks)))
      );
    };

    return task$ => {
      return task$.pipe(toArray(), tap(setTasksToStorage(todoId)), this.toStreamFromArray);
    };
  }

  create(request: ICreateTaskRequest): Observable<ICreateTaskResponse> {
    const { todoId, ...taskData } = request;

    const task = new Task({
      id: v4(),
      title: taskData.title,
      description: taskData.description ?? '',
      completed: false,
    });

    const addTask = (task: Task) => (task$: Observable<Task>) => concat(task$, of(task));
    const generateCreateTaskResponse = (): ICreateTaskResponse => ({ task });

    return this.findAllFromStorage(todoId).pipe(
      addTask(task),
      this.updateToStorage(todoId),
      map(generateCreateTaskResponse)
    );
  }

  findAll(request: IFindAllTaskRequest): Observable<IFindAllTaskResponse> {
    const { todoId } = request;

    const generateFindAllTaskResponse = (tasks: Array<Task>) => ({ tasks });

    return this.findAllFromStorage(todoId).pipe(toArray(), map(generateFindAllTaskResponse));
  }

  update(request: IUpdateTaskRequest): Observable<IUpdateTaskResponse> {
    const { todoId, ...taskData } = request;

    const isRequestedTask = (task: Task) => task.id === taskData.id;
    const updateWhenRequested = (task: Task) => (isRequestedTask(task) ? new Task({ ...task, ...taskData }) : task);
    const generateUpdateTaskResponse = (task: Task) => ({ task });

    return this.findAllFromStorage(todoId).pipe(
      map(updateWhenRequested),
      this.updateToStorage(todoId),
      filter(isRequestedTask),
      map(generateUpdateTaskResponse)
    );
  }

  delete(request: IDeleteTaskRequest): Observable<IDeleteTaskResponse> {
    const { todoId, id } = request;

    const isNotRequestedTask = (task: Task) => task.id !== id;
    const generateDeleteTodoResponse = () => ({});

    return this.findAllFromStorage(todoId).pipe(
      filter(isNotRequestedTask),
      this.updateToStorage(todoId),
      map(generateDeleteTodoResponse)
    );
  }
}

export default TaskRepositoryImpl;
