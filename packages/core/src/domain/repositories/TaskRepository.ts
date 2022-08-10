import { Observable } from 'rxjs';

import { Task } from '@domain/entities';

interface TaskCreateRequest {
  todoId: string;
  title: string;
  description?: string;
}

interface TaskCreateResponse {
  task: Task;
}

interface TaskFindAllRequest {
  todoId: string;
}

interface TaskFindAllResponse {
  tasks: Task[];
}

interface TaskUpdateRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

interface TaskUpdateResponse {
  task: Task;
}

interface TaskDeleteRequest {
  id: string;
}

interface TaskDeleteResponse {
  error?: Error;
}

interface TaskRepository {
  create(request: TaskCreateRequest): Observable<TaskCreateResponse>;
  findAll(request: TaskFindAllRequest): Observable<TaskFindAllResponse>;
  update(request: TaskUpdateRequest): Observable<TaskUpdateResponse>;
  delete(request: TaskDeleteRequest): Observable<TaskDeleteResponse>;
}

export default TaskRepository;
export type {
  TaskCreateRequest,
  TaskCreateResponse,
  TaskFindAllRequest,
  TaskFindAllResponse,
  TaskUpdateRequest,
  TaskUpdateResponse,
  TaskDeleteRequest,
  TaskDeleteResponse,
};
