import { Observable } from 'rxjs';

import { Task } from '@domain';

interface ICreateTaskRequest {
  todoId: string;
  title: string;
  description?: string;
}

interface ICreateTaskResponse {
  task: Task;
}

interface IFindAllTaskRequest {
  todoId: string;
}

interface IFindAllTaskResponse {
  tasks: Array<Task>;
}

interface IUpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

interface IUpdateTaskResponse {
  task: Task;
}

interface IDeleteTaskRequest {
  id: string;
}

interface IDeleteTaskResponse {
  error?: Error;
}

interface TaskRepository {
  create(request: ICreateTaskRequest): Observable<ICreateTaskResponse>;
  findAll(request: IFindAllTaskRequest): Observable<IFindAllTaskResponse>;
  update(request: IUpdateTaskRequest): Observable<IUpdateTaskResponse>;
  delete(request: IDeleteTaskRequest): Observable<IDeleteTaskResponse>;
}

export default TaskRepository;
export type {
  ICreateTaskRequest,
  ICreateTaskResponse,
  IFindAllTaskRequest,
  IFindAllTaskResponse,
  IUpdateTaskRequest,
  IUpdateTaskResponse,
  IDeleteTaskRequest,
  IDeleteTaskResponse,
};
