import { concat, filter, from, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { v4 } from 'uuid';

import {
  Todo,
  ICreateTodoRequest,
  ICreateTodoResponse,
  IDeleteTodoRequest,
  IDeleteTodoResponse,
  IFindAllTodoResponse,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
  TodoRepository,
} from '@domain';
import { WebStorage } from '@data';

type TodosKey = 'todos';

class TodoRepositoryImpl implements TodoRepository {
  private TODOS_KEY: TodosKey = 'todos';

  constructor(private readonly webStorage: WebStorage) {}

  private toStreamFromArray(todo$: Observable<Array<Todo>>): Observable<Todo> {
    return todo$.pipe(mergeMap(from));
  }

  private findAllFromStorage(): Observable<Todo> {
    const getTodosFromStorage = (TODOS_KEY: TodosKey) =>
      JSON.parse(this.webStorage.get(TODOS_KEY) ?? '[]') as Array<Todo>;

    return of(this.TODOS_KEY).pipe(map(getTodosFromStorage), this.toStreamFromArray);
  }

  private updateToStorage(todo$: Observable<Todo>): Observable<Todo> {
    return todo$.pipe(
      toArray(),
      tap(todos => this.webStorage.set(this.TODOS_KEY, JSON.stringify(todos))),
      this.toStreamFromArray
    );
  }

  create(request: ICreateTodoRequest): Observable<ICreateTodoResponse> {
    const todo = new Todo({
      id: v4(),
      ...request,
    });

    const addTodo = (todo: Todo) => (todo$: Observable<Todo>) => concat(todo$, of(todo));
    const generateCreateTodoResponse = () => ({ todo });

    return this.findAllFromStorage().pipe(addTodo(todo), this.updateToStorage, map(generateCreateTodoResponse));
  }

  findAll(): Observable<IFindAllTodoResponse> {
    const generateFindAllTodoResponse = (todos: Array<Todo>) => ({ todos });

    return this.findAllFromStorage().pipe(toArray(), map(generateFindAllTodoResponse));
  }

  update(request: IUpdateTodoRequest): Observable<IUpdateTodoResponse> {
    const isRequestedTodo = (todo: Todo) => todo.id === request.id;
    const updateWhenRequested = (todo: Todo) => (isRequestedTodo(todo) ? new Todo({ ...todo, ...request }) : todo);
    const generateUpdateTodoResponse = (todo: Todo) => ({ todo });

    return this.findAllFromStorage().pipe(
      map(updateWhenRequested),
      this.updateToStorage,
      filter(isRequestedTodo),
      map(generateUpdateTodoResponse)
    );
  }

  delete(request: IDeleteTodoRequest): Observable<IDeleteTodoResponse> {
    const isNotRequestedTodo = (todo: Todo) => todo.id !== request.id;
    const generateDeleteTodoResponse = () => ({});

    return this.findAllFromStorage().pipe(
      filter(isNotRequestedTodo),
      this.updateToStorage,
      map(generateDeleteTodoResponse)
    );
  }
}

export default TodoRepositoryImpl;
