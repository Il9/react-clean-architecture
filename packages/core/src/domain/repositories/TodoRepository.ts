import { Observable } from 'rxjs';

import { Todo } from '@domain/entities';

interface TodoCreateRequest {
  name: string;
}

interface TodoCreateResponse {
  todo: Todo;
}

interface TodoFindAllResponse {
  todos: Array<Todo>;
}

interface TodoUpdateRequest {
  id: string;
  name: string;
}

interface TodoUpdateResponse {
  todo: Todo;
}

interface TodoDeleteRequest {
  id: string;
}

interface TodoDeleteResponse {
  error?: Error;
}

interface TodoRepository {
  create(request: TodoCreateRequest): Observable<TodoCreateResponse>;
  findAll(): Observable<TodoFindAllResponse>;
  update(request: TodoUpdateRequest): Observable<TodoUpdateResponse>;
  delete(request: TodoDeleteRequest): Observable<TodoDeleteResponse>;
}

export default TodoRepository;
export type {
  TodoCreateRequest,
  TodoCreateResponse,
  TodoFindAllResponse,
  TodoUpdateRequest,
  TodoUpdateResponse,
  TodoDeleteRequest,
  TodoDeleteResponse,
};
