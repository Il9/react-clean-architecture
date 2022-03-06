import { Observable } from 'rxjs';

import { TaskDTO } from '@domain/dtos';

interface ITaskRepository {
  create(taskDTO: TaskDTO): Observable<TaskDTO>;
  findAll(): Observable<TaskDTO[]>;
  update(taskDTO: TaskDTO): Observable<TaskDTO>;
  delete(taskDTO: TaskDTO): Observable<void>;
}

export default ITaskRepository;
