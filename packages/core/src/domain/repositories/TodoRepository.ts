import { Observable } from 'rxjs';

import { Todo } from '@domain/entities';

interface ICreateTodoRequest {
  name: string;
}

interface ICreateTodoResponse {
  todo: Todo;
}

interface IFindAllTodoResponse {
  todos: Array<Todo>;
}

interface IUpdateTodoRequest {
  id: string;
  name: string;
}

interface IUpdateTodoResponse {
  todo: Todo;
}

interface IDeleteTodoRequest {
  id: string;
}

interface IDeleteTodoResponse {
  error?: Error;
}

interface TodoRepository {
  create(request: ICreateTodoRequest): Observable<ICreateTodoResponse>;
  findAll(): Observable<IFindAllTodoResponse>;
  update(request: IUpdateTodoRequest): Observable<IUpdateTodoResponse>;
  delete(request: IDeleteTodoRequest): Observable<IDeleteTodoResponse>;
}

export default TodoRepository;
export type {
  ICreateTodoRequest,
  ICreateTodoResponse,
  IFindAllTodoResponse,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
  IDeleteTodoRequest,
  IDeleteTodoResponse,
};
