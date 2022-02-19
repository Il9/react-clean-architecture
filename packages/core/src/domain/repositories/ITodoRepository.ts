import { Observable } from 'rxjs';

interface ITodoRequest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ITodoResponse {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface IRemoveTodoRequest {
  id: string;
}

interface IRemoveTodoResponse {
  success: boolean;
}

interface ITodoRepository {
  create(request: ITodoRequest): Observable<ITodoResponse>;
  findAll(): Observable<ITodoResponse[]>;
  update(request: ITodoRequest): Observable<ITodoResponse>;
  remove(request: IRemoveTodoRequest): Observable<IRemoveTodoResponse>;
}

export default ITodoRepository;
export type { ITodoRequest, ITodoResponse, IRemoveTodoRequest, IRemoveTodoResponse };
