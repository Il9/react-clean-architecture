import { TodoUseCase } from '@domain';
import { WebStorage, TodoRepositoryImpl, TaskRepositoryImpl } from '@data';
import { TodoViewModel } from '@presentation';

// Data
// Infrastructure
const webStorage = new WebStorage(window.sessionStorage);
// Repository
const todoRepository = new TodoRepositoryImpl(webStorage);
const taskRepository = new TaskRepositoryImpl(webStorage);

// Domain
// UseCase
const todoUseCase = new TodoUseCase(todoRepository, taskRepository);

// Presentation
// ViewModel
const todoViewModel = new TodoViewModel(todoUseCase);

export default { todo: todoViewModel };
